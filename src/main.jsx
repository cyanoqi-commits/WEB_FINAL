import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Waves from './Waves'
import SecondScreenContent from './SecondScreenContent'
import ProjectCards, { projects } from './ProjectCards'
import AccordionGallery from './AccordionGallery'
import ProjectStudy from './ProjectStudy'
import usePortfolioMotion from './usePortfolioMotion'
import useMediaVisibility from './useMediaVisibility'

// 在这里替换个人信息；动态背景参数位于下方 Waves。
const profile = {
  name: 'CYANO',
  role: '三维设计/概念设计/模型建模',
  year: '2026',
  disciplines: ['3D CONCEPT MODELING'],
}

function ContactQR({ file, label }) {
  return (
    <svg className="contact-qr" viewBox="0 0 300 300" role="img" aria-label={label}>
      <defs>
        <filter id={`white-${file}`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.2126 -0.7152 -0.0722 0 1" />
          <feComponentTransfer><feFuncA type="linear" slope="1.4" /></feComponentTransfer>
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <image href={`${import.meta.env.BASE_URL}images/${file}`} width="300" height="300" filter={`url(#white-${file})`} />
    </svg>
  )
}

function PortfolioPage({ id, label, children }) {
  return (
    <section className="hero" id={id} aria-label={label}>
      <div className="hero-background" aria-hidden="true">
        <Waves
          lineColor="rgba(22, 22, 22, 0.5)"
          backgroundColor="#000"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={24}
          waveAmpY={12}
          friction={0.9}
          tension={0.01}
          maxCursorMove={72}
          xGap={7.2}
          yGap={21.6}
        />
      </div>


      {children ?? <div className="hero-content" />}


    </section>
  )
}


function App() {
  const getProjectId = () => Number(/^#project-(\d+)$/.exec(window.location.hash)?.[1]) || null
  const [projectId, setProjectId] = useState(getProjectId)
  const project = projects.find(item => item.id === projectId)
  usePortfolioMotion(projectId)
  useMediaVisibility(projectId)
  useEffect(() => {
    function onHashChange() {
      setProjectId(getProjectId())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [projectId])
  const navigateToPage = useRef(null)
  useEffect(() => {
    const speedWindowMs = 120
    const fastScrollThreshold = 2 // 标准化后的滚动速度：像素/毫秒。
    let lockedUntil = 0
    let lastWheel = -Infinity
    let targetPage = null
    let wheelSamples = []
    navigateToPage.current = (id) => {
      const pages = [...document.querySelectorAll('.hero')]
      const next = pages.findIndex(page => page.id === id)
      if (next < 0) { window.location.hash = id; return }
      targetPage = next
      lockedUntil = performance.now() + 750
      lastWheel = -Infinity
      wheelSamples = []
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.dispatchEvent(new CustomEvent('portfolio-page-enter', { detail: pages[next].id }))
        pages[next].scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }
    function onWheel(event) {
      if (event.target.closest('.project-study-scroll')) return
      if (event.ctrlKey || event.deltaY === 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const cards = event.target.closest('.project-cards-scroll')
      if (cards && (event.deltaY > 0 ? cards.scrollTop + cards.clientHeight < cards.scrollHeight - 1 : cards.scrollTop > 1)) return
      const panel = event.target.closest('.second-slide')
      if (panel && (event.deltaY > 0
        ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 1
        : panel.scrollTop > 1)) {
        lastWheel = performance.now()
        wheelSamples = []
        return
      }
      event.preventDefault()
      const now = performance.now()
      const continuingGesture = now - lastWheel < 180
      const direction = Math.sign(event.deltaY)
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
      wheelSamples = wheelSamples.filter(sample => now - sample.time < speedWindowMs && sample.direction === direction)
      wheelSamples.push({ time: now, distance: Math.abs(event.deltaY) * unit, direction })
      const speed = wheelSamples.reduce((total, sample) => total + sample.distance, 0) / speedWindowMs
      const fastScroll = speed >= fastScrollThreshold
      lastWheel = now
      if (!fastScroll && (now < lockedUntil || continuingGesture)) return
      const pages = [...document.querySelectorAll('.hero')]
      const current = pages.reduce((best, page, index) =>
        Math.abs(page.getBoundingClientRect().top) < Math.abs(pages[best].getBoundingClientRect().top) ? index : best, 0)
      const from = now < lockedUntil && targetPage !== null ? targetPage : current
      const next = Math.max(0, Math.min(pages.length - 1, from + direction))
      if (next === from) return
      targetPage = next
      lockedUntil = now + 750
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.dispatchEvent(new CustomEvent('portfolio-page-enter', { detail: pages[next].id }))
        pages[next].scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
      history.replaceState(null, '', `#${pages[next].id}`)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [projectId])

  return (
    <>
      <header className="masthead">
        <div className="identity-group">
          <a className="identity" href="#home" aria-label="CYANO，返回首页" onClick={(event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
            event.preventDefault()
            navigateToPage.current('home')
          }}>
            <span className="bar-mark" aria-hidden="true" />
            <span>{profile.name}</span>
          </a>
          <span className="identity-role">{profile.role}</span>
        </div>
        <span className="year">PORTFOLIO-{profile.year}</span>
        <ul className="header-labels" aria-label="作品集栏目">
          {['ABOUT', 'PROJECT', 'CONNECT'].map((label) => (
            <li key={label}>
              <button
                className="header-button"
                type="button"
                onClick={(event) => {
                  if (label === 'ABOUT') navigateToPage.current('page-2')
                  if (label === 'PROJECT') navigateToPage.current('page-3')
                  if (label === 'CONNECT') navigateToPage.current('page-5')
                  const button = event.currentTarget
                  button.getAnimations().forEach((animation) => animation.cancel())
                  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  button.animate(
                    reducedMotion
                      ? [{ backgroundColor: '#ffffff30' }, { backgroundColor: 'transparent' }]
                      : [
                          { transform: 'scale(.94)', backgroundColor: '#ffffff30' },
                          { transform: 'scale(.98)', offset: .45 },
                          { transform: 'scale(1)', backgroundColor: 'transparent' },
                        ],
                    { duration: reducedMotion ? 150 : 360, easing: 'ease-out' },
                  )
                }}
              ><span className="bar-mark" aria-hidden="true" />{label}</button>
            </li>
          ))}
        </ul>
      </header>
      <footer className="hero-footer">
        <div className="disciplines">{profile.disciplines.map((item) => <span key={item}>{item}</span>)}</div>
        <span className="page-number">李帅奇作品集</span>
      </footer>
    <main>
      {project ? (
        <PortfolioPage id={`project-${project.id}`} label={project.title}>
          {project.id <= 19 ? <ProjectStudy key={project.id} projectId={project.id} /> : <div className="project-detail"><h2>{project.title}</h2><a href="#page-3">← 返回项目列表</a></div>}
        </PortfolioPage>
      ) : <>
      <PortfolioPage id="home" label="首页">
      <div className="hero-intro-labels">
        <p className="hero-designer"><span>DESIGN FROM</span><strong>CYANO LI</strong></p>
        <p className="hero-date-range">2021-2026</p>
      </div>
      <div className="hero-specialties">
        <p>CONCEPT DESIGN<br />3D MODELING<br />VFX</p>
        <p>MOTION DESIGN<br />COMPOSITION</p>
      </div>
      <section className="hero-content">
        <h1 className="hero-word" id="hero-title" aria-label="CYANO">
          {/* 字形与视频共用相同比例；文字仍由 TF Browne 渲染。 */}
          <svg viewBox="0 0 3540 700" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <clipPath id="cyano-video-clip" clipPathUnits="objectBoundingBox">
                <text x="0" y="700" transform="scale(0.0002824858757 0.0014285714286)">CYANO</text>
              </clipPath>
            </defs>
          </svg>
          <video
            className="hero-word-video"
            src={`${import.meta.env.BASE_URL}videos/FENGMIAN3-web.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlaying={(event) => event.currentTarget.classList.add('is-playing')}
          />
        </h1>
      </section>
      </PortfolioPage>
      <PortfolioPage id="page-2" label="第二页">
        <SecondScreenContent />
      </PortfolioPage>
      <PortfolioPage id="page-3" label="第三页">
        <div className="projects-heading">
          <h2>项目</h2>
          <p>PROJECT</p>
        </div>
        <ProjectCards />
      </PortfolioPage>
      <PortfolioPage id="page-4" label="第四页">
        <div className="projects-heading">
          <h2>单帧练习</h2>
          <p>STILL FRAME STUDIES</p>
        </div>
        <AccordionGallery />
      </PortfolioPage>
      <PortfolioPage id="page-5" label="联系方式">
        <div className="projects-heading">
          <h2>联系方式</h2>
          <p>CONTACT</p>
        </div>
        <dl className="contact-details">
          <div><dt><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z" /></svg>电话</dt><dd><a href="tel:18016330939">18016330939</a></dd></div>
          <div><dt><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15c-1 .4-2 .6-3 .6l-4 2 .8-3C3.5 13.4 2 11.5 2 9.3 2 5.8 5.5 3 9.8 3c3.8 0 7 2.2 7.6 5.1" /><path d="M22 14c0-3-2.8-5.4-6.2-5.4s-6.2 2.4-6.2 5.4 2.8 5.4 6.2 5.4h1.4l3.1 1.6-.6-2.7A5.1 5.1 0 0 0 22 14Z" /><path d="M6.5 8h.1M11.5 8h.1M13.5 13.5h.1M18 13.5h.1" /></svg>微信</dt><dd>Cyano0616</dd></div>
          <div><dt><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 3v18M12 7h4M12 11h4M12 15h3" /></svg>小红书</dt><dd>Cyano</dd></div>
          <div className="contact-email"><dt><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>邮箱</dt><dd><a href="mailto:lishuaqi2022@163.com">lishuaqi2022@163.com</a></dd></div>
        </dl>
        <div className="contact-qr-row">
          <figure><ContactQR file="wechat-qr.png" label="微信二维码" /><figcaption>微信</figcaption></figure>
          <figure><ContactQR file="xiaohongshu-qr.png" label="小红书二维码" /><figcaption>小红书</figcaption></figure>
        </div>
      </PortfolioPage>
      </>}
    </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)

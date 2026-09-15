import { useLayoutEffect } from 'react'
import './PortfolioMotion.css'

export default function usePortfolioMotion(route) {
  useLayoutEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches) return
    const animations = new Set()
    const played = new Set()
    const observers = []
    const observedGroups = []
    const ease = 'cubic-bezier(.16,1,.3,1)'
    const play = (node, frames, delay = 0, duration = 1500) => {
      animations.forEach(animation => {
        if (animation.effect.target === node) animation.cancel()
      })
      const animation = node.animate(frames, { duration: duration * .7, delay: delay * .7, easing: ease, fill: 'backwards' })
      animations.add(animation)
      animation.finished.then(() => animations.delete(animation), () => animations.delete(animation))
    }
    const reveal = (node, delay = 0) => play(node, [
      { clipPath: 'inset(100% 0 0 0)', translate: '0 90px', scale: '.96 1.08' },
      { clipPath: 'inset(0% 0 0 0)', translate: '0 0', scale: '1 1' },
    ], delay)
    const title = (node, delay = 0) => play(node, [
      { clipPath: 'inset(0 100% 0 0)', translate: '-16vw 60px', scale: '.72 1.35' },
      { clipPath: 'inset(0 0% 0 0)', translate: '0 0', scale: '1 1' },
    ], delay, 1800)
    const observe = (nodes, callback, options) => {
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting && entry.intersectionRatio >= options.threshold && !played.has(entry.target))
        visible.forEach((entry, index) => {
          played.add(entry.target)
          callback(entry.target, index)
        })
      }, options)
      nodes.forEach(node => observer.observe(node))
      observers.push(observer)
      observedGroups.push({ nodes, observer })
    }
    const preparePage = ({ detail: id }) => {
      const page = document.getElementById(id)
      if (!page) return
      observedGroups.forEach(({ nodes, observer }) => {
        nodes.forEach(node => {
          if (!page.contains(node)) return
          played.delete(node)
          observer.unobserve(node)
          observer.observe(node)
        })
      })
    }
    window.addEventListener('portfolio-page-enter', preparePage)
    // Re-arm a whole module only after it leaves the viewport, not during its reveals.
    const pages = new IntersectionObserver(entries => {
      entries.filter(entry => entry.intersectionRatio < .01).forEach(({ target: page }) => {
        played.forEach(node => {
          if (page.contains(node)) played.delete(node)
        })
      })
    }, { threshold: .01 })
    document.querySelectorAll('.hero').forEach(page => pages.observe(page))
    observers.push(pages)
    const home = document.querySelector('#home')
    if (home) observe([home], () => {
      const nodes = [
        ...home.querySelectorAll('.hero-intro-labels p, .hero-specialties p'),
        ...document.querySelectorAll('.hero-footer > *'),
      ]
      nodes.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
      nodes.forEach((node, i) => reveal(node, 150 + i * 180))
    }, { threshold: .5 })
    observe([...document.querySelectorAll('.hero:not(#home)')], page => {
      page.querySelectorAll('.projects-heading p, .about-english-name, .study-heading h1').forEach(node => title(node))
      page.querySelectorAll('.projects-heading h2, .about-identity h2, .about-fields, .study-heading p, .study-software, .contact-details > div, .contact-qr-row figure').forEach((node, i) => reveal(node, 350 + i * 120))
    }, { threshold: .35 })
    // The browser intersects these with both the viewport and their nested scroll containers.
    observe([...document.querySelectorAll('.project-preview, .accordion-item, .study-hero, .study-video-grid > div, .study-image-grid > button, .study-frame, .about-summary, .about-skills, .experience-entry, .project-history-entry')], (node, index) => {
      reveal(node, 450 + Math.min(index, 5) * 130)
      const media = node.querySelector('img, video')
      if (media) play(media, [{ scale: '1.12', translate: '0 3%' }, { scale: '1', translate: '0 0' }], 450 + Math.min(index, 5) * 130, 2100)
    }, { threshold: .08 })
    const reset = () => { if (preference.matches) animations.forEach(animation => animation.cancel()) }
    preference.addEventListener('change', reset)
    return () => {
      observers.forEach(observer => observer.disconnect())
      animations.forEach(animation => animation.cancel())
      preference.removeEventListener('change', reset)
      window.removeEventListener('portfolio-page-enter', preparePage)
    }
  }, [route])
}

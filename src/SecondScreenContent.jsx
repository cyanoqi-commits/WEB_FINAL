import { useRef, useState } from 'react';
import './SecondScreenContent.css';

function AboutContent() {
  const skills = [
    ['建模', [['Blender', 'blender.svg'], ['Plasticity', 'plasticity.png'], ['ZBrush', 'zbrush.svg'], ['Marvelous Designer', 'marvelous.png']]],
    ['渲染', [['OctaneRender', 'octane.svg'], ['Cycles（Blender 渲染器）', 'blender.svg']]],
    ['贴图', [['Adobe Photoshop', 'photoshop.svg'], ['Adobe Illustrator', 'illustrator.svg'], ['Substance 3D Painter', 'painter.svg']]],
    ['引擎', [['Unreal Engine 5', 'unreal.svg']]],
    ['特效', [['Houdini', 'houdini.png']]],
    ['后期', [['Adobe After Effects', 'aftereffects.png'], ['DaVinci Resolve', 'resolve.png'], ['Nuke', 'nuke.png']]],
  ];

  return (
    <div className="about-content">
      <div className="about-introduction">
        <div className="about-identity">
          <h2>李帅奇</h2>
          <p className="about-english-name">CYANO LI</p>
          <p className="about-fields">CG概念 / 动态影像<br />3D建模 / AIGC创意</p>
        </div>
        <section className="about-summary" aria-labelledby="summary-heading">
          <h3 id="summary-heading"><i aria-hidden="true" />简历概述</h3>
          <ul>
            <li>5 年商业三维视觉经验，擅长前期概念创意、三维场景制作、动态影像、硬表面建模。</li>
            <li>项目覆盖演唱会舞台 VJ、LiveHouse、虚拟偶像舞台 CG、品牌 TVC、数字空间及 XR 虚拟拍摄。</li>
            <li>可独立完成视觉概念、LookDev、场景与资产制作、材质灯光、动画特效、渲染合成及多屏内容交付。</li>
            <li>具备 2–5 人项目协作与进度统筹经验。</li>
            <li>熟练运用 AIGC 工具辅助前期概念开发与风格验证，并完成制作阶段的素材生成、修改及优化，提升方案迭代与落地效率。</li>
          </ul>
        </section>
      </div>
      <section className="about-skills" aria-labelledby="skills-heading">
        <h3 id="skills-heading"><i aria-hidden="true" />专业技能</h3>
        <dl className="skills-grid">
          {skills.map(([category, software]) => (
            <div className="skill-group" key={category}>
              <dt>{category}</dt>
              <dd>{software.map(([name, icon]) => (
                <span className="software-icon" key={name} tabIndex={0} role="img" aria-label={name}>
                  <img src={`${import.meta.env.BASE_URL}icons/${icon}`} alt="" width="30" height="30" />
                  <span className="software-tooltip" aria-hidden="true">{name}</span>
                </span>
              ))}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="about-content experience-content">
      <div className="experience-overview">
        <section aria-labelledby="work-history-heading">
          <h3 id="work-history-heading"><i aria-hidden="true" />工作经历</h3>
          <article className="experience-entry">
            <div className="experience-entry-heading"><h4>MOTSE 墨子</h4><span>2024–2026</span></div>
            <p className="experience-role">三维创意设计师、模型师</p>
            <ul>
              <li>负责舞台视觉、品牌 CG 及数字空间影像项目的前期创意提案、项目的全过程执行以及最终的渲染合成以及交付。</li>
              <li>独立完成或带领 2–5 人团队，协调三维、动画、后期等岗位，完成项目交付并把控画面质量。</li>
              <li>参与腾讯、比亚迪、纯 K、光峰等客户项目，根据需求在 1–2 月完成 1–3 分钟高质量 CG 视觉内容，最终应用于游戏 CG、虚拟偶像、演出 LIVEHOUSE、演唱会、企业宣传厅等，累计播放量超过百万。</li>
            </ul>
          </article>
          <article className="experience-entry">
            <div className="experience-entry-heading"><h4>METASIZE 元尺度</h4><span>2021–2024</span></div>
            <p className="experience-role">CG 导演、创意指导</p>
            <ul>
              <li>为品牌 IP 以及品牌升级提供创意解决方案，针对品牌需求进行三维短片以及相关物料的制作。</li>
              <li>合作企业包括喜力、蓝豹、海澜之家、Amorphous Studio、PAN 等，内容包含及涉及广告、商业演出、虚拟拍摄、数字时尚等多个领域。</li>
              <li>为 CG 动画设计分镜，指导项目的推进和执行，与多部门统筹协作完成项目。</li>
            </ul>
          </article>
        </section>
        <section className="education-history" aria-labelledby="education-heading">
          <h3 id="education-heading"><i aria-hidden="true" />学校经历</h3>
          <article className="experience-entry">
            <h4>UAL 伦敦艺术学院</h4>
            <p className="experience-role">影视特效 · 硕士学位</p>
            <p className="education-english">London College of Communication<br />Visual Effects MA</p>
            <p className="experience-date">2022.9–2023.11</p>
          </article>
          <article className="experience-entry">
            <h4>上海视觉艺术学院</h4>
            <p className="experience-role">主题环境设计 · 学士学位</p>
            <p className="education-english">Shanghai Institute of Visual Arts</p>
            <p className="experience-date">2017.9–2021.6</p>
          </article>
        </section>
      </div>

    </div>
  );
}

function ProjectsContent() {
  const projects = [
    ['腾讯星瞳 5 周年庆动画 CG', '2026.07', '根据客户的初步意向，为 CG 舞台视觉进行概念创意设计、主体舞台的模型设计和制作，相关视频在社交媒体累计播放量超过 50 万。'],
    ['李宇春皇后与梦想演唱会舞台 VJ', '2025.10', '为李宇春皇后与梦想全国巡回演唱会进行视觉升级，负责部分歌曲的舞美视频物料的设计与制作，产出在多场万人级别演唱会使用。'],
    ['冠珠瓷砖 × 迪丽热巴 2025 品牌宣传片', '2025.09', '负责企业宣传片的虚拟环境的设计和制作，视频投放在各大社媒平台，累计点赞超过 2 万。'],
    ['比亚迪空间 LED 数字空间影像装置', '2025.3', '负责比亚迪数字空间展厅视频物料前期概念设计，以及相关物料制作，视频物料在亚迪空间郑州馆持续播放。'],
    ['纯 KLivehouse、KTV 舞台美术物料', '2025.3', '为纯 K 旗下的 KTV、LIVEHOUSE 演出歌曲设计相对应的舞美 VJ，累计超过 10 余支，成片在全国连锁店铺持续播放。'],
    ['Amorphous Studio 2024 伦敦时装周春夏数字时装', '2023.9', '针对品牌春夏时装设计制作数字配饰，成品在宣传视频中呈现的同时通过 3D 打印成实体，由吴磊、吕爵安等明星在商业拍摄和个人演唱会中使用。'],
    ['Astro XR 虚拟拍摄', '2022.5', '负责项目主题概念设计、3D 场景搭建、灯光合成。'],
    ['蓝豹 LAMPO 数字卡通 IP 形象', '2021.6', '根据品牌需求制作企业官方数字 IP 形象，成品在企业公众号持续投放。'],
  ];

  return (
    <div className="about-content experience-content projects-content">
      <section className="project-history" aria-labelledby="project-history-heading">
        <h3 id="project-history-heading"><i aria-hidden="true" />参与项目</h3>
        <div className="project-history-grid">
          {projects.map(([name, date, description]) => (
            <article className="project-history-entry" key={name}>
              <div className="experience-entry-heading"><h4>{name}</h4><span>{date}</span></div>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function SecondScreenContent() {
  const [slide, setSlide] = useState(0);
  const [offset, setOffset] = useState(0);
  const drag = useRef(null);
  const viewport = useRef(null);

  function startDrag(event) {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('a, button')) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
  }

  function moveDrag(event) {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.horizontal) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { drag.current = null; return; }
      if (Math.abs(dx) < 8) return;
      start.horizontal = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const atEdge = (slide === 0 && dx > 0) || (slide === 2 && dx < 0);
    setOffset(atEdge ? dx * .15 : dx);
  }

  function finishDrag(event) {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (event.type === 'pointerup' && start.horizontal && Math.abs(dx) > Math.min(90, viewport.current.clientWidth * .18)) {
      setSlide(previous => Math.max(0, Math.min(2, previous + (dx < 0 ? 1 : -1))));
      // 将焦点留在可见的切换区域，避免停在滑出屏幕的图标上。
      viewport.current.focus({ preventScroll: true });
    }
    drag.current = null;
    setOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="second-screen-copy">
      <button className="second-arrow second-arrow-left" type="button" aria-label="上一面板" disabled={slide === 0} onClick={() => setSlide(previous => Math.max(0, previous - 1))}>
        <span aria-hidden="true" />
      </button>
      <button className="second-arrow second-arrow-right" type="button" aria-label="下一面板" disabled={slide === 2} onClick={() => setSlide(previous => Math.min(2, previous + 1))}>
        <span aria-hidden="true" />
      </button>
      <div className="second-slider" ref={viewport} tabIndex={0} role="region" aria-label="第二屏内容，左右拖动或使用方向键切换"
        onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}
        onDragStart={event => event.preventDefault()}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            setSlide(previous => Math.max(0, Math.min(2, previous + (event.key === 'ArrowLeft' ? -1 : 1))));
            viewport.current.focus({ preventScroll: true });
          }
        }}>
        <div className={`second-slider-track${offset ? ' is-dragging' : ''}`} style={{ transform: `translateX(calc(${-slide * 100}% + ${offset}px))` }}>
          <div id="second-slide-1" className="second-slide" role="group" aria-label="个人简介" inert={slide !== 0}>
            <AboutContent />
          </div>
          <div id="second-slide-2" className="second-slide second-slide-experience" role="group" aria-label="工作履历/教育背景" tabIndex={slide === 1 ? 0 : -1} inert={slide !== 1}>
            <ExperienceContent />
          </div>
          <div id="second-slide-3" className="second-slide second-slide-projects" role="group" aria-label="项目经历" tabIndex={slide === 2 ? 0 : -1} inert={slide !== 2}>
            <ProjectsContent />
          </div>
        </div>
      </div>
      <nav className="second-pagination" aria-label="第二屏分页">
        {['个人简介', '工作履历/教育背景', '项目经历'].map((name, index) => (
          <button key={name} type="button" aria-controls={`second-slide-${index + 1}`} aria-current={slide === index ? 'page' : undefined} onClick={() => setSlide(index)}>{name}</button>
        ))}
      </nav>
    </div>
  );
}


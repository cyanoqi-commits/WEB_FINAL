import mediaAsset from './mediaAsset'
import { useRef, useState } from 'react'
import './ProjectStudy.css'

// 后续在这里替换项目文字、大图或视频，以及九宫格素材。
const glockStudy = {
  title: '格洛克-G19',
  description: '·使用标准硬表面流程1：1复刻GLOCK G19手枪\n·使用PLASTICITY建模，BLENDER/ZBRUSH调整模型制作高模，RIZOMUV拆分UV，八猴烘焙，SUBSTANCE PAINTER绘制贴图，OCTANE渲染',
  software: [
    { name: 'PLASTICITY', icon: 'icons/plasticity.png' },
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'ZBRUSH', icon: 'icons/zbrush.svg' },
    { name: 'RIZOMUV', icon: 'icons/rizomuv.png' },
    { name: 'MARMOSET', icon: 'icons/marmoset.png' },
    { name: 'SUBSTANCE PAINTER', icon: 'icons/painter.svg' },
    { name: 'OCTANE', icon: 'icons/octane.svg' },
  ],
  hero: { type: 'image', src: 'images/glock-detail-0.png' },
  frames: Array.from({ length: 18 }, (_, index) => `images/glock-detail-${index + 1}.png`),
}

const typewriterStudy = {
  title: '打字机',
  description: '使用blender建模，octane渲染',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'OCTANE', icon: 'icons/octane.svg' },
  ],
  hero: { type: 'image', src: 'images/typewriter-detail-1.png' },
  images: ['images/typewriter-detail-2.png', 'images/typewriter-detail-3.png'],
  frames: [],
}

const cassetteStudy = {
  ...typewriterStudy,
  title: '磁带',
  hero: { type: 'image', src: 'images/cassette-detail-1.png' },
  images: ['images/cassette-detail-2.png', 'images/cassette-detail-3.png'],
}

const xingtongStudy = {
  title: '星瞳5周年庆',
  description: '·设计星瞳5周年庆活动主舞台时钟背景，根据甲方需求为舞台氛围设计提供参考\n·使用BLENDER进行模型制作，以及舞台搭建，完成后配合参考图使用AIGC为后续最终效果提供参考\n·场景在五周年庆直播以及后续社交平台单首演出歌曲MV中使用，累计点击率超过50万',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'UE5', icon: 'icons/ue5.png' },
    { name: 'GPT', icon: 'icons/gpt.png' },
  ],
  hero: { type: 'image', src: 'images/xingtong-cover.png' },
  videos: [8, 1, 2, 3, 4, 5, 6, 7].map((number) => `videos/xingtong-cut-${number}.mp4`),
  frames: [],
}

const evilStudy = {
  title: '纯KVJ - EVIL LOOP',
  description: '·负责循环动画的概念设计、模型材质制作、贴图处理，场景渲染以及后期合成',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'OCTANE', icon: 'icons/octane.svg' },
    { name: 'AE', icon: 'icons/aftereffects.png' },
    { name: 'NUKE', icon: 'icons/nuke.png' },
  ],
  hero: { type: 'image', src: 'images/evil-cover.png' },
  loopVideo: 'videos/evil-loop.mp4',
  frames: [],
}

const psLoveStudy = {
  title: '纯KVJ - PS I LOVE YOU',
  description: '·负责视频的概念创意、分镜设计，模型制作、粒子模拟，3D渲染以及后期合成输出',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'HOUDINI', icon: 'icons/houdini.png' },
    { name: 'AE', icon: 'icons/aftereffects.png' },
    { name: 'UE5', icon: 'icons/ue5.png' },
  ],
  hero: { type: 'image', src: 'images/ps-love-cover.png' },
  videos: Array.from({ length: 4 }, (_, index) => `videos/ps-love-cut-${index + 1}.mp4`),
  frames: [],
}

const chaotianmenStudy = {
  title: '纯KVJ - 朝天门',
  description: '·负责视频的概念创意、分镜设计，2D动态图形的设计与制作,3D渲染以及后期合成输出',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'AE', icon: 'icons/aftereffects.png' },
  ],
  hero: { type: 'image', src: 'images/chaotianmen-cover.png' },
  videos: Array.from({ length: 6 }, (_, index) => `videos/chaotianmen-cut-${index + 1}.mp4`),
  frames: [],
}

const birdsStudy = {
  title: '纯KVJ - BIRDS LIKE A FEATHER',
  description: '·负责视频的概念创意、分镜设计，3D渲染以及后期合成输出',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'AE', icon: 'icons/aftereffects.png' },
    { name: 'Davinci', icon: 'icons/resolve.png' },
  ],
  hero: { type: 'image', src: 'images/birds-cover.png' },
  videos: Array.from({ length: 7 }, (_, index) => `videos/birds-cut-${index + 1}.mp4`),
  frames: [],
}

const openShowStudy = {
  title: '纯K LIVEHOUSE 开场秀',
  description: '·为纯K重庆Livehouse酒吧设计一段暖场烘托氛围的开场视频\n·负责视频的分镜，概念、动画以及渲染合成全流程',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'AE', icon: 'icons/aftereffects.png' },
    { name: 'Davinci', icon: 'icons/resolve.png' },
    { name: 'SUBSTANCE PAINTER', icon: 'icons/painter.svg' },
    { name: 'OCTANE', icon: 'icons/octane.svg' },
  ],
  hero: { type: 'image', src: 'images/open-show-cover.png' },
  videos: Array.from({ length: 8 }, (_, index) => `videos/open-show-cut-${index + 1}.mp4`),
  frames: [],
}

const zhoudaxiaStudy = {
  title: '纯KVJ - 周大侠',
  description: '·负责视频的概念创意、分镜设计，角色动画，3D渲染以及后期合成输出',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'MARVELOUS DESIGNER', icon: 'icons/marvelous.png' },
    { name: 'AE', icon: 'icons/aftereffects.png' },
  ],
  hero: { type: 'image', src: 'images/zhoudaxia-cover.png' },
  videos: Array.from({ length: 6 }, (_, index) => `videos/zhoudaxia-cut-${index + 1}.mp4`),
  frames: [],
}

const lycStudy = {
  title: '李宇春皇后与梦想演出舞美',
  description: '·为李宇春皇后与梦想全国巡回演唱会进行视觉升级，负责部分歌曲的舞美视频物料的设计与制作，产出在多场万人级别演唱会多次使用',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'HOUDINI', icon: 'icons/houdini.png' },
  ],
  hero: { type: 'image', src: 'images/lyc-cover.png' },
  videos: Array.from({ length: 2 }, (_, index) => `videos/lyc-cut-${index + 1}.mp4`),
  frames: [],
}

const guanzhuStudy = {
  title: '冠珠企业宣传片',
  description: '·负责企业宣传片的虚拟环境的设计和制作，视频投放在各大社媒平台，累计点赞超过2万',
  software: [{ name: 'BLENDER', icon: 'icons/blender.svg' }],
  hero: { type: 'image', src: 'images/guanzhu-cover.png' },
  videos: Array.from({ length: 7 }, (_, index) => `videos/guanzhu-cut-${index + 1}.mp4`),
  frames: [],
}
const premuStudy = {
  title: 'Amorphous Studio 2024伦敦时装周春夏数字时装',
  description: '··针对品牌春夏时装设计制作数字配饰，成品在宣传视频中呈现的同时通过3D打印成实体由吴磊、吕爵安等明星在商业拍摄和个人演唱会中使用',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'OCTANE', icon: 'icons/octane.svg' },
  ],
  hero: { type: 'image', src: 'images/premu-cover.jpg' },
  videos: [1, 2, 3, 4].map((number) => `videos/premu-cut-${number}.mp4`),
  frames: [],
}
const encoreStudy = {
  title: '纯K ENCORE重庆开业宣传视频',
  description: '·为纯K旗下Livehouse Encore开业设计宣传物料视频\n·负责视频的概念创意设计，镜头的分镜制作，角色服装以及相关模型的建模',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'C4D', icon: 'icons/c4d.png' },
    { name: 'MARVELOUS DESIGNER', icon: 'icons/marvelous.png' },
  ],
  hero: { type: 'image', src: 'images/encore-cover-v2.png' },
  videos: Array.from({ length: 6 }, (_, index) => `videos/encore-cut-${index + 1}.mp4`),
  frames: [],
}
const bydStudy = {
  title: '比亚迪空间数字影像装置',
  description: '·负责比亚迪数字空间展厅视频物料前期概念设计，以及相关物料制作，视频物料在亚迪迪空间郑州馆持续播放',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'C4D', icon: 'icons/c4d.png' },
  ],
  gallery: Array.from({ length: 9 }, (_, index) => `images/byd-${index + 1}.png`),
  frames: [],
}
const thunderousStudy = {
  title: '纯KVJ-THUNDEROUS',
  description: '·负责视频的概念创意、分镜设计，3D渲染以及后期合成输出',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'AE', icon: 'icons/aftereffects.png' },
    { name: 'UE5', icon: 'icons/ue5.png' },
  ],
  hero: { type: 'image', src: 'images/thunderous-cover.png' },
  videos: Array.from({ length: 4 }, (_, index) => `videos/thunderous-cut-${index + 1}.mp4`),
  frames: [],
}
const momentStudy = {
  title: 'UAL毕设-MOMENT',
  description: '·UAL毕业设计',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'UE5', icon: 'icons/ue5.png' },
    { name: 'SUBSTANCE PAINTER', icon: 'icons/painter.svg' },
    { name: 'MARVELOUS DESIGNER', icon: 'icons/marvelous.png' },
    { name: 'DAVINCI', icon: 'icons/resolve.png' },
    { name: 'ZBRUSH', icon: 'icons/zbrush.svg' },
  ],
  hero: { type: 'image', src: 'images/moment-cover.png' },
  gallery: Array.from({ length: 16 }, (_, index) => `images/moment-${index + 1}.png`),
  frames: [],
}
const churchStudy = {
  title: 'UAL-个人练习',
  description: '·UAL个人练习',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'UE5', icon: 'icons/ue5.png' },
    { name: 'ZBRUSH', icon: 'icons/zbrush.svg' },
  ],
  loopVideo: 'videos/church-loop.mp4',
  frames: [],
}
const bangStudy = {
  title: '纯KVJ-BANGBANGBANG',
  description: '·负责视频的概念创意、分镜设计，3D渲染以及后期合成输出',
  software: [
    { name: 'BLENDER', icon: 'icons/blender.svg' },
    { name: 'UE5', icon: 'icons/ue5.png' },
  ],
  hero: { type: 'image', src: 'images/bang-cover.png' },
  videos: Array.from({ length: 4 }, (_, index) => `videos/bang-cut-${index + 1}.mp4`),
  frames: [],
}
export default function ProjectStudy({ projectId = 1 }) {
  const study = projectId === 19 ? bangStudy : projectId === 17 ? momentStudy : projectId === 16 ? thunderousStudy : projectId === 15 ? bydStudy : projectId === 14 ? encoreStudy : projectId === 13 ? premuStudy : projectId === 12 ? guanzhuStudy : projectId === 11 ? lycStudy : projectId === 10 ? zhoudaxiaStudy : projectId === 9 ? openShowStudy : projectId === 8 ? birdsStudy : projectId === 7 ? chaotianmenStudy : projectId === 6 ? psLoveStudy : projectId === 5 ? evilStudy : projectId === 4 ? xingtongStudy : projectId === 3 ? cassetteStudy : projectId === 2 ? typewriterStudy : glockStudy
  const [preview, setPreview] = useState(null)
  const previewDialog = useRef(null)
  const asset = mediaAsset
  const previewImages = projectId === 3 ? [study.hero.src, ...study.images] : (study.gallery ?? study.frames)
  const closePreview = async () => {
    if ([3, 15, 17, 19].includes(projectId) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      await previewDialog.current.querySelector('.study-fullscreen-media').animate(
        [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.35)', opacity: 0 }],
        { duration: 250, easing: 'ease-in', fill: 'forwards' },
      ).finished
    }
    previewDialog.current.close()
    setPreview(null)
  }
  return (
    <>
    <a className="study-back" href="#page-3"><span aria-hidden="true">←</span><span>返回项目列表</span></a>
    <article className="project-study-scroll" tabIndex={0} aria-label={`${study.title} 项目详情`}>
      <header className="study-heading">
        <div>
          <h1>{study.title}</h1>
          <p>{study.description}</p>
        </div>
        <div className="study-software">
          <span>使用软件</span>
          <div className="study-software-icons">
            {study.software.map(({ name, icon }) => <img key={name} src={asset(icon)} alt={name} title={name} />)}
          </div>
        </div>
      </header>
      {projectId === 3 ? <div className="study-portrait-layout">
        {previewImages.map((src, index) => <button className="study-portrait-image" type="button" key={src}
          aria-label={`放大磁带图片 ${index + 1}`} onClick={() => { setPreview(index); previewDialog.current.showModal() }}>
          <img src={asset(src)} alt={`磁带 ${index + 1}`} />
        </button>)}
      </div> : <div>
      {study.hero && <div className={`study-hero${projectId === 6 ? ' study-ps-cover' : ''}`}>
        {study.hero.type === 'video'
          ? <video src={asset(study.hero.src)} controls playsInline preload="metadata" />
          : <img src={asset(study.hero.src)} alt={study.title} />}
      </div>}
      {study.images?.map((src, index) => (
        <div className="study-hero" key={src}>
          <img src={asset(src)} alt={`${study.title} 细节 ${index + 1}`} loading="lazy" />
        </div>
      ))}
      </div>}
      {study.gallery && <div className="study-image-grid">{study.gallery.map((src, index) => <button type="button" key={src} aria-label={`放大作品图片 ${index + 1}`} onClick={() => { setPreview(index); previewDialog.current.showModal() }}><img src={asset(src)} alt={`${study.title} ${index + 1}`} loading="lazy" /></button>)}</div>}
      {study.loopVideo && <div className="study-hero">
        <video src={asset(study.loopVideo)} autoPlay muted loop playsInline preload="auto" aria-label={study.title} />
      </div>}
      {study.videos && <div className={`study-video-grid${projectId === 14 ? ' study-video-grid-three' : projectId === 19 ? ' study-video-grid-single' : ''}`}>
        {study.videos.map((src, index) => <div key={src} className={projectId === 11 ? 'study-video-crop' : undefined}><video data-src={asset(src)} muted loop playsInline preload="metadata"
          onClick={projectId === 19 ? (event) => { event.currentTarget.pause(); setPreview(index); previewDialog.current.showModal() } : undefined}
          aria-label={`${study.title} 视频 ${index + 1}`}
          onLoadedMetadata={(event) => { if ([6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 19].includes(projectId)) event.currentTarget.currentTime = event.currentTarget.duration / 2 }}
          onMouseEnter={(event) => { if ([7, 8, 9, 10, 11, 12, 13, 14, 16, 19].includes(projectId)) event.currentTarget.currentTime = 0; event.currentTarget.play().catch(() => {}) }}
          onMouseLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = [6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 19].includes(projectId) ? event.currentTarget.duration / 2 : 0 }} /></div>)}
      </div>}
      {projectId === 13 && <div className="study-premu-image"><img src={asset('images/premu-accessories.png')} alt="数字配饰及实体佩戴展示" loading="lazy" /></div>}
      {study.frames.length > 0 && <div className="study-grid" aria-label="作品细节九宫格">
        {study.frames.map((src, index) => (
          <button type="button" className="study-frame" key={index} aria-label={`放大作品细节 ${index + 1}`}
            onClick={() => { setPreview(index); previewDialog.current.showModal() }}>
            {src ? <img src={asset(src)} alt={`作品细节 ${index + 1}`} loading="lazy" />
              : <><span>{String(index + 1).padStart(2, '0')}</span><small>16:9</small></>}
          </button>
        ))}
      </div>}
    </article>
      <dialog ref={previewDialog} className="study-fullscreen-preview" aria-label="作品细节全屏预览" onWheel={(event) => event.stopPropagation()}>
        <button type="button" className="study-preview-back" onClick={closePreview}>← 返回</button>
        {preview !== null &&
        <div className={`study-fullscreen-media${projectId === 3 ? ' study-fullscreen-portrait' : ''}`} key={preview}>
          {projectId === 19 ? <video src={asset(study.videos[preview])} className="study-bang-preview" autoPlay muted loop playsInline onClick={closePreview} style={{ width: '100%', height: 'auto', maxHeight: '96dvh', objectFit: 'contain', cursor: 'zoom-out' }} /> : previewImages[preview]
            ? <img src={asset(previewImages[preview])} alt="" onClick={closePreview} style={{ cursor: 'zoom-out' }} />
            : <div className="study-frame"><span>{String(preview + 1).padStart(2, '0')}</span><small>16:9</small></div>}
        </div>}
      </dialog>
    </>
  )
}

import mediaAsset from './mediaAsset'
import './ProjectCards.css'

// 替换 image 为 public 中的图片路径；图片宽度统一，高度按原始比例变化。
export const projects = Array.from({ length: 21 }, (_, index) => ({
  id: index + 1,
  title: `项目 ${String(index + 1).padStart(2, '0')}`,
  image: index < 3 ? `images/project-${String(index + 1).padStart(2, '0')}.png` : null,
  video: index >= 3 && index <= 20 ? `videos/project-${String(index === 10 ? 19 : index === 18 ? 11 : index === 14 ? 17 : index === 16 ? 14 : index === 19 ? 15 : index === 13 ? 20 : index + 1).padStart(2, '0')}.mp4${index === 4 ? '?v=2' : ''}` : null,
})).filter((project) => ![18, 20, 21].includes(project.id))

export default function ProjectCards() {
  return (
    <div className="project-cards-scroll" tabIndex={0} aria-label={`${projects.length} 个项目`}>
      <div className="project-cards-grid">
        {projects.map((project, index) => (
          <a className="project-preview" href={`#project-${project.id}`} key={project.id} style={{ '--card-delay': `${index * 50}ms` }} aria-label={`查看${project.title}`}
            onMouseEnter={(event) => { event.currentTarget.querySelector('video')?.play().catch(() => {}) }}
            onMouseLeave={(event) => { const video = event.currentTarget.querySelector('video'); if (video) { video.pause(); video.currentTime = 0 } }}>
            {project.video
              ? <video data-src={`${import.meta.env.BASE_URL}${project.video}`} muted loop playsInline preload="metadata" aria-label={project.title} />
              : project.image
              ? <img src={mediaAsset(project.image)} alt={project.title} loading="lazy" />
              : <div className="project-placeholder"><span>{String(project.id).padStart(2, '0')}</span><span>16:9</span></div>}
            {project.id === 1 && <span className="project-hover-label">格洛克-G19</span>}
            {project.id === 2 && <span className="project-hover-label">打字机</span>}
            {project.id === 3 && <span className="project-hover-label">磁带</span>}
            {project.id === 4 && <span className="project-hover-label">星瞳5周年庆</span>}
            {project.id === 5 && <span className="project-hover-label">纯KVJ - EVIL LOOP</span>}
            {project.id === 6 && <span className="project-hover-label">纯KVJ - PS I LOVE YOU</span>}
            {project.id === 7 && <span className="project-hover-label">纯KVJ - 朝天门</span>}
            {project.id === 8 && <span className="project-hover-label">纯KVJ - BIRDS LIKE A FEATHER</span>}
            {project.id === 9 && <span className="project-hover-label">纯K LIVEHOUSE 开场秀</span>}
            {project.id === 10 && <span className="project-hover-label">纯KVJ-周大侠</span>}
            {project.id === 11 && <span className="project-hover-label">李宇春皇后与梦想演唱会</span>}
            {project.id === 12 && <span className="project-hover-label">冠珠瓷砖×迪丽热巴企业宣传视频</span>}
            {project.id === 13 && <span className="project-hover-label">Amorphous Studio 2024伦敦时装周春夏数字时装</span>}
            {project.id === 14 && <span className="project-hover-label">纯K ENCORE重庆开业宣传视频</span>}
            {project.id === 16 && <span className="project-hover-label">纯KVJ-THUNDEROUS</span>}
            {project.id === 17 && <span className="project-hover-label">UAL毕设-MOMENT</span>}
            {project.id === 19 && <span className="project-hover-label">纯KVJ-BANGBANGBANG</span>}
          </a>
        ))}
      </div>
    </div>
  )
}

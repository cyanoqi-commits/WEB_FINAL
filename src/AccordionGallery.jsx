import mediaAsset from './mediaAsset'
import { useRef, useState } from 'react'
import './AccordionGallery.css'

const items = [
  { image: `images/still-01.png`, label: 'Canyon' },
  { image: `images/still-02.png`, label: 'Ridgeline' },
  { image: `images/still-03.jpg`, label: 'Falls' },
  { image: `images/still-04.jpg`, label: 'Harbour' },
  { image: `images/still-05.jpg`, label: 'Skyline' },
  { image: `images/still-06.jpg`, label: 'Dragon Temple' },
  { image: `images/still-07.jpg`, label: 'Monster Room' },
  { image: `images/still-08.jpg`, label: 'Cyberpunk Room' },
]

export default function AccordionGallery() {
  const [active, setActive] = useState(2)
  const [ratios, setRatios] = useState({})
  const [preview, setPreview] = useState(null)
  const [closing, setClosing] = useState(false)
  const dialog = useRef(null)
  const closePreview = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) dialog.current.close()
    else setClosing(true)
  }
  return (
    <>
    <div className="accordion-gallery" aria-label="单帧练习画廊">
      {items.map((item, index) => (
        <button key={item.label} type="button" className="accordion-item"
          style={{ '--image-ratio': ratios[index] ?? 0.75 }}
          aria-pressed={active === index} aria-label={item.label}
          onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => {
            setActive(index)
            setPreview(item)
            dialog.current.showModal()
          }}>
          <img src={mediaAsset(item.image)} alt={item.label} loading="lazy" onLoad={(event) => {
            const image = event.currentTarget
            setRatios(previous => ({ ...previous, [index]: image.naturalWidth / image.naturalHeight }))
          }} />
        </button>
      ))}
    </div>
    <dialog ref={dialog} className={`image-preview accordion-preview${closing ? ' is-closing' : ''}`} aria-label="图片全屏预览"
      onCancel={(event) => { event.preventDefault(); closePreview() }}
      onClose={() => { setClosing(false); setPreview(null) }}
      onAnimationEnd={(event) => { if (event.animationName === 'accordion-preview-fade-out' && event.target === event.currentTarget) dialog.current.close() }}
      onWheel={(event) => event.stopPropagation()}
      onClick={(event) => { if (event.target === event.currentTarget) closePreview() }}>
      <button type="button" className="image-preview-close" aria-label="关闭图片预览" onClick={closePreview}>×</button>
      {preview && <img src={mediaAsset(preview.image)} alt={preview.label} onClick={closePreview} />}
    </dialog>
    </>
  )
}

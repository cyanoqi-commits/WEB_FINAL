import { useEffect } from 'react'

export default function useMediaVisibility(route) {
  useEffect(() => {
    const visible = new Set()
    const videos = [...document.querySelectorAll('video')]
    const sync = () => videos.forEach(video => {
      if (document.hidden || !visible.has(video)) video.pause()
      else if (video.autoplay) video.play().catch(() => {})
    })
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target: video, isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio > 0) {
          visible.add(video)
          if (video.dataset.src) {
            video.src = video.dataset.src
            delete video.dataset.src
            video.load()
          }
        } else visible.delete(video)
      })
      sync()
    })
    videos.forEach(video => observer.observe(video))
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      videos.forEach(video => video.pause())
    }
  }, [route])
}

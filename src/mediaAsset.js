import images from './optimizedImages.json'

export default function mediaAsset(path) {
  return `${import.meta.env.BASE_URL}${images[path] ?? path}`
}

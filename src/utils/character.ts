import logo from '../assets/logo.svg'
// import powerLevelData from '../assets/powerlevels.json'

interface Thumbnail {
  path: string
  extension: string
}

export function formatCharacterName(name: string): string {
  const nameParts = name.split('(')
  const characterName = nameParts[0].trim()
  const realName =
    nameParts.length > 1 ? nameParts[1].replace(')', '').trim() : ''

  return `${characterName}\n${realName}`
}

export function formatDescription(description: string): string {
  const parsedDescription = parseDescription(description)

  if (parsedDescription) {
    return parsedDescription.length > 100
      ? `${parsedDescription.substring(0, 100)} ...`
      : parsedDescription
  }

  return 'Warning: No information found. Proceed with caution.'
}

export function getImageUrl(thumbnail: Thumbnail): string {
  const { path, extension } = thumbnail

  if (path.includes('image_not_available') || extension === 'gif') return logo

  return `${path}.${extension}`
}

export function parseDescription(description: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(description, 'text/html')
  return doc.body.textContent || ''
}

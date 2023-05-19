import logo from '../assets/logo.svg'
// import powerLevelData from '../assets/powerlevels.json'

interface Thumbnail {
  path: string
  extension: string
}

/**
 * Formats the character name by extracting the character name and real name (if available)
 * from the given name string.
 * @param name - The name string to format.
 * @returns The formatted character name.
 */
export function formatCharacterName(name: string): string {
  const nameParts = name.split('(')
  const characterName = nameParts[0].trim()
  const realName =
    nameParts.length > 1 ? nameParts[1].replace(')', '').trim() : ''

  return `${characterName}\n${realName}`
}

/**
 * Formats the description by parsing the HTML tags and truncating the text if it exceeds 100 characters.
 * @param description - The description string to format.
 * @returns The formatted description.
 */
export function formatDescription(description: string): string {
  const parsedDescription = parseDescription(description)

  if (parsedDescription) {
    return parsedDescription.length > 100
      ? `${parsedDescription.substring(0, 100)} ...`
      : parsedDescription
  }

  return 'Warning: No information found. Proceed with caution.'
}

/**
 * Gets the image URL based on the provided thumbnail information.
 * @param thumbnail - The thumbnail object containing the path and extension.
 * @returns The image URL.
 */
export function getImageUrl(thumbnail: Thumbnail): string {
  const { path, extension } = thumbnail

  if (path.includes('image_not_available') || extension === 'gif') return logo

  return `${path}.${extension}`
}

/**
 * Parses the description by removing HTML tags (if they exist) using DOMParser.
 * @param description - The description string to parse.
 * @returns The parsed description.
 */
export function parseDescription(description: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(description, 'text/html')
  return doc.body.textContent || ''
}
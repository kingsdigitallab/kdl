export function batchMap<T>(arr: T[], batchSize: number) {
  const batches = []
  for (let i = 0; i < arr.length; i += batchSize) {
    const batch = arr.slice(i, i + batchSize)
    batches.push(batch)
  }
  return batches
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Convert string to slug
 * NOTE: keep this implementation as replacing it will require rebuilding all markdown files and potentially break SEO
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

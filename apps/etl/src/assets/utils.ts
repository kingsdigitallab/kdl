import grayMatter from 'gray-matter'
import slugify from '@sindresorhus/slugify'
import yaml from 'yaml'
import { formatMarkdown } from '../utils/markdown.ts'

export const evalAssetsInMarkdown =
  ({
    assets
  }: {
    assets:
      | {
          original: string
          extension: string | undefined
          without_extension: string
          slug: string
          rename: boolean
        }[]
      | undefined
  }) =>
  async (
    prom: Promise<{ file?: string; filename: string }[]>,
    { filename, file }: { file: string | undefined; filename: string }
  ) => {
    const acc = await prom
    if (!file) {
      return acc
    }
    if (!filename.match(/\.md/)) {
      return acc
    }
    // NOTE: we need to parse the yaml content to be able to match the filenames without worrying about \n chars
    const { data, content } = grayMatter(file, {
      engines: {
        yaml: { ...yaml }
      }
    })
    let changed = false
    let updated = content
    // NOTE: in metadata only check on the data.feature.image value as currently it is the only place where images can be
    // we need to slugify the image filename in order to do the comparison, as it may fail with non english characters
    let feature_image = data?.feature?.image.split('/').at(-1).split('.').slice(0, -1).join('.')
    if (feature_image) {
      feature_image = slugify(feature_image)
    }
    assets?.map((asset) => {
      const content_index = updated.indexOf(asset.without_extension)
      if (content_index !== -1) {
        changed = true
        const replaced = updated?.replaceAll(asset.without_extension, asset.slug)
        updated = replaced
        asset.rename = true
        return asset
      }
      // NOTE: compare slugs
      if (feature_image === asset.slug) {
        changed = true
        data.feature.image = `${data.feature.image.split('/').slice(0, -1).join('/')}/${asset.slug}.${asset.extension}`
        asset.rename = true
        return asset
      }
      return asset
    })
    if (changed) {
      const writeContent = ['---', yaml.stringify(data), '---', '', updated].join('\n')
      acc.push({ file: await formatMarkdown({ content: writeContent }), filename })
    }
    return acc
  }

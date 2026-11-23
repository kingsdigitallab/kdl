import { join } from 'node:path'
import { IStorageFileSystem } from '../infrastructure/storage.ts'
import slugify from '@sindresorhus/slugify'
import { IMAGES_DIR } from '../utils/vars.ts'
import { evalAssetsInMarkdown } from './utils.ts'

export const assetsEvalUseCase = async ({
  dir,
  storageModule,
  mode
}: {
  dir: string
  storageModule: typeof IStorageFileSystem
  mode: 'blog' | 'projects' | 'slides'
}) => {
  const mode_dir = join(dir, mode)
  const assets_dir = join(dir, IMAGES_DIR, mode)
  const assets_files = storageModule.listFiles({ dir: assets_dir })
  const docs_files = storageModule.listFiles({ dir: mode_dir })
  const files = docs_files?.map((filename) => ({
    filename,
    file: storageModule.readFile({ dir: mode_dir, filename })?.toString()
  }))
  const to_update = assets_files
    ?.map((asset) => {
      const original = asset
      const extension = asset.split('.').at(-1)
      const without_extension = asset.split('.').slice(0, -1).join('.')
      const slug = slugify(without_extension)
      if (slug === without_extension) {
        return null
      }
      return {
        original,
        extension,
        without_extension,
        slug,
        rename: false
      }
    })
    .filter((x) => x !== null)

  const updated = await files
    ?.reduce(
      evalAssetsInMarkdown({ assets: to_update }),
      Promise.resolve([]) as Promise<{ file?: string; filename: string }[]>
    )
    .then((x) => x.map((y) => y.filename))

  return {
    assets: to_update?.filter((asset) => asset.rename).map((asset) => asset.original),
    files: updated
  }
}

import prettier from 'prettier'
import * as prettierPluginSortImports from 'prettier-plugin-sort-imports'
/**
 * Format markdown content using Prettier
 */
export const formatMarkdown = async ({ content }: { content: string }) => {
  try {
    const formatted = await prettier.format(content, {
      useTabs: true,
      tabWidth: 2,
      singleQuote: false,
      trailingComma: 'all',
      arrowParens: 'always',
      printWidth: 120,
      parser: 'markdown',
      plugins: [prettierPluginSortImports]
    })
    return formatted
  } catch (error) {
    console.warn(
      'Failed to format markdown with Prettier:',
      typeof error === 'object' && error && 'message' in error ? error?.message : ''
    )
    return content
  }
}

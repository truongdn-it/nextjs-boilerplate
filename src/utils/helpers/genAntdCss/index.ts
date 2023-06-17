import { createHash } from 'crypto'
import fs from 'fs'
import path from 'path'
import { extractStyle } from '@ant-design/cssinjs'

import { DoExtraStyleOptions } from './types'

export function doExtraStyle({
  cache,
  dir = 'css-bundle',
  baseFileName = 'antd.min',
}: DoExtraStyleOptions) {
  const baseDir = path.resolve('./public')

  const outputCssPath = path.join(baseDir, dir)

  if (fs.existsSync(outputCssPath)) {
    fs.rmSync(outputCssPath, { recursive: true })
  }

  if (!fs.existsSync(outputCssPath)) {
    fs.mkdirSync(outputCssPath, { recursive: true })
  }

  const css = extractStyle(cache, true)
  if (!css) return ''

  const md5 = createHash('md5')
  const hash = md5.update(css).digest('hex')
  const fileName = `${baseFileName}.${hash.substring(0, 8)}.css`
  const fullpath = path.join(outputCssPath, fileName)

  const res = `${dir}/${fileName}`

  if (fs.existsSync(fullpath)) return res

  fs.writeFileSync(fullpath, css)

  return res
}

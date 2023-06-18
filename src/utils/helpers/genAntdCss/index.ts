import { createHash } from 'crypto'
import fs from 'fs'
import path from 'path'
import { extractStyle } from '@ant-design/cssinjs'

import { DoExtraStyleOptions } from './types'

export function doExtraStyle({
  cache,
  dir = 'antd-output',
  baseFileName = 'antd.min',
}: DoExtraStyleOptions) {
  const baseDir = path.resolve(__dirname, '../../static/css')

  const outputCssPath = path.join(baseDir, dir)

  if (!fs.existsSync(outputCssPath)) {
    try {
      fs.mkdirSync(outputCssPath, { recursive: true })
    } catch {}
  }

  const css = extractStyle(cache, true)
  if (!css) return ''

  const md5 = createHash('md5')
  const hash = md5.update(css).digest('hex')
  const fileName = `${baseFileName}.${hash.substring(0, 8)}.css`
  const fullpath = path.join(outputCssPath, fileName)

  const res = `_next/static/css/${dir}/${fileName}`

  if (fs.existsSync(fullpath)) return res
  try {
    fs.writeFileSync(fullpath, css)
  } catch {}

  return res
}

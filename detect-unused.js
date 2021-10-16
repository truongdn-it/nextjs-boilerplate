/* eslint-disable no-console */
// scripts/detect-unused.js
const madge = require('madge')
const path = require('path')
const chalk = require('chalk')

const pruneTree = (subtree, tree) => {
  if (!subtree || subtree.length === 0) {
    return
  }
  for (let child of subtree) {
    const nextSubtree = tree[child]
    if (tree[child]) {
      delete tree[child]
    }
    pruneTree(nextSubtree, tree)
  }
}

madge(path.join(__dirname, '.'), {
  baseDir: path.join(__dirname, '.'),
  fileExtensions: ['ts', 'tsx', 'scss'],
  // detectiveOptions: {
  //   ts: {
  //     skipTypeImports: true,
  //   },
  // },
  webpackConfig: 'next.config.js',
  tsConfig: 'tsconfig.json',
  excludeRegExp: [
    /^\.next[\\/]/, // Ignore built artifacts
    /^jest\.config\.js/, // Ignore Next.js configuration
    /^next\.config\.js/, // Ignore Next.js configuration
    /^_site|coverage|cypress|docs|public|scripts[\\/]/, // Ignore
    /^next-env\.d\.ts/,
    // /^src[\\/]pages|types[\\/]/, // Ignore
  ],
}).then((res) => {
  const tree = res.obj()

  const entrypoints = Object.keys(tree).filter(
    (e) => e.startsWith('pages/') || e.startsWith('pages\\')
  )
  pruneTree(entrypoints, tree)

  const unusedFiles = Object.keys(tree)
  if (unusedFiles.length) {
    console.log(
      chalk.red(
        `⚠️  Tìm thấy ${unusedFiles.length} component được tạo ra nhưng lại không sử dụng ở đâu. Xóa ngay đi nhé! :|`
      )
    )
    unusedFiles.forEach((file) => {
      console.log(chalk.red('\x1b[33m%s\x1b[0m', chalk.red(file)))
    })
    process.exit(1)
  } else {
    console.log(chalk.green('Không có file không sử dụng! @@'))
    process.exit(0)
  }
})

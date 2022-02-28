#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chokidar = require('chokidar')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')


const argv = yargs(hideBin(process.argv)).argv
const input = (argv.i || argv.input).replace(new RegExp(`${path.sep}$`), '')
const output = argv.o || argv.output

const pattern = path.resolve(input, '**/*.svg')
const typesOutputPath = path.resolve(output, 'icons.d.ts')

const generate = () => {
  const filePaths = glob.sync(pattern)
  const fileNames = filePaths.map((filePath) => {
    const regex = new RegExp(`.+${input}${path.sep}`)

    return filePath.replace(regex, '').replace('.svg', '')
  })
  const content = `export type IconName = '${fileNames.join('\' | \'')}'`

  fs.writeFileSync(typesOutputPath, content)
}

if (argv.watch) {
  chokidar.watch(pattern, {
    useFsEvents: false,
    ignoreInitial: true,
  })
    .on('change', generate)
    .on('add', generate)
    .on('unlink', generate)
}

generate()

#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chokidar = require('chokidar')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')


const argv = yargs(hideBin(process.argv)).argv

const originalInput = argv.i || argv.input
const input = path.normalize(originalInput)
const output = path.normalize(argv.o || argv.output)

const pattern = path.resolve(input, `**${path.sep}*.svg`)
const typesOutputPath = path.resolve(output, 'icons.d.ts')

const generate = () => {
  const filePaths = glob.sync(pattern)
  const fileNames = filePaths.map((filePath) => {
    const regex = new RegExp(`.+${originalInput}/`)
    return filePath.replace(regex, '').replace('.svg', '')
  })
  const content = `export type IconName = '${fileNames.join('\' | \'')}'\n`

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

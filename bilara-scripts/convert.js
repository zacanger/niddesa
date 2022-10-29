#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const bookPath = path.resolve(__dirname, '..', 'book')
const cndPath = path.resolve(bookPath, 'cnd')
const mndPath = path.resolve(bookPath, 'mnd')

const filesPer = (where) =>
  fs.readdirSync(where).map((p) => path.resolve(where, p))

const pathToKey = (fullPath) => {
  const parts = fullPath.split('/')
  const relevant = parts.slice(-2)
  const book = relevant[0]
  const chapter = parseInt(relevant[1].replace('.md', ''), 10)
  return `${book}${chapter}_translation-en-anger.json`
}

// TODO here is where things need to get converted to the right format
// need map each line correctly in the source
// then number the keys (see readme.txt in this directory
// also strip markdown formatting
// then stringify each line)
const chaptersPer = (files) =>
  files.reduce((p, c) => {
    const contents = fs.readFileSync(c, 'utf8')
    p[pathToKey(c)] = contents
    return p
  }, {})

const mndFiles = filesPer(mndPath)
const cndFiles = filesPer(cndPath)
const mndContents = chaptersPer(mndFiles)
const cndContents = chaptersPer(cndFiles)

const destDir = path.resolve(__dirname, 'data')
const mndDest = path.resolve(destDir, 'mnd')
const cndDest = path.resolve(destDir, 'cnd')
fs.rmSync(destDir, { recursive: true, force: true })
fs.mkdirSync(destDir)
fs.mkdirSync(mndDest)
fs.mkdirSync(cndDest)

const createFiles = (which, dir) => {
  Object.keys(which).forEach((k) => {
    fs.writeFileSync(path.resolve(dir, k), which[k])
  })
}

createFiles(mndContents, mndDest)
createFiles(cndContents, cndDest)

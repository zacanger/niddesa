#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const bookPath = path.resolve(__dirname, '..', 'book')
const cndPath = path.resolve(bookPath, 'cnd')
const mndPath = path.resolve(bookPath, 'mnd')

const filesPer = (where) =>
  fs.readdirSync(where).map((p) => path.resolve(where, p))

const pathToBookAndChapter = (fullPath) => {
  const parts = fullPath.split('/')
  const relevant = parts.slice(-2)
  return {
    book: relevant[0],
    chapter: parseInt(relevant[1].replace('.md', ''), 10)
  }
}

const pathToKey = (fullPath) => {
  const { book, chapter } = pathToBookAndChapter(fullPath)
  return `${book}${chapter}_translation-en-anger.json`
}

const contentsToJson = (textContent, pathInfo) => {
  let verseCounter = 0
  const { book, chapter } = pathToBookAndChapter(pathInfo)
  const verses = textContent.split('\n\n')

  return verses.reduce((prev, c) => {
    let curr = c.trim()
    let lineCounter = 1

    if (curr.startsWith('>')) {
      curr = curr.split('\n').map((x) => {
        const cleaned = curr.replace(/^>/, '').trim()
        return `<em>${cleaned}</em>`
      }).join('\n')
    }

    const lines = curr.split('\n')

    lines.forEach((l) => {
      if (l === '\\newpage' || l === '---' || l.trim() === '') {
        verseCounter--
        return
      }

      const key = `${book}${chapter}:${verseCounter}.${lineCounter}`
      const line = l
        .replace(/^#+/, '')
        .replace('&middot;', ':')
        .replace('  ', ' ')
        .trim()

      prev[key] = line
      lineCounter++
    })

    verseCounter++
    return prev
  }, {})
}

const chaptersPer = (files) =>
  files.reduce((p, c) => {
    const contents = fs.readFileSync(c, 'utf8')
    p[pathToKey(c)] = contentsToJson(contents, c)
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
    const destFile = path.resolve(dir, k)
    const destData = JSON.stringify(which[k], null, 2) + '\n'
    fs.writeFileSync(destFile, destData)
  })
}

createFiles(mndContents, mndDest)
createFiles(cndContents, cndDest)

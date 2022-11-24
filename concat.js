#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const betterMnd = 'better/mnd'
const betterCnd = 'better/cnd'
const backupMnd = 'backup/mnd'
const backupCnd = 'backup/cnd'

const range = (x, y) => x > y ? [] : [x, ...range(x + 1, y)]

const padChaps = (n) => String(n).padStart(2, '0')
const mndChaps = range(1, 16).map(padChaps)
const cndChaps = range(1, 23).map(padChaps)

const pluckTrans = ({ translation }) => translation
const getFilePath = (bookPath, chapterNumber) =>
  path.resolve(__dirname, `${bookPath}/${chapterNumber}.json`)

const resultDir = path.resolve(__dirname, 'smushed')
const versesFrom = (chapter) => chapter.map(pluckTrans)

const buildStrings = (chapterList, betterPath, backupPath) =>
  chapterList.reduce((prev, curr) => {
    const betterVersion = versesFrom(require(getFilePath(betterPath, curr)))
    const backupVersion = versesFrom(require(getFilePath(backupPath, curr)))

    let innerLines = ''
    betterVersion.forEach((line, idx) => {
      innerLines += line + '\n'
      const backupLine = backupVersion[idx]
      if (backupLine !== line) {
        innerLines += backupLine + '\n'
      }
      innerLines += '\n'
    })

    prev.push(innerLines)
    return prev
  }, [])

const builtMndSmushed = buildStrings(mndChaps, betterMnd, backupMnd)
const builtCndSmushed = buildStrings(cndChaps, betterCnd, backupCnd)

const writeResultsFor = (chapters, bookName) => {
  const bookDestDir = path.resolve(__dirname, resultDir, bookName)
  chapters.forEach((chap, idx) => {
    const chapterTitle = String(idx + 1).padStart(2, '0') + '.txt'
    fs.writeFileSync(`${bookDestDir}/${chapterTitle}`, chap)
  })
}

writeResultsFor(builtMndSmushed, 'mnd')
writeResultsFor(builtCndSmushed, 'cnd')

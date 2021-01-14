#!/usr/bin/env node

const translate = require('google-translate-api')
const fs = require('fs')
const path = require('path')
const dir = process.argv[2]

const files = fs.readdirSync(dir)
const contentsMap = files
  .map((file) => ({
    [file]: fs.readFileSync(path.resolve(dir, file), 'utf8')
  }))
  .reduce((prev, curr) => {
    const entries = Object.entries(curr)[0]
    const [ fileName, text ] = entries
    prev[fileName] = text
    return prev
  }, {})

const chunk = (str, n, acc = []) => {
  if (str.length === 0) {
    return acc
  } else {
    acc.push(str.substring(0, n))
    return chunk(str.substring(n), n, acc)
  }
}

const chunkedMap = Object.entries(contentsMap)
  .reduce((prev, curr) => {
    const [ fileName, text ] = curr
    prev[fileName] = chunk(text, 1000)
    return prev
  }, {})

const handleTranslationForChunk = async (text) => {
  try {
    const res = await translate(text, { to: 'en' })
    return res.text
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const main = async () => {
  const contents = []
  for (const k in chunkedMap) {
    if (chunkedMap.hasOwnProperty(k)) {
      for (const t of chunkedMap[k]) {
        const translated = await handleTranslationForChunk(t)
        contents.push(translated)
      }
    }
  }
  fs.writeFileSync(path.resolve(dir, k + 'google.md'), contents.join(''))
}

main()

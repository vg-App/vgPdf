var REPLACE_REGEX = /\r?\n|\r|\t/g
var SPACE = ' '

function normalizeText(text) {
  return String(text).replace(REPLACE_REGEX, SPACE)
}

function objectKey(object) {
  var parts = []
  for (var key in object) {
    parts.push(key + object[key])
  }

  return parts.sort().join('')
}

// Computes FNV-1 hash

function hashKey(str) {
  var hash = 0x811c9dc5

  for (var i = 0; i < str.length; ++i) {
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
    hash ^= str.charCodeAt(i)
  }

  return hash >>> 0
}

export { objectKey, hashKey, normalizeText }

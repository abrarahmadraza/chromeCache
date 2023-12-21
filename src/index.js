const CacheService = require("./cache.service")
const execCommand = require("./shell")

async function updateCache() {
  try {
    const cache = new CacheService()
    await cache.refresh()
    await execCommand('git add . && git commit -m "refresh cache"')
    await execCommand("git push -u origin main")
    console.log("cache pushed")
  } catch (error) {
    console.log(error)
  }
}

updateCache()

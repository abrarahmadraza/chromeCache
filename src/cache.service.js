const puppeteer = require("puppeteer")
const Navigate = require("./navigate")
const HEADLESS_STATUS = false

class CacheService {
  constructor() {
    this.instance = null
    this.path = "../chromeCache/"
    if (process.platform == "darwin") {
      this.path += "macCache"
    } else if (process.platform == "linux") {
      this.path += "linuxCache"
    } else {
      this.path += "osCache"
    }
  }
  get browserInstance() {
    return this.instance
  }
  async refresh() {
    try {
      this.instance = await puppeteer.launch({
        userDataDir: this.path,
        headless: HEADLESS_STATUS,
        ignoreHTTPSErrors: true,
        args: [
          "--window-size=1920,1080",
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--disable-gpu",
        ],
      })
      const page = await this.instance.newPage();
      await new Navigate().goToConsole(page);
      console.log('cache updated');
      await page.close()
      await this.instance.close();
      return
    } catch (error) {
      throw new Error("Error in chromium page creation", error)
    }
  }
}

module.exports = CacheService

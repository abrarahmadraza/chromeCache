const puppeteer = require("puppeteer")
const Navigate = require("./navigate")
const configs = require("./configs")
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
    let page = null
    try {
      this.instance = await puppeteer.launch({
        userDataDir: this.path,
        headless: configs.HEADLESS,
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
    } catch (error) {
      throw new Error("Error in chromium page creation", error)
    }
    finally
    {
      if(page){
        await page.close()
      }
      if(this.instance){
        await this.instance.close()
      }
    }
  }
}

module.exports = CacheService

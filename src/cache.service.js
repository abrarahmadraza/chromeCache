const puppeteer = require("puppeteer");
const Navigate = require("./navigate");
const { serviceConfig } = require("./configs");
const path = require("path");
class CacheService {
	constructor() {
		this.instance = null;
		if (process.platform == "darwin") {
			this.path = path.join(__dirname, "../macCache");
		} else if (process.platform == "linux") {
			this.path = path.join(__dirname, "../linuxCache");
		} else {
			this.path = path.join(__dirname, "../osCache");
		}
		console.log(this.path);
	}
	get browserInstance() {
		return this.instance;
	}
	async refresh() {
		let page = null;
		try {
			this.instance = await puppeteer.launch({
				userDataDir: this.path,
				headless: serviceConfig.HEADLESS,
				ignoreHTTPSErrors: true,
				args: [
					"--window-size=1920,1080",
					"--no-sandbox",
					"--disable-setuid-sandbox",
					"--disable-dev-shm-usage",
					"--disable-accelerated-2d-canvas",
					"--disable-gpu",
				],
			});
			const page = await this.instance.newPage();
			// await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3");
			const cookies = await page.cookies();
			console.log('Cookies post-login:', cookies);

			await new Navigate().goToConsole(page);
			console.log("cache updated");
		} catch (error) {
			console.log("Error in chromium page creation", error);
			throw new Error("Error in chromium page creation", error);
		} finally {
			//if (page) {
			//	await page.close();
			//}
			//if (this.instance) {
			//	await this.instance.close();
			//}
		}
	}
}

module.exports = CacheService;

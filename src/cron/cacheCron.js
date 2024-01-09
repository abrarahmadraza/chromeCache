// write a cron which run every 5 minutes and runs index.js
const { CronJob } = require("cron");
const CacheService = require("../cache.service");
const execCommand = require("../shell");
const TAG = "CACHE_CRON";
const cacheCron = new CronJob(
	"*/1 * * * *",
	() => startCron(),
	null,
	true,
	"Asia/Calcutta"
);

const startCron = async () => {
	try {
		console.log(TAG, "START", new Date());
		const cache = new CacheService();
		await cache.refresh();
		if (!process.env.IS_NATIVE_SERVICE) {
			await execCommand('git add . && git commit -m "refresh cache"');
			await execCommand("git push -u origin main");
		}
		console.log(TAG, "END", new Date());
	} catch (error) {
		console.log(error);
	}
};

module.exports = { cacheCron };

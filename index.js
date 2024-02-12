const CacheService = require("./src/cache.service");
const { serviceConfig } = require("./src/configs");

async function updateCache() {
	try {
		console.log("Service running");
		if (serviceConfig.RUNCRON) {
			require("./src/cron/index");
		} else {
			console.log("Cron is not running");
		}
	} catch (error) {
		console.log(error);
	}
	finally{
		const cache = new CacheService();
		await cache.refresh();
	}
}

updateCache();

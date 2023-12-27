const { serviceConfig } = require("./src/configs");

async function updateCache() {
  try {
    console.log("Service running")
    if (serviceConfig.RUNCRON){
      require('./src/cron/index')
    }
    else{
      console.log("Cron is not running")
    }
  } catch (error) {
    console.log(error)
  }
}

updateCache()

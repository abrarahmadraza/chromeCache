function execCommand(command) {
  const exec = require("child_process").exec
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error)
      resolve(stdout || stderr)
    })
  })
}

module.exports = execCommand

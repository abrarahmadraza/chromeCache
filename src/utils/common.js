const axios = require("axios");

exports.gmailWebhook = async (url, data) => {
	try {
		var config = {
			method: "post",
			url: url,
			data: data,
		};
		return await axios(config)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				throw new Error(err);
			});
	} catch (err) {
		console.error(err, JSON.stringify(data));
		throw new Error(
			`error in sending payload to googleapis' ${err} \n${JSON.stringify(
				data
			)}`
		);
	}
};

const axios = require('axios');
// const fs = require('fs');

const createTask = async (base64Data) => {
    const url = 'https://api.capmonster.cloud/createTask';
    const response = await axios.post(url, {
        clientKey: 'ebfd2b68c0aeaf4c0c6c94cc7325a6e2__google',
        task: {
            type: 'ImageToTextTask',
            body: base64Data,
        },
    });
    return response.data;
}

const getTaskResult = async (taskId) => {
    const url = 'https://api.capmonster.cloud/getTaskResult';
    const response = await axios.post(url, {
        clientKey: 'ebfd2b68c0aeaf4c0c6c94cc7325a6e2',
        taskId,
    });
    return response.data;
}


const solveCaptcha = async (url) => {
    try {
        const response = await axios({
            url,
            responseType: 'arraybuffer',
        });

        // const data = fs.readFileSync(localPath);

        const base64Data = Buffer.from(response.data, 'binary').toString('base64');

        const task = await createTask(base64Data);

        let taskResult = await getTaskResult(task.taskId);

        while (taskResult.status === 'processing') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            taskResult = await getTaskResult(task.taskId);
        }

        if (taskResult.status === 'ready') {
            console.log('CAPTCHA solved successfully', taskResult.solution.text);
            return taskResult.solution.text;
        }
        else {
            throw new Error('Failed to solve CAPTCHA');
        }
    }
    catch (e) {
        throw e
    }
}

exports.solveCaptcha = solveCaptcha;

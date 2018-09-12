const url = require('url');
const util = require('util');
const request = require('request');
const loadConfig = require('./config');

const requestp = util.promisify(request);
const config = loadConfig();

(async () => {
    try {
        const env = process.env;
        const args = process.argv.slice(2);

        const regex = /^http\:\/\/127.0.0.1:32400\/video\/:\/transcode\/session\/(.*)\/progress$/;
        const sessionId = args.find(a => regex.test(a)).match(regex)[1];
        const properSessionId = sessionId.split('/')[0];

        console.log(`Session found: ${sessionId} (${properSessionId})`);

        const parsedArgs = args.map(o => o.replace(config.plex.url, '{PROGRESSURL}/')
            .replace(config.plex.url, '{URL}/')
            .replace(config.plex.sessions, '{SRTSRV}/')
            .replace(config.plex.usr, '{USRPLEX}/')
            .replace(config.plex.mount, '{PATH}/'));

        const segList = `{SEGURL}/video/:/transcode/session/${sessionId}/seglist`;
        const finalArgs = [];
        let forceSegList = false;
        
        for (let i = 0; i < parsedArgs.length; i++) {
            if (parsedArgs[i] === '-segment_list') {
                forceSegList = true;
                finalArgs.push(parsedArgs[i]);
            }
            else if (forceSegList) {
                finalArgs.push(segList);
                if (parsedArgs[i + 1] !== '-segment_list_type') {
                    finalArgs.push('-segment_list_type');
                    finalArgs.push('csv');
                    finalArgs.push('-segment_list_size');
                    finalArgs.push('2147483647');
                }
                forceSegList = false;
            }
            else {
                finalArgs.push(parsedArgs[i]);
            }
        }

        await requestp({
            uri: url.resolve(config.plex.url, `/rhino/new/${properSessionId}`),
            method: 'POST',
            json: {
                args: finalArgs,
                env
            }
        });
    }
    catch (e) {
        console.error(e);
        console.error(e.stack);
        process.exit(1);
    }
})();

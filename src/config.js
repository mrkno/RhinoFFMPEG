const fs = require('fs');
const path = require('path');

module.exports = () => {
    try {
        let directory;
        const exe = process.execPath;
        if (!exe.endsWith('node.exe') && !exe.endsWith('node')) {
            directory = path.dirname(process.execPath);
        }
        else {
            directory = process.cwd();
        }

        const data = fs.readFileSync(path.join(directory, 'config.json'), 'utf8');
        return JSON.parse(data.replace(/^\uFEFF/, ''));
    }
    catch(e) {
        console.error('Configuration file missing');
        process.exit(2);
    }
};

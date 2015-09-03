import fs from 'fs';

class mock {
    constructor() {
        console.log('mock init');
    }

    get(res) {
        console.log('mock get');
        var buf;
        buf = fs.readFileSync('./mock_desc.txt', {
            encoding: 'utf8'
        });
        console.log(buf);
        res.json(JSON.parse(buf));
        //

        var e = {};
        e.test = true;

    }
}

export default new mock();

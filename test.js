'use strict';

const assert = require('assert');
const PS = require('./index.js');
let ps;

try {
    const map = new Map();
    map.set('43680', {
        vlr: '43680',
        code: 'MOBILCOM_AUT',
        name: 'Австрия, Моб, Mobilkom',
        code2: 'MTS_IN_MNR'
    });

    map.set('4368', {
        vlr: '4368',
        code: 'MOBILCOM_AUT0',
        name: 'Австрия',
        code2: 'MTS_IN_MNR0'
    });

    ps = new PS({map: map});

    // Found
    let res = ps.find('4368012354');

    assert.equal(res.vlr, 43680);
    assert.equal(res.code, 'MOBILCOM_AUT');
    assert.equal(res.name, 'Австрия, Моб, Mobilkom');
    assert.equal(res.code2, 'MTS_IN_MNR');

    // Not found
    res = ps.find('0000');

    assert.equal(res, null);

    console.log('ok')
    process.exit(0)
} catch (e) {
    console.error(e)
    process.exit(1)
}

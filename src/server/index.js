import snmp from 'snmp-native';

//var snmp=require('snmp-native');
import conv from './conv';

import http from 'http';
import util from 'util';
import url from 'url';

import express from 'express';


import logger from 'simple-node-logger';


var app = express();
app.use(express.static('public'));
app.use(express.static('lib'));

console.log(conv.getOID('1.3.6.1.2.1.31.1.1.1.1'));

var log = logger.createSimpleLogger('../project.log');


//var session = new snmp.Session({host:host,community:community});

var oid = [1, 3, 6, 1, 2, 1, 1, 1, 0];

//conv.open('1.3.6.1.2.1.1.1.0');
//conv.open('1.3.6.1.2.1.2.2.1.8');

//conv.open('1.3.6.1.2.1.31.1.1.1.18'); // port description

//conv.getMulti('1.3.6.1.2.1.31.1.1.1.17'); // port up / down (1=up, 2=down)

//conv.getSingle('1.3.6.1.2.1.31.1.1.1.17.71');
//conv.getSingle('1.3.6.1.2.1.31.1.1.1.18.71');

import OID from './OID';
import mock from './mock';

console.log(OID);

console.log(OID['desc'].value);


app.get('/', function(req, res) {
    log.info(req);
});

app.get('*/help', function(req, res) {
    console.log('help');
    res.writeHead(200, {
        'Content-Type': 'text'
    });
    res.end('Help /get?ip=192.168.1.254&show=[desc int device]');
});

app.get('*/get', function(req, res) {

    mock.get(res);

    log.info('get received');
    console.log('get');
    var st = url.parse(req.url, true).query;
    console.log('get:', st.ip);
    conv.setHost(st.ip);

    var id = OID[st.show];
    if (id) {
        if (id.multi) {
            conv.getMulti(id.value, function(e) {
                //res.writeHead(200, {'Content-Type': 'application/json'});
                //res.end(JSON.stringify(e));
                res.json(e);

            }); // port up / down (1=up, 2=down)
        } else {
            conv.getSingle(id.value, function(e) {
                //res.writeHead(200,{'Content-Type':'application/json'});
                res.json(e);
            });
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text'
        });
        res.end('Unknown show');
    }
});

var port = process.env.PORT || 1337;
app.listen(port);
console.log('Express started on port ', port);
log.info('Express started on port ', port);

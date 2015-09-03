import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import fetch from 'whatwg-fetch';

const options = {};

const model = Model({
    title: 'test',
    isLoading: false,
    snmpdata: null,
    items1: [{
        id: '10.65.6.1',
        text: 'C3560-p-hlth'
    }, {
        id: '10.65.101.233',
        text: 'Item2'
    },
    {id:'10.65.101.234',text:'Item3'},
    {id:'10.65.101.235',text:'Item4'}
]
});

const services = {
    fetch: window.fetch
};

const defaultInput = {};

export default Controller(model, services, defaultInput);

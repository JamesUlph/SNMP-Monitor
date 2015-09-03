import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import fetch from 'whatwg-fetch';

const options = {};

const model = Model({
    title: 'test',
    isLoading: false,
    snmpdata: null,
    items1: [{
        id: 0,
        text: 'Item1'
    }, {
        id: 1,
        text: 'Item2'
    },{id:2,text:'Item3'}]
});

const services = {
    fetch: window.fetch
};

const defaultInput = {};

export default Controller(model, services, defaultInput);

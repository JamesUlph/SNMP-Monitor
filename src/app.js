import React from 'react';
import fetch from 'whatwg-fetch';

import controller from './controller.js';
import {Container} from 'cerebral-react';
import {Decorator as Cerebral} from 'cerebral-react';

import setTitle from './actions/setTitle';
import setLoading from './actions/setLoading';
import clearLoading from './actions/clearLoading';
import getData from './actions/getData';
import setOutput from './actions/setOutput';

controller.signal('setTitle',setLoading,setTitle,clearLoading);
controller.signal('getData',setLoading,[getData],setOutput,clearLoading);

@Cerebral({
  title:['title'],
  isLoading:['isLoading'],
  snmpdata:['snmpdata'],
  items1:['items1']
})
class App extends React.Component {
    constructor(props){
        super(props);




    }

    handleClick(e){

e.preventDefault();
      this.props.signals.getData({o:'fred'});
/*
      window.fetch('api/get?ip=10.65.6.1&show=desc').then(function(response){
        return response.text()
      }).then(function(s){
        console.log(s);

      });
*/
      //this.props.signals.setTitle();
    }

    handleClick2(){
      window.fetch('api/get?ip=10.65.6.1&show=device').then(function(response){
        return response.text()
      }).then(function(s){
        console.log(s);

      });
    }

    handleChange(e){
            console.log(e.target.value);
    }

    render(){

        let f=this.props.isLoading ? <div>Loading...</div> : null;

        let f2=this.props.snmpdata ? this.props.snmpdata.map((e,i)=>{return <tr key={i}><td>{e.type}</td><td>{e.value}</td><td>{e.receiveStamp}</td></tr>}) : null;
        let s=this.props.items1 ? this.props.items1.map((e,i)=>{return <option  key={e.id} value={e.id}>{e.text}</option>}):null;

        return <div>
        {f}
<select defaultValue={1} onChange={this.handleChange}>
{s}
</select>

        {this.props.title}

        <h2>SNMP reader</h2>

        <button type="button" onClick={this.handleClick.bind(this)}>Get data</button>
        <button type="button" onClick={this.handleClick2.bind(this)}>Get name</button>
<table>
<tbody>
{f2}
</tbody>
</table>
        </div>
    }
}

React.render(<Container controller={controller} app={App}/>, document.body);

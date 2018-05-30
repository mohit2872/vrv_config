//client/components/App.js
import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import 'whatwg-fetch';

var querystring = require('querystring');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        data: [],
        messageFromServer: '',
        componentSelected: '',
        componentData: {}
    }
    
    this.onClickSelectComponent = this.onClickSelectComponent.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.getAllComponents = this.getAllComponents.bind(this);
    this.deleteComponent = this.deleteComponent.bind(this);
    this.cleanObject = this.cleanObject.bind(this);
  }

  componentWillMount(){
    // will receive first element as default component
    
  }

  componentDidMount() {
    this.getAllComponents(this);
  }

  cleanObject(obj1){
    const obj = Object.assign({}, obj1);
    delete obj.__v;
    delete obj._id;
    delete obj.name;
    return obj;
  }

  getDataComponent(data){
    data.map(component => {
      if(component.name === this.state.componentSelected){
        var temp = this.cleanObject(component);
        this.setState({componentData: temp})
      }
    })
  }

  addComponent(e){
    var componentName = document.getElementById("component-name").value; 
    console.log("Component added: " + componentName)
    axios.post('/addComponent',{componentName: componentName}).then(function(response) {
        console.log("Response Data: " + response.data)
      }).then(this.getAllComponents(this))
  }

  deleteComponent(e){
    axios.post('/deleteComponent', {componentName: this.state.componentSelected})
      .then(response => {
        console.log("Response Data from delete request: " + response.data)
    }).then(this.getAllComponents(this));
  }

  getAllComponents(e){
    axios.get('/getAll')
      .then(response => {
        this.setState({data: response.data, componentSelected: response.data[0].name});
        this.getDataComponent(response.data);
      });
  }

  onClickSelectComponent(e){
    var sel = document.getElementById("componentSelection");
    var componentName = sel.options[sel.selectedIndex].text;
    this.setState({componentSelected: componentName});
  }

  render() {
    return(
      <div>
      <select id="componentSelection" onChange={this.onClickSelectComponent}>
        {this.state.data.map((component, i) => {
          return <option value={component.name}>{component.name}</option>
        })}
        
      </select>

      <br/><br/>
      {/* based on component selected display the table */}
      <table border="1">
        <thead>
          <tr>
            <th>{this.state.componentSelected}</th>
          </tr>
        </thead>
        
        <tbody>
          {Object.keys(this.state.componentData).map(key => {
            return (
              <tr>
                <td>{key}</td>
                <td>
                  <table border="1">
                    <tbody>
                      {Object.keys(this.state.componentData[key]).map(subKey => {
                        return (
                          <tr>
                            <td>{subKey}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            )
          })}
        </tbody>

      </table>
      <br/><br/>

      <button onClick={this.deleteComponent}>Delete Component</button>

      <br/><br/>
      <input type="text" id="component-name"/>
      <button onClick={this.addComponent}>Add Component</button>
      </div>
    );
  }
}
export default App;
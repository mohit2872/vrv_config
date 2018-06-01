//client/components/App.js
import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import TreeView from 'react-treeview'

var querystring = require('querystring');

class TreeStructure extends Component {
  constructor(props) {
    super(props);
    this.state = {
        componentData: {},
        treeData: [
         
        ], 
    }
    this.cleanObject = this.cleanObject.bind(this);
  }

  componentDidMount() {
    this.setState({
      componentData: this.props.componentData
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      componentData: nextProps.componentData
    })
  }

  cleanObject(obj1){
    const obj = Object.assign({}, obj1);
    delete obj.__v;
    delete obj._id;
    delete obj.name;
    return obj;
  }

  render() {
    return(
        <div>
          {Object.keys(this.state.componentData).map((key, i) => {
            return (
              <TreeView 
                key={i}
                nodeLabel={key}
                defaultCollapsed={true}
              > <button>Add Row</button>
                {Object.keys(this.state.componentData[key]).map((subKey, j) => {
                  return (
                    <TreeView
                      key={j}
                      nodeLabel={subKey}
                      defaultCollapsed={true}
                    > <button>Add Row</button>
                      {this.state.componentData[key][subKey].map((superSubComponent, k) => {
                        <div>{superSubComponent = this.cleanObject(superSubComponent)}</div>
                        return(
                          <TreeView
                            key={k}
                            nodeLabel={k}
                            defaultCollapsed={true}
                          > <button>Add Element</button>
                            {Object.keys(superSubComponent).map((values, l) => {
                              return (
                                <div key={l}>{values}: {superSubComponent[values]}<button>Edit</button><button>Delete</button></div>
                              )
                            })}
                          </TreeView>
                        )
                      })}
                    </TreeView>
                  )
                })}
              </TreeView>
            )
          })}
        </div>
    );
  }
}
export default TreeStructure;
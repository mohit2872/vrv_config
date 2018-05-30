import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            system: {},
            protocol: {},
            interfaces: {},
            messageFromServer: '',
            componentSelected: ''
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewExpense = this.insertNewExpense.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    componentDidMount() {
        this.setState({
            month: this.props.selectedMonth
        });
        this.setState({
            year: this.props.selectedYear
        });
    }

    handleSelectChange(e) {
        if (e.target.name == 'month') {
            this.setState({
            month: e.target.value
            });
        }
        if (e.target.name == 'year') {
            this.setState({
            year: e.target.value
            });
        }
    }

    onClick(e) {
        this.insertNewExpense(this);
    }
    
    insertNewExpense(e) {
        axios.post('/insert',
            querystring.stringify({
            desc: e.state.description,
            amount: e.state.amount,
            month: e.state.month,
            year: e.state.year
            }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(function(response) {
            e.setState({
            messageFromServer: response.data
            });
        });
    }

    onClickSelectComponent(e){

    }

    render() {
        <form>
            <select>
                {/*All the components will be rendered either from db as documents or from a single document*/}
            </select>
            <button onClick={this.onClickSelectComponent}>Select Component</button>
        </form>

        if(this.state.messageFromServer == ''){
            return (
                <div>
            
                </div>
            )
        }
        else{
            return (
            <div>
            
            </div>
            )
        }
    }
}
export default Add;
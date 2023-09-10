import React, { Component } from 'react'
import axios from 'axios';
import { CUSTOMERS } from '../endoint/Endpoint';
import { useNavigate } from 'react-router-dom';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          birth: '',
          id_user : 0
        };
      }
      componentDidMount() {
        this.getDetail();
      }
    
      getDetail = () => {
        // ambil data id di url
        const pathname = window.location.pathname;
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        axios.get(CUSTOMERS + "/" + id).then((res) => {
            console.log(res.data.data);
          this.setState({
            name: res.data.data.name,
            email: res.data.data.email,
            birth: res.data.data.birth,
            id_user: res.data.data.id
          });
        });
      };
    
      // handle input
      handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
          [name]: value,
        });
      }
    // edit customer
    editCustomer = () => {
        const {id_user} = this.state;
        const parameter = {
          name: this.state.name,
          email: this.state.email,
          birth: this.state.birth,
        };
    
        axios.put(CUSTOMERS + '/' + id_user, parameter).then((res) => {
          window.location.replace('/')
        });
      };
  render() {
    const {name, email, birth} = this.state;
    return (
      <>
      <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => this.handleInputChange(e)}
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => this.handleInputChange(e)}
        />
        <input
          type="date"
          name="birth"
          value={birth}
          onChange={(e) => this.handleInputChange(e)}
        />
        <input
          type="submit"
          value="Edit"
          onClick={(e) => this.editCustomer()}
        />
      </>
    )
  }
}

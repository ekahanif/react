import React, { Component } from "react";
import { CUSTOMERS } from "../endoint/Endpoint";
import axios from "axios";
export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      name: "",
      email: "",
      birth: "",
    };
  }
  componentDidMount() {
    this.getCustomers();
  }

  // handle input
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  // add customer
  addCustomer = () => {
    const parameter = {
      name: this.state.name,
      email: this.state.email,
      birth: this.state.birth,
    };

    axios.post(CUSTOMERS, parameter).then((res) => {
      this.getCustomers();
      this.setState({
        name: "",
        email: "",
        birth: "",
      });
    });
  };

  // get user
  getCustomers = () => {
    axios.get(CUSTOMERS).then((res) => {
      this.setState({
        customers: res.data.data.data,
      });
    });
  };

  // delete user
  hapus(id) {
    axios.delete(`${CUSTOMERS}/${id}`).then((res) => {
      console.log(res);
      this.getCustomers();
    });
  }

  render() {
    const { customers } = this.state;

    return (
      <div>
        <input
          type="text"
          name="name"
          placeholder="nama"
          onChange={(e) => this.handleInputChange(e)}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(e) => this.handleInputChange(e)}
        />
        <input
          type="date"
          name="birth"
          placeholder="birth"
          onChange={(e) => this.handleInputChange(e)}
        />
        <input
          type="submit"
          value="Tambah"
          onClick={(e) => this.addCustomer()}
        />

        <table>
          <thead>
            <tr>
              <td>Nama</td>
              <td>Email</td>
              <td>Tanggal Lahir</td>
              <td>Aksi</td>
            </tr>
          </thead>
          <tbody>
            {customers.map((val, key) => (
              <tr value={val.id} key={key}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.birth}</td>
                <td>
                  <a href={"/detail/" + val.id}>Detail</a>
                  <button onClick={(e) => this.hapus(val.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

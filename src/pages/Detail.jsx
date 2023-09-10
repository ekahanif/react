import axios from "axios";
import React, { Component } from "react";
import { CUSTOMERS } from "../endoint/Endpoint";
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      birth: '',
      id_user: ''
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
      this.setState({
        name: res.data.data.name,
        email: res.data.data.email,
        birth: res.data.data.birth,
        id_user: res.data.data.id
      });
    });
  };


  render() {
    const { name, email, birth, id_user} = this.state;

    return (
        <>
        <h1>{name}</h1>
        <h1>{email}</h1>
        <h1>{birth}</h1>
        <a href={"/edit/" + id_user}>Edit Data</a>

        </>
    );
  }
}

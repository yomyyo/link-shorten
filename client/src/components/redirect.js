import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter } from 'react-router';

class Redirect extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

 
    this.state = {
      original: "",
      url: "",
    };
  }
  // This will get the record based on the url from the database.
  componentDidMount() {
    axios
      .get("http://localhost:3001/" + this.props.match.params.url)
      .then((response) => {
        window.location.replace(response.data.original);
        this.setState({
          original: response.data.original,
          url: response.data.url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 

 
  // this page will show when users go to their url. if the url is invalid, there is a warning
  render() {
    return (
      <div>
        <h1>Redirecting</h1>
        <p>If you are on this page for more than 10 seconds, the shortened link may be broken</p>
      </div>
    );
  }
}
 
 
export default withRouter(Redirect);

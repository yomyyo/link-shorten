import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import "./create.css";

export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeOriginal = this.onChangeOriginal.bind(this);
    this.onChangeurl = this.onChangeurl.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

 
    this.state = {
      original: "",
      url: "",
      submitted: false,
      savedUrl: ""
    };
  }

  
 
  // These methods will update the state properties.
  onChangeOriginal(e) {
    this.setState({
      original: e.target.value,
    });
  }
 
  onChangeurl(e) {
    this.setState({
      url: e.target.value,
    });
  }

  onClick(e) {
    e.preventDefault();
    const allowedVals = "abcdefghijklmnopqrstuvwxya1234567890".split("");
    let newLink = "";
    for(let i = 0; i < 5; i++){
      newLink+=allowedVals[Math.floor(Math.random() * allowedVals.length)];
    }
    this.setState({
      url: newLink
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    //check if any of thhe fields are empty
    if(this.state.url === "" || this.state.original === ""){
    this.setState({
      submitted: "empty"
    })
    }
    // When post request is sent to the create url, axios will add a new link to the database.
    const url = {
      original: this.state.original,
      url: this.state.url,
    };

    // Validate the  users data
    if(this.state.submitted !== "invalid" && this.state.submitted !== "empty"){
      axios
        .get("http://localhost:3001/"+this.state.url)
        .then((res) => {
          if(res.data == null && this.state.url !== "create"){
            axios
              .post("http://localhost:3001/add", url)
              .then((res) => console.log(res.data));

              // We will empty the state after posting the data to the database
            this.setState({
              original: "",
              url: "",
              submitted: true,
              savedUrl: url.url
              });
          } else {
            // If there is already a url in the database that is the same as the one the user set
            this.setState({
              submitted: "wrong"
            })
          }
        });
    }
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3 className="form-group">Create New Link</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Original Link </label>
            <input
              type="text"
              className="form-control"
              value={this.state.original}
              onChange={this.onChangeOriginal}
            />
          </div>
          
          <div className="form-group">
            <label >Custom Link address: </label>
              <div  className="same-line">
              
                <div className="cell"><p>localhost:3000/ </p></div>
                <div className="cell">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.url}
                  onChange={this.onChangeurl}
                />
                </div>
              
              </div> 
            <button className="btn btn-secondary" onClick={this.onClick}>Generate Random Link</button>
          </div>
          
          <div className="form-group">
          
            <input
              type="submit"
              value="Create link"
              className="btn btn-primary"
            />
          </div>
          <div id="generatedLink">
            {this.state.submitted === true && <p className="success-msg">Your new link is at <a href={"http://localhost:3000/" + this.state.savedUrl}>http://localhost:3000/{this.state.savedUrl}</a></p>}
            {this.state.submitted === "wrong" && <p className="error-msg">Your new link is not unique. Please try again.</p>}
            {this.state.submitted === "invalid" && <p className="error-msg">Your new link is contains invalid characters. Please try again.</p>}
            {this.state.submitted === "empty" && <p className="error-msg">Cannot submit with empty values. Please try again.</p>}
          </div>
        </form>

      </div>
    );
  }
}
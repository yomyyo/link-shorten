import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
 
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
    
    const invalidChars = "!@#$%^&*()_{}|:\"[];'<>?,./-=+`~'".split("");
    for(let i = 0; i < invalidChars.length; i++){
      if(this.state.url.includes(invalidChars[i])){
        this.setState({
          submitted: "invalid"
        })
      }
    }
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const url = {
      original: this.state.original,
      url: this.state.url,
    };
    if(this.state.submitted !== "invalid"){
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
        <h3>Create New Link</h3>
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
            <label>Custom Link address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.url}
              onChange={this.onChangeurl}
            />
            <button onClick={this.onClick}>Generate Random Link</button>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create link"
              className="btn btn-primary"
            />
          </div>
          <div id="generatedLink">
            {this.state.submitted === true && <p>Your new link is at <a href={"http://localhost:3000/" + this.state.savedUrl}>http://localhost:3000/{this.state.savedUrl}</a></p>}
            {this.state.submitted === "wrong" && <p>Your new link is not unique. Please try again.</p>}
            {this.state.submitted === "invalid" && <p>Your new link is contains invalid characters. Please try again.</p>}
          </div>
        </form>
      </div>
    );
  }
}
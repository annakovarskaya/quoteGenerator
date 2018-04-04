import React, { Component } from "react";
import "./App.css";


class AddQuoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      responseMessage: ""
    };
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, content} = this.state;

    fetch("/api/add_quote", {
      method: "POST",
      body: JSON.stringify({ title, content} ),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({
          title: "",
          content: "",
          responseMessage: "Quote was added successfully"
        });
        setTimeout(() => {
          this.setState({responseMessage:""})
        }, 2000);
        return response;
      } else {
       console.log("Something happened wrong");
      }
    }).catch(err => err);
  }

  render() {
    const { title, content, responseMessage} = this.state;
    return (
      <div>
        <span className="little_title">Add new quote</span>
        <form onSubmit={this.onSubmit} id="form" className="topBefore">
          <input type="text" name="title" value={title} onChange={this.onChange} placeholder="Author"/>
          <textarea type="text" name="content" value={content} onChange={this.onChange} placeholder="Text"/>
          <button type="submit" className="button">Send</button>
          <span className="little_title">{responseMessage}</span>
        </form>
      </div>
    );
  }
}

export default AddQuoteForm;

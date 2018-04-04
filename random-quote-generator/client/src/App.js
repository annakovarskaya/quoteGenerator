import React, { Component } from "react";
import "./App.css";
import QuoteGenerator from "./QuoteGenerator";
import AddQuoteForm from "./AddQuoteForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <span className="title">Random Inspirational Quote Generator</span>
        <QuoteGenerator />
        <AddQuoteForm />
      </div>
    );
  }
}

export default App;

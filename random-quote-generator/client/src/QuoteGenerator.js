import React, { Component, Fragment } from "react";
import "./App.css";

class QuoteGenerator extends Component {

  state = {
    quote: {
      content: "",
      title: ""
    },
    quoteArrived: false
  }

  constructor() {
    super();
    this.externalQuotesUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    this.dataBaseQuotesDUrl = "/api/quotes";
  }

  render() {
    const { quote } = this.state;
    return(
      <Fragment>
        {this.renderQuote()}<hr />
      </Fragment>
    )
  }

  renderQuote = () => {
    const { quote, quoteArrived } = this.state;
    return(
      <div>
        <div className="blog-card spring-fever">
          <div className="title-content">
            <h3><a href="#">{quote.title}</a></h3>
            <div className="intro"><a href="#">{this.strip(JSON.stringify(quote.content))}</a></div>
          </div>
        </div>
        <button onClick={this.generateRandomQuote} className="button">Get new quote</button>
      </div>
    )
  }

  strip = (html) => {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText;
  }

  generateRandomQuote = event => {
    let externalOrDatabase = Math.floor(Math.random() * Math.floor(2));
    let url = externalOrDatabase ? this.dataBaseQuotesDUrl : this.externalQuotesUrl + "&_="+Math.round(Math.random()*100000000000000);
    fetch(url)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const quoteData = data[0];
      if (quoteData.content && quoteData.title){
        let { quote } = this.state;
        quote.content = quoteData.content;
        quote.title = quoteData.title;
        this.setState({ quote }, () => {
          if (!this.state.quoteArrived) {
            this.setState({quoteArrived: true});
          }
        })
      }
    });
  }
}

export default QuoteGenerator;

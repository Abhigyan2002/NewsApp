import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'


export class News extends Component {
  articles = [];
  static defaultProps={
    country: 'us',
    pageSize: 9,
    category: 'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
      date: 0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - Newzz`
  }

  fetchNews = async (page) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=17a2acf84a544769988b85b9a0ca4cf6&pageSize=9&page=${this.state.page}&category=${this.props.category}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    // Filter out articles that don't have a valid title
    const validArticles = parsedData.articles.filter(
      (article) => article.title && article.title !== "[Removed]"
    );

    // Set the state with the filtered articles
    this.setState({
      page: page,
      articles: validArticles,
      totalResults: parsedData.totalResults,
      
    });
  };

  handleNextClick = async () => {
    const nextPage = this.state.page + 1;
    await this.fetchNews(nextPage);
  };

  handlePrevClick = async () => {
    const prevPage = this.state.page - 1;
    await this.fetchNews(prevPage);
  };

  componentDidMount() {
    this.fetchNews(1); // Fetch the first page of news when the component mounts
  }

  capitalizeFirstLetter=(s)=>{
    return s.charAt(0).toUpperCase()+s.slice(1);
    
  }

  render() {
    return (
      <div className="container my-3">
        <h2 style={{
          textAlign:'center'
        }}>{`Top ${this.capitalizeFirstLetter(this.props.category)} headlines`} </h2>

        <div className="row">
          {this.state.articles.length > 0 ? (
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45).trim() + "..." : "No Title Available"}
                    description={element.description ? element.description.slice(0, 88).trim() + "..." : "No Description Available"}
                    imageurl={
                      element.urlToImage ||
                      "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"
                    }
                    newsurl={element.url} 
                    date={new Date(element.publishedAt).toUTCString()}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })
          ) : (
            <p>No articles available.</p>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page >= Math.ceil(this.state.totalResults / 9)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

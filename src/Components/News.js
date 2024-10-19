import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export class News extends Component {
  articles = [];
  apiKey = process.env.REACT_APP_API_KEY;
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
      date: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - Newzz`;
  }

  fetchNews = async (page) => {
    this.props.spinnerState(true);
    this.props.setProgress(0);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.apiKey}&pageSize=9&page=${page}&category=${this.props.category}`;
    let data = await fetch(url);
    this.props.setProgress(20);
    let parsedData = await data.json();
    this.props.setProgress(50);

    // Filter out articles that don't have a valid title
    const validArticles = parsedData.articles.filter(
        (article) => article.title && article.title !== "[Removed]"
    );

    this.props.setProgress(80);

    // Create a Set to track unique article URLs
    const uniqueArticles = new Set(this.state.articles.map(article => article.url));

    // Filter valid articles to include only those not already in the state
    const newArticles = validArticles.filter(article => !uniqueArticles.has(article.url));

    // Set the state with the new unique articles
    this.setState((prevState) => ({
        page: page,
        articles: [...prevState.articles, ...newArticles],
        totalResults: parsedData.totalResults,
    }));

    this.props.setProgress(100);
    this.props.spinnerState(false);
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

  capitalizeFirstLetter = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  fetchData = () => {
    
    this.fetchNews(this.state.page+1);
  };

  render() {
    return (
      <>
        <h2
          style={{
            textAlign: "center",
            marginTop: "90px",
          }}
        >
          {`Top ${this.capitalizeFirstLetter(this.props.category)} headlines`}
        </h2>

        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.length > 0 ? (
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={
                          element.title
                            ? element.title.slice(0, 45).trim() + "..."
                            : "No Title Available"
                        }
                        description={
                          element.description
                            ? element.description.slice(0, 88).trim() + "..."
                            : "No Description Available"
                        }
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
            </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;

import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source} = this.props;
    return (
      <div className="mx-3 my-3">
        <div className="card">
          <img
            src={
              imageurl
                ? imageurl
                : "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown author"} on {date}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more...
            </a>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{
              zIndex:'1',
              left:'50%'
              }}>
              {source?source:'unknown'}
              
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title, description, imageUrl, newsUrl, date, author, source} = this.props;
    return (
      <div>
        <div className="card">
            <div style={{display: 'flex',justifyContent: 'flex-end',position: 'absolute',right: 0}}>
              <span className="badge rounded-pill bg-danger" >
                  {source}
              </span>
            </div>
            <img src={imageUrl} className="card-img-top" alt=""/>
            <div className="card-body">
                <h5 className="card-title">{title? title.slice(0,40): ""}..</h5>
                <p className="card-text">{description? description.slice(0,88): ""}...</p>
                <p className="card-text"><small className="text-body-secondary">By {author? author: "Unknown"} Published on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noopener noreferrer"className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem

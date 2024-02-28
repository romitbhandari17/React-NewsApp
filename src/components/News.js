import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: 'us',
        category: 'general',
        pageSize: 10
    }
      
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

   constructor(props){  
        super(props);
        console.log("I am News Constructor!!")

        this.state = {
            articles : [],
            page:1,
            loading: true,
            totalResults:0
        }

        document.title = 'NewsBites-'+this.capitalizeFirstLetter(this.props.category);
   }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // withLocation(Component) {
  //   return props => <Component {...props} location={useLocation()} />;
  // }

   async componentDidUpdate(prevProps) {
    console.log("inside componentDidUpdate")
    if (this.props.category !== prevProps.category) {
      console.log("previous category unequal")
      await this.setState({page:1})
      this.updateNews();
    }

    // Additionally, if you are tracking URL search params (query), check if they changed
    // This requires passing `location.search` as a prop to this component
    if (this.props.location && prevProps.location && this.props.location.search !== prevProps.location.search) {
      console.log("previous location unequal")
      await this.setState({page:1})
      this.updateNews();
    }
  }

  updateNews = async ()=>{
    console.log("inside updateNews");
    console.log("state=", this.state.page);
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let query = params.get('query');
    console.log("query="+query);

    this.props.setProgress(10);

    if(query===null){
      query="";
    }
    console.log("state2=", this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}&q=${query}`
    console.log("url=",url);
    this.setState({loading:true})
    let response = await fetch(url);
    this.props.setProgress(30);
    let parsedJson = await response.json();
    this.props.setProgress(70);
    //console.log(parsedJson);
    this.setState({
        articles: parsedJson.articles,
        loading: false,
        totalResults: parsedJson.totalResults
    })

    this.props.setProgress(100);
  }
   
  async componentDidMount(){
    console.log("inside componentDidMount")
    this.updateNews();
  }

  // handlePrevClick = async ()=>{
  //   console.log("prev click")
  //   this.setState(prevState => ({
  //     page: prevState.page - 1
  //   }), () => {
  //       this.updateNews(); // This will be called after the state has been updated
  //   });
  // }

  // handleNextClick = async ()=>{
  //   console.log("next click")
  //   this.setState(prevState => ({
  //     page: prevState.page + 1
  //   }), () => {
  //       this.updateNews(); // This will be called after the state has been updated
  //   });
  // }

  fetchMoreData = async ()=>{
    console.log("fetch more click")
    this.setState(prevState => ({
      page: prevState.page + 1
    }), async () => {
      console.log("inside fetchMoreData");
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      let query = params.get('query');
      console.log("query="+query);
  
      if(query===null){
        query="";
      }

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}&q=${query}`
      console.log("url=",url);
      let response = await fetch(url);
      let parsedJson = await response.json();
      this.setState({
          articles: this.state.articles.concat(parsedJson.articles),
          totalResults: parsedJson.totalResults
      })
    });
  }

  render() {
    let removedCounter=0;
    return (
      <>
        <h2 className='text-center'>NewsBites - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          {<div className="row">
              {this.state.articles.map((element)=>{
                  return  <div className="col-md-4 my-3" key={element.url === "https://removed.com"? removedCounter++:element.url}>
                          <NewsItem className="" newsUrl={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} date={element.publishedAt} author={element.author} source={element.source.name}/>
                          </div>
              })}
          </div>}
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

function NewsWithLocation(props) {
  const location = useLocation();
  return <News {...props} location={location} />;
}

export default NewsWithLocation; // Exporting with the name `News`

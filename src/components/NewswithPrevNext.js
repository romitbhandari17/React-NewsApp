import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';

export class NewswithPrevNext extends Component {

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
            loading: false
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

    if(query===null){
      query="";
    }
    console.log("state2=", this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9546fe882a584bba8cc5919cb631cf65&pageSize=${this.props.pageSize}&page=${this.state.page}&q=${query}`
    console.log("url=",url);
    this.setState({loading:true})
    let response = await fetch(url);
    let parsedJson = await response.json();

    //console.log(parsedJson);
    this.setState({
        articles: parsedJson.articles,
        loading: false,
        totalResults: parsedJson.totalResults
    })
  }
   
  async componentDidMount(){
    console.log("inside componentDidMount")
    this.updateNews();
  }

  handlePrevClick = async ()=>{
    console.log("prev click")
    this.setState(prevState => ({
      page: prevState.page - 1
    }), () => {
        this.updateNews(); // This will be called after the state has been updated
    });
  }

  handleNextClick = async ()=>{
    console.log("next click")
    this.setState(prevState => ({
      page: prevState.page + 1
    }), () => {
        this.updateNews(); // This will be called after the state has been updated
    });
    this.updateNews();
  }

  render() {
    let removedCounter=0;
    return (
      <div className="container my-3">
        <h2 className='text-center'>NewsBites - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
        {this.state.loading && <Spinner/>}
        {!this.state.loading  && <div className="row">
            {this.state.articles.map((element)=>{
                return  <div className="col-md-4 my-3" key={element.url === "https://removed.com"? removedCounter++:element.url}>
                        <NewsItem className="" newsUrl={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} date={element.publishedAt} author={element.author} source={element.source.name}/>
                        </div>
            })}
        </div>}
        <div className="container">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark mx-2" onClick={this.handlePrevClick}>Prev</button>
            <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark mx-2" onClick={this.handleNextClick}> Next</button>
        </div>
      </div>
    )
  }
}

function NewsWithLocation(props) {
  const location = useLocation();
  return <NewswithPrevNext {...props} location={location} />;
}

export default NewsWithLocation; // Exporting with the name `News`

import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const { category, ...otherProps } = props;
    const [articles, setArticles ] = useState([]) ;
    const [totalResults, setTotalResults ] = useState(0) ;
    const [loading, setLoading ] = useState(true) ;
    const [page, setPage ] = useState(1) ;

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }


    let removedCounter=0;
  //  }

  // withLocation(Component) {
  //   return props => <Component {...props} location={useLocation()} />;
  // }

  //  async componentDidUpdate(prevProps) {
  //   console.log("inside componentDidUpdate")
  //   if (props.category !== prevProps.category) {
  //     console.log("previous category unequal")
  //     await setState({page:1})
  //     updateNews();
  //   }

  //   // Additionally, if you are tracking URL search params (query), check if they changed
  //   // This requires passing `location.search` as a prop to this component
  //   if (props.location && prevProps.location && props.location.search !== prevProps.location.search) {
  //     console.log("previous location unequal")
  //     await setState({page:1})
  //     updateNews();
  //   }
  // }

  // const updateNews = useCallback(async () => {
  //   // Function body here
  //   console.log("inside updateNews");
  //   //console.log("state=", page);
  //   const queryString = window.location.search;
  //   const params = new URLSearchParams(queryString);
  //   let query = params.get('query');
  //   console.log("query="+query);

  //   //props.setProgress(10);

  //   if(query===null){
  //     query="";
  //   }
  //   //console.log("state2=", page);
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=1&q=${query}`
  //   console.log("url=",url);
  //   setLoading(true);
  //   let response = await fetch(url);
  //   //props.setProgress(30);
  //   let parsedJson = await response.json();
  //   //props.setProgress(70);
  //   setArticles(parsedJson.articles);
  //   setLoading(false);
  //   setTotalResults(parsedJson.totalResults);
  //   //props.setProgress(100);
  // }, [props]);

  const updateNews = async () => {
    // Function body here
    console.log("inside updateNews");
    //console.log("state=", page);
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let query = params.get('query');
    console.log("query="+query);

    props.setProgress(10);

    if(query===null){
      query="";
    }
    //console.log("state2=", page);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=1&q=${query}`
    console.log("url=",url);
    setLoading(true);
    let response = await fetch(url);
    props.setProgress(30);
    let parsedJson = await response.json();
    props.setProgress(70);
    setArticles(parsedJson.articles);
    setLoading(false);
    setTotalResults(parsedJson.totalResults);
    props.setProgress(100);
  };

  // replicating componentDidUpdate
  useEffect(() => {
    console.log("Inside useEffect");
    document.title = 'NewsBites-'+capitalizeFirstLetter(props.category);
    updateNews();
    // eslint-disable-next-line
  }, [category, ...Object.values(otherProps).filter((prop) => prop !== props.setProgress)]); // exclude trigger on props.setProgress change

  // old function
  // useEffect(() => {
  //   updateNews();
  // }, [props, updateNews]);

  // handlePrevClick = async ()=>{
  //   console.log("prev click")
  //   setState(prevState => ({
  //     page: prevpage - 1
  //   }), () => {
  //       updateNews(); // This will be called after the state has been updated
  //   });
  // }

  // handleNextClick = async ()=>{
  //   console.log("next click")
  //   setState(prevState => ({
  //     page: prevpage + 1
  //   }), () => {
  //       updateNews(); // This will be called after the state has been updated
  //   });
  // }

  const fetchMoreData = async ()=>{
    console.log("fetch more click");
    const nextPage = page+1;
    console.log("inside fetchMoreData");
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let query = params.get('query');
    console.log("query="+query);

    if(query===null){
      query="";
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${nextPage}&q=${query}`
    console.log("url=",url);
    let response = await fetch(url);
    let parsedJson = await response.json();
    //setArticles(articles.concat(parsedJson.articles));
    setArticles((prevArticles) => [...prevArticles, ...parsedJson.articles]);
    setTotalResults(parsedJson.totalResults);
    setPage(nextPage);
  }

  return (
    <>
      <h2 className='text-center'>NewsBites - Top {capitalizeFirstLetter(props.category)} Headlines </h2>
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner/>}
      >
      <div className="container">
        {<div className="row">
            {articles.map((element)=>{
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

function NewsWithLocation(props) {
  const location = useLocation();
  return <News {...props} location={location} />;
}

News.defaultProps = {
  country: 'us',
  category: 'general',
  pageSize: 10
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

export default NewsWithLocation; // Exporting with the name `News`

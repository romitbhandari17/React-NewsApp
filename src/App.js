import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
//import Search from './components/SearchClass';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
    this.apiKey = process.env.REACT_APP_NEWS_API_KEY;
    console.log(this.apiKey)
    this.setProgress = this.setProgress.bind(this);
    this.pageSize = 5; // Assuming pageSize is also a property of this class
  }
  setProgress = (progress) =>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <Routes>
          <Route path="/about" element={<About/>}>
            {/* <About /> */}
          </Route>
          <Route key="general" path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  pageSize={this.pageSize} country="us" category="general" /> }>
          </Route>
          <Route key="science" path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="us" category="science"/> }>
          </Route>
          <Route key="health" path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="us" category="health"/> }>
          </Route>
          <Route key="sports" path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="us" category="sports"/> }>
          </Route>
          <Route key="business" path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="us" category="business"/> }>
          </Route>
          <Route key="entertainment" path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="us" category="entertainment"/> }>
          </Route>
          <Route key="technology" path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="us" category="technology"/> }>
          </Route>
          {/* <Route path="/" element={<Search />} ></Route> */}
        </Routes>
        </Router>
      </div>
    )
  }
}

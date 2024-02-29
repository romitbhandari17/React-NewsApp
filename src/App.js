import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

const App =()=> {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const pageSize = 5;
  const [progress, setProgress ] = useState(0) ;

    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route path="/about" element={<About/>}>
            {/* <About /> */}
          </Route>
          <Route key="general" path="/" element={<News apiKey={apiKey} setProgress={setProgress}  pageSize={pageSize} country="us" category="general" /> }>
          </Route>
          <Route key="science" path="/science" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="us" category="science"/> }>
          </Route>
          <Route key="health" path="/health" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="us" category="health"/> }>
          </Route>
          <Route key="sports" path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="us" category="sports"/> }>
          </Route>
          <Route key="business" path="/business" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="us" category="business"/> }>
          </Route>
          <Route key="entertainment" path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="us" category="entertainment"/> }>
          </Route>
          <Route key="technology" path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="us" category="technology"/> }>
          </Route>
          {/* <Route path="/" element={<Search />} ></Route> */}
        </Routes>
        </Router>
      </div>
    )
}

export default App;

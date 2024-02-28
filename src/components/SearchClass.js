// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom'; 

// // This is not working with React Router 6, so created a RFC.
// export class SearchClass extends Component {

//     constructor(props) {
//         super(props);
//         // Create a ref to store the textInput DOM element
//         this.inputRef = React.createRef();
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//         const searchTerm = event.target.elements.search.value;

//         // Navigate to the search route and pass the searchTerm as state
//         //navigate('/general', { query: { searchTerm } });
//         this.props.history.push(`/general?query=${searchTerm}`);
//     };  

//   render() {
//     return (
//       <div>
//         <form className="d-flex" role="search" onSubmit={this.handleSubmit}>
//             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//             <button className="btn btn-outline-success" type="submit">Search</button>
//         </form>
//       </div>
//     )
//   }
// }
// export default withRouter(SearchClass);
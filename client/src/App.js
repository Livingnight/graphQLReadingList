import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';

//imported components!
import BookList from './components/BookList';

//setting up apollo client
const client = new ApolloClient({
    uri:"http://localhost:3001/graphql"
})



class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Livingnight's Reading list!</h1>
          <BookList />
      </div>
    );
  }
}

export default App;

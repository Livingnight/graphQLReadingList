import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//imported components!
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';

//setting up apollo client
const client = new ApolloClient({
    uri:`${window.location.href}/graphql`
});



class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <h1>Livingnight's Reading list!</h1>
                <BookList />
                <AddBook />
                <AddAuthor />

            </div>
        </ApolloProvider>
    );
  }
}

export default App;

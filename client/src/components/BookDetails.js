import React, { Component } from 'react';
import {getBookQuery} from '../queries/queries'
import {graphql} from 'react-apollo';

class BookDetails extends Component{
    displayBookDetails(){
        const {book} = this.props.data;
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All Books by Author</p>
                    <ul className={'other-books'}>
                        {book.author.books.map( book => {
                            return <li key={book.id}>
                                    {book.name}
                            </li>
                        })}
                    </ul>
                </div>
            )
        }else{
            return <div>No Book Selected!<br /></div>
        }

}
    render(){
        // {console.log(this.props)}
        return(
            <div id="book-details">
                <p>Output Book Details Here</p>
                {this.displayBookDetails()}
            </div>
        )
    }

}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
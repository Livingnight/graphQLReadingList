import React, {Component} from 'react'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from "../queries/queries";
import {graphql, compose} from 'react-apollo';


class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: '',

        }
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        // console.log(`${name}: ${value}`)
        this.setState({
            [name]: value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, authorId, genre } = this.state;
        console.log(e.target);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            }, refetchQueries: [{
                query: getBooksQuery
            }]
        }).then( e => {
            this.setState({
                name: '',
                genre: '',
                authorId: ''
            })
        })

    };

    displayAuthors() {
        const data = this.props.getAuthorsQuery;
        if (data.loading) {
            return <option disabled>Loading Authors...</option>
        } else {
            return data.authors.map(author => {
                    return <option key={author.id} value={author.id}>{author.name}</option>

                }
            )
        }
    }



    render(){
        // console.log(this.props);
        return(

           <form id='add-book' onSubmit={this.handleSubmit}>
               <h3 id='title-field'>Add Book</h3>
               <div className='field'>
                   <label>BookName:</label>
                   <input
                       type='text'
                       name='name'
                       value={this.state.name}
                       onChange={ this.handleChange}
                   />
               </div>

               <div className='field'>
                   <label>Genre:</label>
                   <input
                       type='text'
                       name='genre'
                       value={this.state.genre}
                       onChange={this.handleChange}
                   />
               </div>

               <div className='field'>
                   <label>Author:</label>
                   <select name='authorId' onChange={this.handleChange}>
                    <option>Select Author</option>
                       {this.displayAuthors()}
                   </select>
               </div>

               <button>+</button>

           </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)
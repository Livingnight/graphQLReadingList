import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo'
import {addAuthorMutation, getAuthorsQuery} from "../queries/queries";

class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: ''
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        console.log(`${name}: ${value}`);
        this.setState({
            [name]: value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name,
                age: Number(this.state.age)
            }, refetchQueries: [{
                query: getAuthorsQuery
            }]
        }).then(
            this.setState({
                name: '',
                age: ''
            })
        )

    };

    render() {
        return (
            <form id='add-author' onSubmit={this.handleSubmit}>
                <h3 id='title-field'>Add Author</h3>
                <div className="field">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name='name'
                    />
                </div>
                <div className="field">
                    <label>Age:</label>
                    <input
                        type="text"
                        value={this.state.age}
                        onChange={this.handleChange}
                        name='age'
                    />
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(addAuthorMutation, {name: 'addAuthorMutation'}),
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'})
)(AddAuthor)
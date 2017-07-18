import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class ListContacts extends Component {
  static propTypes = {
    // propTypes allows us to do is it allows us to specify the  specific types of the props that are passing
    //into specific component  and we also are allowed to specify if thery are required or not .
    //if we are not passing data as propTypes required , then it throws an error on console  and  app will not work.
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }
//it takes the query in paramter and update the state .
//udate the state by using object and it trim off the whitespaces around the query.
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  //to clear the query from search bar
  clearQuery = ()=>{
//pass an empty object to the setState

    this.state({query:''})
}

  render() {
    const { contacts, onDeleteContact } = this.props
     const { query } = this.state

    let showingContacts
    if (query) {
      /* here match is an object for matching a specific text within pattern .
       when we use regular Expression there are certain character which have certain meaning , if any character
   inside the query then go ahead and escapes them and what 'i' does we don't care about the case ,ignore the case.*/
      const match = new RegExp(escapeRegExp(query), 'i')
    /*showing contacts only going tobe the contacts which match the query.*/
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }
 /*sort is just native javascipt library that sort array by name.*/
    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
          <div className='list-contacts-top'>
          {/*when the input changes it calls the updateQuery.get the value of input field so we do event.target.value.*/}
            <input
              className='search-contacts'
              type='text'
              placeholder='Search contacts'
              value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />

{/*Link component  will actually render an anchor tag still.it updates the  Browser URL.*/ }
            <Link
             to='/create'
            className='add-contact'
          >Add Contact</Link>
          </div>
{/* showingContacts should be the filterd array, that filtered array for  all of the contacts that match specific contact*/}

          {showingContacts.length !== contacts.length && (
           <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
      )}
          <ol className='contact-list'>
            {showingContacts.map((contact) => (
              <li key={contact.id} className='contact-list-item'>
                <div className='contact-avatar' style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}/>
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
{/*remove contact*/}
                <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                  Remove
                </button>
              </li>
            ))}
          </ol>
        </div>
    )
  }
}


export default ListContacts

import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {

  state = {

    contacts: []
  }
  // componentDidMount is the lifecycle methods
  // it is executed after first render only on the client side .If we need to load data from server ao remote endpoint
  // it is used for instantiate the network request.
  // If we want to make ajax request then we use the componentDidMount().
  componentDidMount() {
    //getAll methods belons to the ContactsAPI,it used for get all the contacts data from server
    ContactsAPI.getAll().then((contacts) => {
      //this.setState method, used to update the  local component state of contacts.
      this.setState({ contacts })
    })
  }
// when removeContact invoked "(contact)" it is going to pass a specific contacts that was clicked on.
  removeContact = (contact) => {
    //this state method is by passing it a function , and this function is going to return new object that is
    // going to merge with current state.
    //2. we use functional setState method , when new state of our components depends on the prevoius state of components.
    // NOTE: UI is the function of  state  in react. once the state changed ,UI will automatically update.
    this.setState((state) => ({
      //we are going to filter current contacts on our state ,we are going to remove the state contact id does not
      //equal to the id of contacts that was clicked on.
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
      ContactsAPI.remove(contact)
  }

  //Here , ContactsAPI call the create method and pass the contact here.this gives a promise back and then
  //send us the contact from to the server
  createContact(contact) {
     ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        //the current state of the contacts will concat with new contacts.
        //so it returns a new array and we have new person in our contact list.

        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>

{/* Route takes a path that will match the URL or not.
//If the path matches , then Route will render some UI, if won't render anything then it does not matche.
//it will render the screen for us.*/}

{/* it renders the contact list screen.*/}
       <Route exact path='/'render={() =>(
        <ListContacts
        // onDeleteContact it's going to reference the  remove contact.
        onDeleteContact={this.removeContact}
        contacts={this.state.contacts}
        />
  )}
  />
  {/*when the path matches with /create (e.g https://localhost3000/create) then it renders the  createContact scren.*/}
  <Route path='/create' render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact)
                /* so we create a contact and then we are going to go back to the list.so we should add new person in the list.*/
                history.push('/')
              }}
            />
          )}/>
      </div>
    )
  }
}

export default App;

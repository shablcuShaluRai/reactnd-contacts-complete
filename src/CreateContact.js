//create new contact

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateContact extends Component {

// handleSubmit it takes an event .preventDefault used for browser don't submit this form for us.

  handleSubmit =(e)=>{
    e.preventDefault()
    // serializeForm is just npm which is used for serialize Form.
    // we are  taking values to  serialize it into an object
    //it helps to prevent to add the data with browser url.
    const values = serializeForm(e.target, { hash: true })
    //we can check here console.log(values)

    if (this.props.onCreateContact)
      this.props.onCreateContact(values)
  }
  render() {
    return (
      <div>
      <Link className='close-create-contact' to='/'>Close</Link>
      {/*create contact form
 // instead of having the browser take over the form when it gets submit,to control ourselves
 //we have create a handler called handle submit.*/}

      <form onSubmit={this.handleSubmit} className='create-contact-form'>

{/*this component allows us to upload the images for avatars.*/}
        <ImageInput
          className='create-contact-avatar-input'
          name='avatarURL'
          maxHeight={64}
        />
      
        <div className='create-contact-details'>
          <input type='text' name='name' placeholder='Name'/>
          <input type='text' name='email' placeholder='Email'/>
          <button>Add Contact</button>
        </div>
      </form>
    </div>


    )
  }
}

export default CreateContact

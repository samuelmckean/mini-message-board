import { useState } from 'react';

function NewMessage({ axios, addMessage, removeMessage }) {
  // flag for when there is an error send the message to the backend
  const [errorFlag, setErrorFlag] = useState(false);

  // sends a POST request to the backend with a new message
  const sendMessage = async (message) => {
    try {
      // send POST request
      await axios.post('/new', message);
    } catch {
      // remove message from state
      removeMessage(message);
      throw new Error('Received response other than 201');
    }
  }

  // validates the form
  const validateForm = (event) => {
    // get form values
    const user = event.target.user;
    const text = event.target.text;
    // validate user field
    if (!user.checkValidity()) {
      user.classList.add('is-invalid');
      return false;
    } else {
      user.classList.remove('is-invalid');
    }
    if (!text.checkValidity()) {
      text.classList.add('is-invalid');
      return false;
    } else {
      text.classList.remove('is-invalid');
    }
    return true;
  }

  // resets the form values
  const resetForm = (event) => {
    event.target.user.value = '';
    event.target.text.value = '';
  }

  // validates the form and applies the right classes
  const handleSubmit = async (event) => {
    event.preventDefault();
    // proceed if the form is valid
    if (validateForm(event)) {
      // create a message object to add to the state and send to backend
      const message = {
        user: event.target.user.value,
        text: event.target.text.value,
        added: new Date(),
      }
      addMessage(message);
      // reset form values
      resetForm(event);
      try {
        await sendMessage(message);
        // reset errorFlag on successful send
        setErrorFlag(false);
      } catch {
        setErrorFlag(true);
      }
    }
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-8'>
        <form onSubmit={handleSubmit} noValidate>
          <div className='card'>
            <div className='card-body'>
              {
                errorFlag &&
                <div className='alert alert-danger' role='alert'>
                  {'Error: could not send message.'}
                </div>
              }
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' className='form-control' id='user' required />
              </div>
              <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea type='text' className='form-control' id='text' required />
              </div>
              <button type='submit' className='btn btn-primary'>Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMessage;

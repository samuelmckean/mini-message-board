function NewMessage({ axios }) {
  // validates the form and applies the right classes
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    if (!event.target.user.checkValidity()) {
      valid = false;
      event.target.user.classList.add('is-invalid');
    } else {
      event.target.user.classList.remove('is-invalid');
    }
    if (!event.target.text.checkValidity()) {
      valid = false;
      event.target.text.classList.add('is-invalid');
    } else {
      event.target.text.classList.remove('is-invalid');
    }
    // send POST request

  }

  return (
    <div className='row justify-content-center'>
      <div className='col-8'>
        <form onSubmit={handleSubmit} noValidate>
          <div className='card'>
            <div className='card-body'>
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

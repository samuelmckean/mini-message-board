function NewMessage() {
  return (
    <div className='row justify-content-center'>
      <div className='col-8'>
        <form>
          <div className='card'>
            <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' className='form-control' id='user' />
              </div>
              <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea type='text' className='form-control' id='text' />
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

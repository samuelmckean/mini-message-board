import Message from './Message';
import NewMessage from './NewMessage';
import uniqid from 'uniqid';
import axios from 'axios';
import { useEffect, useState } from 'react';

// set the base url for making API requests
const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

// get the messages from the backend
const getMessages = async () => {
  try {
    const response = await instance.get('/');
    const messages = response.data;
    return messages;
  } catch {
    return Error('Error getting messages');
  }
}

// react component that contains messages and the new message form
function MessageBoard() {
  // create state for messages array
  const [messages, setMessages] = useState([]);

  // sets the state to the message from the backend on mount
  useEffect(() => {
    const fetchData = async () => {
      const messages = await getMessages();
      setMessages(messages);
    }
    fetchData();
  }, []);

  // create a Message component for each message
  const messageItems = messages.map((message) => {
    return <Message key={uniqid()} message={message} />
  });

  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-8'>
          <ul>{messageItems}</ul>
        </div>
      </div>
      <NewMessage />
    </div>
  );
}

export default MessageBoard;

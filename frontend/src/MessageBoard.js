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
    messages.forEach((message) => {
      message.added = new Date(message.added);
    });
    return messages;
  } catch {
    return Error('Error getting messages');
  }
}

// react component that contains messages and the new message form
function MessageBoard() {
  // create state for messages array
  const [messages, setMessages] = useState([]);

  // adds a message to the current state
  const addMessage = (message) => {
    setMessages(messages.concat(message));
  }

  // removes a message from the state
  const removeMessage = (message) => {
    const removedMessage = messages.filter((item) => {
      if (message.user !== item.user) {
        return true;
      }
      if (message.text !== item.text) {
        return true;
      }
      if (message.added !== item.added) {
        return true;
      }
      return false;
    });
    setMessages(removedMessage);
  }

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
      <NewMessage axios={instance} addMessage={addMessage} removeMessage={removeMessage} />
    </div>
  );
}

export default MessageBoard;

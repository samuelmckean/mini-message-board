import { formatDistanceToNow } from 'date-fns';

function Message({ message }) {
  const { text, user, added } = message;
  return (
    <li>
      <div className='card'>
        <div className='card-body'>
          <h3 className='card-name'>{user}</h3>
          <p className='card-text'>{text}</p>
          <div className='card-footer text-muted text-right'>{formatDistanceToNow(added) + ' ago'}</div>
        </div>
      </div>
    </li>
  );
}

export default Message;

import './App.css';
import MessageBoard from './MessageBoard';

function App() {

  return (
    <div className="App container">
      <header className="row justify-content-center">
        <h1 className='col-8'>Message Board</h1>
      </header>
      <MessageBoard />
    </div>
  );
}

export default App;

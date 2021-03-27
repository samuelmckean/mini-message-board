import './App.css';
import MessageBoard from './MessageBoard';

function App() {

  return (
    <div className="App container-sm">
      <header className="row justify-content-center">
        <h1 className='col-12 col-md-8'>Message Board</h1>
      </header>
      <MessageBoard />
    </div>
  );
}

export default App;

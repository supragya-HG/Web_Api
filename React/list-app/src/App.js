import './App.css';
import InputBox from './components/InputBox.js'
import ListGrid from './components/ListGrid.js'


function App() {
  return (
    <div className="App">
      <div className="Header"><h1>List App</h1></div>
      <InputBox></InputBox>
      <ListGrid></ListGrid>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import GoogleMap from './components/GoogleMap';
import GoogleMapAutoComplete from './components/GoogleMapAutoComplete';

function App() {
  return (
    <div className="app">
      <GoogleMap />
      <GoogleMapAutoComplete />
      {/* <SearchLocationInput onChange={() => null} /> */}
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

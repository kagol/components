import React, { useState, useEffect } from 'react';
import Pagination from './components/pagination/Pagination';
import List from './components/List';
import { lists } from './db';
import { chunk } from './util';
import logo from './logo.svg';
import './App.scss';

function App() {
  const defaultCurrent = 1;
  const defaultPageSize = 2;
  const [dataSource, setLists] = useState(chunk(lists, defaultPageSize)[defaultCurrent - 1]);
  return (
    <div className="App">
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
      <List dataSource={dataSource} />
      <Pagination total={lists.length} defaultCurrent={defaultCurrent} defaultPageSize={defaultPageSize} onChange={(current) => { 
        setLists(chunk(lists, defaultPageSize)[current - 1]);
      }} />
    </div>
  );
}

export default App;

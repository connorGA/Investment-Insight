import React, { useEffect } from 'react';
import './App.css';
import Assets from './components/assests/Assets';
import Header from './components/header/Header';
import ProfitGraph from './components/profitGraph/ProfitGraph'
import Budget from './components/budget/Budget';

function App() {
  useEffect(() => {
    fetch('/api/test/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className="App">
      <Header className="header-container" />
      <div className="middle-container">
        <Assets />
        <ProfitGraph />
      </div>
      <Budget className="bottom-container" />
    </div>
  );
}

export default App;


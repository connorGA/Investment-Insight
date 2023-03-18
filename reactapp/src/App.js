import React, { useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';

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
      <>
        <Header />
      </>
    </div>
  );
}

export default App;


// MainPage.js
import React from 'react';
import Header from '../header/Header';
import Assets from '../assests/Assets';
import ProfitGraph from '../profitGraph/ProfitGraph';
import Budget from '../budget/Budget';
import './mainPage.css';

function MainPage() {
  console.log('MainPage rendering'); // Add this line for debugging
  
  return (
    <>
      <Header />
      <div className="middle-container">
      <Assets />
      <ProfitGraph />
      </div>
      <Budget />
    </>
  );
}

export default MainPage;

// MainPage.js
import React from 'react';
import Header from '../header/Header';
import Assets from '../assests/Assets';
import ProfitGraph from '../profitGraph/ProfitGraph';
import Budget from '../budget/Budget';

function MainPage() {
  console.log('MainPage rendering'); // Add this line for debugging
  
  // const data = [
  //   { month: '2023-01-01', profit: 500 },
  //   { month: '2023-02-01', profit: 1000 },
  //   { month: '2023-03-01', profit: 1500 },
  //   { month: '2023-04-01', profit: 2000 },
  // ];
  return (
    <>
      <Header />
      <Assets />
      <ProfitGraph />
      {/* <ProfitGraph data={data}/> */}
      <Budget />
    </>
  );
}

export default MainPage;

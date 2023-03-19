import React, { useState } from 'react';
import './assets.css';

function Assets() {
    const [showForm, setShowForm] = useState(false);
    const [assets, setAssets] = useState([]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newAsset = {
        name: e.target.name.value,
        price: e.target.price.value,
        boughtDate: e.target.boughtDate.value,
        soldDate: e.target.soldDate.value,
        profitLoss: e.target.profitLoss.value,
      };
  
      setAssets([...assets, newAsset]);
      setShowForm(false);
    };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Asset Name:</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" />

          <label htmlFor="boughtDate">Bought Date:</label>
          <input type="date" id="boughtDate" name="boughtDate" />

          <label htmlFor="soldDate">Sold Date:</label>
          <input type="date" id="soldDate" name="soldDate" />

          <label htmlFor="profitLoss">Profit or Loss:</label>
          <input type="number" id="profitLoss" name="profitLoss" />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="assets-container">
          <table>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Price</th>
                <th>Bought Date</th>
                <th>Sold Date</th>
                <th>Profit or Loss</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.name}</td>
                  <td>{asset.price}</td>
                  <td>{asset.boughtDate}</td>
                  <td>{asset.soldDate}</td>
                  <td>{asset.profitLoss}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-asset-button" onClick={() => setShowForm(true)}>
            Add Asset
          </button>
        </div>
      )}
    </div>
  );
}

export default Assets;
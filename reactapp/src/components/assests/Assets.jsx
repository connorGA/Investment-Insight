import React, { useState, useEffect } from "react";
import "./assets.css";

function Assets() {
  const [showForm, setShowForm] = useState(false);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const response = await fetch("/api/assets/");
    const data = await response.json();
    setAssets(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAsset = {
      name: e.target.name.value,
      current_price: e.target.current_price.value,
      buy_date: e.target.buy_date.value,
      buy_price: e.target.buy_price.value,
      sale_date: e.target.sale_date.value || null,
      sale_price: e.target.sale_price.value || null,
      profit_or_loss: e.target.profit_or_loss.value || null,
    };

    const requestOptions = {
      method: selectedAsset ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAsset),
    };

    const url = selectedAsset
      ? `/api/assets/${selectedAsset.id}/`
      : "/api/assets/";

    await fetch(url, requestOptions);
    fetchAssets();
    setShowForm(false);
    setSelectedAsset(null);
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/assets/${id}/`, { method: "DELETE" });
    fetchAssets();
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Asset Name:</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="current_price">Current Price:</label>
          <input type="number" id="current_price" name="current_price" />

          <label htmlFor="buy_date">Bought Date:</label>
          <input type="date" id="buy_date" name="buy_date" />

          <label htmlFor="buy_price">Bought Price:</label>
          <input type="number" id="buy_price" name="buy_price" />

          <label htmlFor="sale_date">Sold Date:</label>
          <input type="date" id="sale_date" name="sale_date" />

          <label htmlFor="sale_price">Sold Price:</label>
          <input type="number" id="sale_price" name="sale_price" />

          <label htmlFor="profit_or_loss">Profit or Loss:</label>
          <input type="number" id="profit_or_loss" name="profit_or_loss" />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="assets-container">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Current Price</th>
                <th>Bought Date</th>
                <th>Bought Price</th>
                <th>Sold Date</th>
                <th>Sold Price</th>
                <th>Profit or Loss</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.name}</td>
                  <td>{asset.current_price}</td>
                  <td>{asset.buy_date}</td>
                  <td>{asset.buy_price}</td>
                  <td>{asset.sale_date}</td>
                  <td>{asset.sale_price}</td>
                  <td>{asset.profit_or_loss}</td>
                  <td>
                    <button onClick={() => handleEdit(asset)}>Edit</button>
                    <button onClick={() => handleDelete(asset.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-asset-button" onClick={() => setShowForm(true)}>
            Add Asset
          </button>
        </div>

      )}


        {assets.map((asset) => (
          <tr key={asset.id}>
            {/* Table data */}
            <td>
              <button onClick={() => handleEdit(asset)}>Edit</button>
              <button onClick={() => handleDelete(asset.id)}>Delete</button>
            </td>
          </tr>
        ))}

    </div>
  );
}

export default Assets;

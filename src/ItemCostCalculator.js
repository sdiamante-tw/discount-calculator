import React, { useState } from 'react';
import './ItemCostCalculator.css';

const ItemCostCalculator = () => {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState(null);

  const calculateFinalPrice = () => {
    const priceValue = parseFloat(price);
    const discountValue = parseFloat(discount);
    
    if (isNaN(priceValue) || isNaN(discountValue)) {
      setFinalPrice(null);
      return;
    }

    const discountAmount = priceValue * (discountValue / 100);
    const finalPriceValue = priceValue - discountAmount;
    setFinalPrice(finalPriceValue.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Item Cost Calculator</h2>
      <div className="input-group">
        <label htmlFor="price">Original Price ($):</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          min="0"
          step="0.01"
        />
      </div>
      <div className="input-group">
        <label htmlFor="discount">Discount (%):</label>
        <input
          type="number"
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Enter discount percentage"
          min="0"
          max="100"
          step="0.01"
        />
      </div>
      <button onClick={calculateFinalPrice}>Calculate Final Price</button>
      {finalPrice !== null && (
        <div className="result">
          <h3>Final Price: ${finalPrice}</h3>
        </div>
      )}
    </div>
  );
};

export default ItemCostCalculator; 
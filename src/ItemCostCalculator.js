import React, { useState } from 'react';
import './ItemCostCalculator.css';

const ItemCostCalculator = () => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const [taxAmount, setTaxAmount] = useState(null);
  const [totalWithTax, setTotalWithTax] = useState(null);

  const UTAH_TAX_RATE = 0.0685; // 6.85%

  const calculatePrices = () => {
    const priceValue = parseFloat(price);
    const quantityValue = parseInt(quantity);
    const discountValue = parseFloat(discount);
    
    if (isNaN(priceValue) || isNaN(quantityValue)) {
      setFinalPrice(null);
      setOrderTotal(null);
      setTaxAmount(null);
      setTotalWithTax(null);
      return;
    }

    // Calculate order total (price * quantity)
    const totalBeforeDiscount = priceValue * quantityValue;
    setOrderTotal(totalBeforeDiscount.toFixed(2));

    // Calculate final price with discount if provided
    let finalPriceBeforeTax = totalBeforeDiscount;
    if (!isNaN(discountValue)) {
      const discountAmount = totalBeforeDiscount * (discountValue / 100);
      finalPriceBeforeTax = totalBeforeDiscount - discountAmount;
      setFinalPrice(finalPriceBeforeTax.toFixed(2));
    } else {
      setFinalPrice(null);
    }

    // Calculate tax and total with tax
    const tax = finalPriceBeforeTax * UTAH_TAX_RATE;
    const total = finalPriceBeforeTax + tax;
    
    setTaxAmount(tax.toFixed(2));
    setTotalWithTax(total.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Item Cost Calculator</h2>
      <div className="input-group">
        <label htmlFor="price">Price per Item ($):</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price per item"
          min="0"
          step="0.01"
        />
      </div>
      <div className="input-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          min="1"
          step="1"
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
      <button onClick={calculatePrices}>Calculate Prices</button>
      {orderTotal !== null && (
        <div className="result">
          <h3>Order Total: ${orderTotal}</h3>
          {finalPrice !== null && (
            <h3>Price After Discount: ${finalPrice}</h3>
          )}
          <h3>Utah Sales Tax (6.85%): ${taxAmount}</h3>
          <h3 className="total-with-tax">Total with Tax: ${totalWithTax}</h3>
        </div>
      )}
    </div>
  );
};

export default ItemCostCalculator; 
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/home';
import ConfirmListPage from './ConfirmList/confirmList';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [crackers, setCrackers] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [downloaded, setDownloaded] = useState(false);




useEffect(() => {
  const fetchSheetData = async () => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwEii1S1iAoXHTCiDvdwqBeFVo6ds2pRf_Yj-eXmjnSCSlxqt9--xfhy-Qh7TJbR8ox9A/exec");

      const data = await response.json(); // No no-cors = response is readable

      const grouped = {};
      data.forEach(row => { 
        const category = row['category'];
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push({
          name: row['name'],
          tamilName: row['tamilName'],
          originalRate: parseFloat(row['originalRate']),
          rate: parseFloat(row['rate']),
          quantity: 0, 
          checked: false
        });
      });

      const structuredData = Object.entries(grouped).map(([category, items]) => ({
        category,
        items
      }));

      setCrackers(structuredData);
    } catch (err) {
      console.error("Failed to fetch crackers from Google Sheets:", err);
    }
  };

  fetchSheetData();
}, []);




  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={
            <Home
              setSelectedItems={setSelectedItems}
              totalRate={totalRate}
              setTotalRate={setTotalRate}
              crackers={crackers}
              setCrackers={setCrackers}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerNumber={customerNumber}
              setCustomerNumber={setCustomerNumber}
              customerAddress={customerAddress}
              setCustomerAddress={setCustomerAddress}
              customerState={customerState}
              setCustomerState={setCustomerState}
            />
          } />
          <Route path="/confirmList" element={<ConfirmListPage
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            totalRate={totalRate}
            setTotalRate={setTotalRate}
            crackers={crackers}
            setCrackers={setCrackers}
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerNumber={customerNumber}
            setCustomerNumber={setCustomerNumber}
            customerAddress={customerAddress}
            setCustomerAddress={setCustomerAddress}
            customerState={customerState}
            setCustomerState={setCustomerState}
            setDownloaded={setDownloaded}
            downloaded={downloaded}
          />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import { BarLoader  } from 'react-spinners';
// import * as XLSX from 'xlsx';

import './home.css';

const Home = ({ setSelectedItems, totalRate, setTotalRate, crackers, setCrackers, customerName, setCustomerName, customerNumber, setCustomerNumber, customerAddress, setCustomerAddress, customerState, setCustomerState }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (categoryIndex, itemIndex, quantity) => {
    const updatedCrackers = crackers.map((category, cIndex) => {
      if (cIndex === categoryIndex) {
        const updatedItems = category.items.map((item, iIndex) => {
          if (iIndex === itemIndex) {
            return { ...item, quantity };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
    setCrackers(updatedCrackers);
    calculateTotalRate(updatedCrackers);
  };

  const calculateTotalRate = (crackersList) => {
    let total = 0;
    crackersList.forEach(category => {
      category.items.forEach(item => {
        const quantity = parseInt(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        total += quantity * rate;
      });
    });
    setTotalRate(total);
  };

  const handleCheckboxChange = (categoryIndex, itemIndex) => {
    const updatedCrackers = crackers.map((category, cIndex) => {
      if (cIndex === categoryIndex) {
        const updatedItems = category.items.map((item, iIndex) => {
          if (iIndex === itemIndex) {
            const updatedItem = { ...item, checked: !item.checked };
            if (!updatedItem.checked) {
              updatedItem.quantity = 0;
            }
            return updatedItem;
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
    setCrackers(updatedCrackers);
    calculateTotalRate(updatedCrackers);
  };








// Handle Upload Function


//   const handleExcelUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = async (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const excelData = XLSX.utils.sheet_to_json(worksheet);

//       // Save to UI
//       const groupedData = {};
//       excelData.forEach(row => {
//         const category = row["category"];
//         if (!groupedData[category]) groupedData[category] = [];
//         groupedData[category].push({
//           name: row["name"],
//           tamilName: row["tamilName"],
//           rate: row["rate"],
//           originalRate: row["originalRate"],
//           quantity: 0,
//           checked: false
//         });
//       });

//       const structuredData = Object.entries(groupedData).map(([category, items]) => ({
//         category,
//         items
//       }));

//       setCrackers(structuredData);

//       // Upload to Google Sheet
//       const formData = new URLSearchParams();
//       formData.append("data", JSON.stringify(excelData));

//       try {
//         await fetch("https://script.google.com/macros/s/AKfycby1O5vSCZw5Bcs9Gc9OBh8dOaAB8Xyq5HGdJrYwP53MTM7rlvwRq0hZX0u3Cy4D8t6X/exec", {
//           method: "POST",
//           mode: "no-cors", // Required to skip CORS checks
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: formData.toString(),
//         });

//         alert("Excel uploaded and stored in Google Sheet.");
//       } catch (err) {
//         console.error("Upload or fetch failed:", err);
//         alert("Upload failed.");
//       }
//     };

//     reader.readAsArrayBuffer(file);
// };




























  const handleSubmit = () => {
    const isNameValid = customerName.trim().length > 0;
    const isNumberValid = /^[0-9]{10}$/.test(customerNumber);
    const isAddressValid = customerAddress.trim().length > 0;
    const isStateValid = customerState === "Tamil Nadu";

    const invalidItems = [];
    const isQuantityValid = crackers.every(category =>
      category.items.every(item => {
        if (item.checked && (!item.quantity || item.quantity <= 0)) {
          invalidItems.push(item.name);
          return false;
        }
        return true;
      })
    );

    let quantityErrorMessage = '';
    if (invalidItems.length > 0) {
      quantityErrorMessage = `Please select quantity for the following items: ${invalidItems.join(', ')}.\n`;
    }

    const isCrackerChosen = crackers.some(category => category.items.some(item => item.checked));

    if (isNameValid && isNumberValid && isAddressValid && isStateValid && isQuantityValid && isCrackerChosen) {
      alert('Kindly Confirm Your Order');
      const selectedCrackers = crackers.flatMap(category =>
        category.items.filter(item => item.checked).map(item => ({ ...item, category: category.category }))
      );

      setSelectedItems(selectedCrackers);
      navigate('/confirmList');
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      let errorMessage = '';
      if (!isNameValid) errorMessage += 'Please enter the name.\n';
      if (!isNumberValid) errorMessage += 'Please enter a valid 10-digit number.\n';
      if (!isAddressValid) errorMessage += 'Please enter the address.\n';
      if (!isStateValid) errorMessage += 'Please select a valid state (Tamil Nadu).\n';
      errorMessage += quantityErrorMessage;
      if (!isCrackerChosen) errorMessage += 'Please choose at least one item from crackers.\n';

      alert(errorMessage);
    }
  };

  return (
    <div className='full-container'>
      <div className='full-container-header'>
        <h1 className='font-style-heading'>Ayyan's World</h1>
        <div className='contact-info'>
          <div style={{ display: 'flex', color: 'white', alignItems: 'center' }}><FontAwesomeIcon icon={faLocation} className='fontawesomeiconphone' />Sivakasi</div>
          <div style={{ display: 'flex', color: 'white', alignItems: 'center' }}><FontAwesomeIcon icon={faPhone} className='fontawesomeiconphone' />9444324237</div>
          <div style={{ display: 'flex', color: 'white', alignItems: 'center' }}><FontAwesomeIcon icon={faEnvelope} className='fontawesomeiconphone' />hariayyansworld@gmail.com</div>
        </div>
      </div>

      <div className='content-container'>
        <div className='sub-heading'>
          <h4 className='font-style-sub-heading'>Explore Our Product Catalogue and Place Your Order Today!</h4>
        </div>

{/*
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
          <p style={{ fontSize: '13px' }}>Upload Excel file to load cracker list</p>
        </div>

        */}

        <div className='sub-container'>
          <div className='gif-containers'>
            <div className='crackers-gif1'></div>
            <div className='input-container'>
              <div className='customer-container-title'>Customer Information</div>
              <div className='input-container-informations'>
                <span className='input-fonts'>Customer Name:</span>
                <input autoFocus className='customer-inputbox-name' type="text" placeholder="Enter Your Name...." value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              </div>
              <div className='input-container-informations'>
                <span className='input-fonts'>Customer Number:</span>
                <input className='customer-inputbox' type="number" placeholder="Enter Your Contact Number...." value={customerNumber} onChange={(e) => setCustomerNumber(e.target.value)} />
              </div>
              <div className='input-container-informations-address'>
                <span className='input-fonts'>Customer Address:</span>
                <input className='customer-inputbox-address' type="text" placeholder=" Enter Your Address...." value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
              </div>
              <div className='input-container-informations-state'>
                <span className='input-fonts'>Customer State:</span>
                <select className='customer-inputbox-state' value={customerState} onChange={(e) => setCustomerState(e.target.value)}>
                  <option value="Choose State">Choose State</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>
            </div>
          </div>

          <div className='list-container'>
   {crackers.length === 0 ? (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      height: '300px' 
    }}>
      <BarLoader 
        color="#ff5722" 
        width={300}     // 👈 Bigger width here
        height={8}
        speedMultiplier={1.5}
      />
      <p style={{
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#444',
        fontFamily: 'Arial'
      }}>
        Loading crackers, please wait...
      </p>
    </div>
  ) : (
    <>
            <table className='table' align='center' style={{ width: '85%' }}>
              <thead>
                <tr className='tablecell' style={{ fontSize: '14px' }}>
                  <th className='tablecell'>Select Items</th>
                  <th className='tablecell'>Cracker Name</th>
                  <th className='tablecell'>Quantity</th>
                  <th className='tablecell'>Original Rate</th>
                  <th className='tablecell'>50% Discount Rate</th>
                </tr>
              </thead>
              <tbody>
                {crackers.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className='tableRow' style={{ fontSize: '14px' }}>
                      <td colSpan="5" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>{category.category}</td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={`${categoryIndex}-${itemIndex}`} className='tableRow'>
                        <td className='tablecell' style={{ textAlign: 'center' }}>
                          <div className='checkbox-input-container'>
                            <input type="checkbox" checked={item.checked || false} onChange={() => handleCheckboxChange(categoryIndex, itemIndex)} />
                          </div>
                        </td>
                        <td className='tablecell' style={{ textAlign: 'left', letterSpacing: '-1.1px' }}>
                          {item.name}<div style={{ marginTop: '15px' }}>{item?.tamilName}</div>
                        </td>
                        <td className='tablecell' style={{ textAlign: 'center' }}>
                          <select className='dropdown-input-container' disabled={!item.checked} value={item.quantity || ''} onChange={e => handleQuantityChange(categoryIndex, itemIndex, parseInt(e.target.value))}>
                            <option value="">Select Quantity</option>
                            {[...Array(101).keys()].map(num => (num === 0 ? null : <option key={num} value={num}>{num}</option>))}
                          </select>
                        </td>
                        <td className='tablecell' style={{ textAlign: 'center', textDecoration: 'line-through' }}>₹{parseFloat(item.originalRate)}</td>
                        <td className='tablecell' style={{ textAlign: 'center' }}>₹{item.quantity ? item.quantity * parseFloat(item.rate) : parseFloat(item.rate)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                <tr>
                  <td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>Total Amount</td>
                  <td className='tablecell' style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>₹{totalRate}</td>
                </tr>
              </tbody>
            </table>
            <div className='button-container'>
              <button className="Place-order" onClick={handleSubmit}>Place Order</button>
            </div>
                </>
  )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;




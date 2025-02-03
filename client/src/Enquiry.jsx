import React, { useState, useEffect } from 'react';
import EnquiryTable from './Enquiry/EnquiryTable';
import axios from 'axios';

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [enquiryData, setEnquiryData] = useState([]); // State to store fetched enquiries
  const [submitted, setSubmitted] = useState(false);

  // Fetch enquiries when the component mounts
  useEffect(() => {
    getAllenqury();
  }, []); // Empty array to run only once on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAllenqury = () => {
    axios
      .get('http://localhost:8000/api/enquiries/view')
      .then((res) => {
        if (res.data.status) {
          // Log fetched data for debugging
          console.log('Fetched Enquiries:', res.data.enquiries);
          setEnquiryData(res.data.enquiries); // Store data in state
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setSubmitted(true);

    axios
      .post('http://localhost:8000/api/enquiries/insert', formData)
      .then((res) => {
        console.log(res.data);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        getAllenqury(); // Refresh the table data after submission
      })
      .catch((error) => {
        console.error('Error submitting enquiry:', error);
      });
  };

  console.log('Enquiry Data:', enquiryData);

  return (
    <div className='grid grid-cols-[30%_70%] h-screen'>
      <div className='p-6 bg-white shadow-md rounded-lg'>
        <h1 className='text-3xl text-center font-bold mb-6'>User Enquiry</h1>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            value={formData.name}
            onChange={handleChange}
            className='p-3 border rounded-md w-full'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            value={formData.email}
            onChange={handleChange}
            className='p-3 border rounded-md w-full'
            required
          />
          <input
            type='text'
            name='subject'
            placeholder='Subject'
            value={formData.subject}
            onChange={handleChange}
            className='p-3 border rounded-md w-full'
            required
          />
          <textarea
            name='message'
            placeholder='Your Message'
            value={formData.message}
            onChange={handleChange}
            className='p-3 border rounded-md w-full h-32'
            required
          ></textarea>
          <button type='submit' className='bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700'>
            Submit
          </button>
        </form>
        {submitted && <p className='text-green-600 text-center mt-4'>Thank you for your enquiry!</p>}
      </div>

      <EnquiryTable data={enquiryData} refreshData={getAllenqury} />
 {/* Pass fetched data to EnquiryTable */}
    </div>
  );
}

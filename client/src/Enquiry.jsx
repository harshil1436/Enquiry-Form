import React, { useState, useEffect } from 'react';
import EnquiryTable from './Enquiry/EnquiryTable';  // Correct relative path
import axios from 'axios';

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    address: ''
  });

  const [enquiryData, setEnquiryData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [editingEnquiryId, setEditingEnquiryId] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('')

  useEffect(() => {
    getAllEnquiries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'phone') {
      if (!/^\d{10}$/.test(value)) {
        setPhoneError('Phone number must be 10 digits');
      } else {
        setPhoneError('');
      }
    }
  };

  // Handle Edit action
  const handleEdit = (enquiry) => {
    // Set up the state with current enquiry data
    setFormData({
      name: enquiry.name,
      email: enquiry.email,
      subject: enquiry.subject,
      message: enquiry.message,
      phone: enquiry.contact?.phone || '',
      address: enquiry.contact?.address || ''
    });

    setEditingEnquiryId(enquiry._id);  // Set editing enquiry ID
  };

  // Handle Edit Form Submission (Update enquiry)
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    
    // Send the updated enquiry data to the backend
    axios.put(`http://localhost:8000/api/enquiries/update/${editingEnquiryId}`, formData)
      .then((res) => {
        getAllEnquiries();  // Refresh the enquiries list after edit
        setUpdateSuccess(true);  // Show success message
        setEditingEnquiryId(null);  // Clear editing state
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          address: ''
        });  // Clear form data
        setTimeout(() => setUpdateSuccess(false), 3000);  // Hide success message after 3 seconds
      })
      .catch((error) => console.error('Error updating enquiry:', error));
  };

  const getAllEnquiries = () => {
    axios.get('http://localhost:8000/api/enquiries/view')
      .then((res) => {
        if (res.data && res.data.enquiries) {
          setEnquiryData(res.data.enquiries);
        } else {
          console.error('Unexpected API response:', res.data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneError) return;

    axios.post('http://localhost:8000/api/enquiries/insert', formData)
      .then((res) => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          address: ''
        });
        setSubmitted(true);
        getAllEnquiries();
      })
      .catch((error) => console.error('Error submitting enquiry:', error));
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-[30%_70%] h-screen">
      <div className="p-4 md:p-6 bg-white shadow-md rounded-lg max-w-md mx-auto md:max-w-full w-full">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-4">User Enquiry</h1>
        
        <form onSubmit={editingEnquiryId ? handleSubmitEdit : handleSubmit} className="grid gap-2 md:gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-md w-full text-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-md w-full text-lg"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="p-3 border rounded-md w-full text-lg"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-3 border rounded-md w-full h-24 md:h-32 text-lg"
            required
          ></textarea>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border rounded-md w-full text-lg"
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 border rounded-md w-full text-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 w-full text-lg"
          >
            {editingEnquiryId ? 'Update Enquiry' : 'Submit'}
          </button>
        </form>
  
        {submitted && !editingEnquiryId && (
          <p className="text-green-600 text-center mt-4">
            Thank you for your enquiry!
          </p>
        )}
        {updateSuccess && (
          <p className="text-green-600 text-center mt-4">
            Enquiry updated successfully!
          </p>
        )}
      </div>
  
      <EnquiryTable      
          data={enquiryData}
          refreshData={getAllEnquiries}
          handleEdit={handleEdit}
      />
    </div>
  );
  
}

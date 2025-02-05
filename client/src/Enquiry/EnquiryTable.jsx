import React, { useState } from 'react';
import axios from 'axios';

const EnquiryTable = ({ data, refreshData, handleEdit }) => {
  const [successMessage, setSuccessMessage] = useState('');

  // Handle delete enquiry
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/enquiries/delete/${id}`)
        .then(() => {
            refreshData();  // Refresh data after delete
            setSuccessMessage('Enquiry deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);  // Clear success message after 3 seconds
        })
        .catch((error) => console.error('Error deleting enquiry:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Enquiries with Contact Data</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-3 mb-4 rounded">
          {successMessage}
        </div>
      )}
      
      {/* Enquiry Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Subject</th>
            <th className="px-4 py-2 text-left">Message</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((enquiry) => (
            <tr key={enquiry._id} className="border-t">
              <td className="px-4 py-2">{enquiry.name}</td>
              <td className="px-4 py-2">{enquiry.email}</td>
              <td className="px-4 py-2">{enquiry.subject}</td>
              <td className="px-4 py-2">{enquiry.message}</td>
              <td className="px-4 py-2">{enquiry.contact ? enquiry.contact.phone : 'N/A'}</td>
              <td className="px-4 py-2">{enquiry.contact ? enquiry.contact.address : 'N/A'}</td>
              <td className="px-4 py-2">
                <button 
                  onClick={() => handleEdit(enquiry)} 
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(enquiry._id)} 
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiryTable;

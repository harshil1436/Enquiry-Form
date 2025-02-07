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
    <div className="container mx-auto p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">Enquiries with Contact Data</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-3 mb-4 rounded text-center">
          {successMessage}
        </div>
      )}
      
      {/* Enquiry Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px] table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm md:text-base">
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
              <tr key={enquiry._id} className="border-t text-sm md:text-base">
                <td className="px-4 py-2 whitespace-nowrap">{enquiry.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{enquiry.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{enquiry.subject}</td>
                <td className="px-4 py-2 whitespace-nowrap truncate max-w-[150px] md:max-w-none">{enquiry.message}</td>
                <td className="px-4 py-2 whitespace-nowrap">{enquiry.contact ? enquiry.contact.phone : 'N/A'}</td>
                <td className="px-4 py-2 whitespace-nowrap">{enquiry.contact ? enquiry.contact.address : 'N/A'}</td>
                <td className="px-4 py-2 whitespace-nowrap flex flex-col md:flex-row gap-2">
                  <button 
                    onClick={() => handleEdit(enquiry)} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-xs md:text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(enquiry._id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs md:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryTable;

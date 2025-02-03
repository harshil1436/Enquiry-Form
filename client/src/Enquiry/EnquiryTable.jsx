import React, { useEffect } from 'react';
import axios from 'axios';

export default function EnquiryTable({ data, refreshData }) {
  // Handle Delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      axios.delete(`http://localhost:8000/api/enquiries/delete/${id}`)
        .then((res) => {
          alert("Enquiry deleted successfully!");
          refreshData(); // Refresh the table after deletion
        })
        .catch((error) => {
          console.error('Error deleting enquiry:', error);
          alert("Error deleting enquiry.");
        });
    }
  };

  // Handle Update action
  const handleUpdate = (item) => {
    // Ask for updated values
    const updatedName = prompt("Enter new name:", item.name);
    const updatedEmail = prompt("Enter new email:", item.email);
    const updatedSubject = prompt("Enter new subject:", item.subject);
    const updatedMessage = prompt("Enter new message:", item.message);

    // If user cancels any prompt, return
    if (!updatedName || !updatedEmail || !updatedSubject || !updatedMessage) return;

    // Send update request
    axios.put(`http://localhost:8000/api/enquiries/update/${item._id}`, {
      name: updatedName,
      email: updatedEmail,
      subject: updatedSubject,
      message: updatedMessage
    })
    .then((res) => {
      alert("Enquiry updated successfully!");
      refreshData(); // Refresh the table after updating
    })
    .catch((error) => {
      console.error('Error updating enquiry:', error);
      alert("Error updating enquiry.");
    });
  };

  // Debugging: Log received data
  useEffect(() => {
    console.log('Data received in EnquiryTable:', data);
  }, [data]);

  return (
    <div className='p-6 bg-gray-100'>
      <h2 className='text-2xl font-bold mb-4'>Enquiries Table</h2>
      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border border-gray-300 p-2'>Name</th>
            <th className='border border-gray-300 p-2'>Email</th>
            <th className='border border-gray-300 p-2'>Subject</th>
            <th className='border border-gray-300 p-2'>Message</th>
            <th className='border border-gray-300 p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
                <td className='border border-gray-300 p-2'>{item.name}</td>
                <td className='border border-gray-300 p-2'>{item.email}</td>
                <td className='border border-gray-300 p-2'>{item.subject}</td>
                <td className='border border-gray-300 p-2'>{item.message}</td>
                <td className='border border-gray-300 p-2'>
                  <button 
                    className='bg-yellow-500 text-white px-2 py-1 rounded mr-2' 
                    onClick={() => handleUpdate(item)}
                  >
                    Update
                  </button>
                  <button 
                    className='bg-red-500 text-white px-2 py-1 rounded' 
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='border border-gray-300 p-2 text-center'>
                No enquiries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

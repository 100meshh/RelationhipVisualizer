import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create } from '../actions/users';

function CreateUserForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(create(formData));
    clear();
  }

  const clear = () => {
    setFormData({ name: '' });
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold mb-6 text-gray-800">
        Add New Users
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter username"
              type='text'
              name='Name'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="sm:w-auto">
            <button
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              type="submit"
            >
              Add User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateUserForm;

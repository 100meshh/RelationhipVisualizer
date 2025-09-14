import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../actions/users';
import { createRelations, getAllRelations } from '../actions/relations';

const CreateRelation = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.users);

  const relations = ['Mother', 'Father', 'Husband', 'wife', 'Daughter', 'Son', 'Friend', 'Brother', 'Sister', 'Grand Father', 'Grand Mother']

  // Refs for form controls
  const user1SelectRef = useRef(null);
  const user2SelectRef = useRef(null);
  const relationSelectRef = useRef(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Debug logging
  useEffect(() => {
    console.log('Users data in CreateRelation:', usersData);
  }, [usersData]);

  const [formData, setFormData] = useState({
    user1Id: '', userName1: '', relationType: '', user2Id: '', userName2: ''
  });

  const handleChange = (e) => {
    let key = e.target.value;
    if (e.target.name === "user1" && key !== "DEFAULT") {
      let userIndex = parseInt(key);
      let userName = usersData[userIndex]?.name;
      let userId = usersData[userIndex]?._id;

      setFormData({
        ...formData,
        userName1: userName,
        user1Id: userId
      })
    }
    else if (e.target.name === "user2" && key !== "DEFAULT") {
      let userIndex = parseInt(key);
      let userName = usersData[userIndex]?.name;
      let userId = usersData[userIndex]?._id;

      setFormData({
        ...formData,
        userName2: userName,
        user2Id: userId
      })
    }
    else if (e.target.name === "relationType" && key !== "DEFAULT") {
      setFormData({
        ...formData,
        relationType: e.target.value
      })
    }
  }

  const clearForm = () => {
    setFormData({
      user1Id: '', userName1: '', relationType: '', user2Id: '', userName2: ''
    });

    // Reset select values
    if (user1SelectRef.current) user1SelectRef.current.value = 'DEFAULT';
    if (user2SelectRef.current) user2SelectRef.current.value = 'DEFAULT';
    if (relationSelectRef.current) relationSelectRef.current.value = 'DEFAULT';
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.user1Id || !formData.user2Id || !formData.relationType) {
      alert('Please select both users and a relation type');
      return;
    }

    if (formData.user1Id === formData.user2Id) {
      alert('Please select different users for the relation');
      return;
    }

    // Format data for backend API
    const relationData = {
      from: formData.user1Id,
      to: formData.user2Id,
      relation: formData.relationType
    };

    console.log('Submitting relation:', relationData);
    console.log('Users data:', usersData);

    dispatch(createRelations(relationData)).then(() => {
      // Refresh the relations list after creating a new relation
      dispatch(getAllRelations());
    });
    clearForm();
  }

  // Show loading state if users are not loaded yet
  if (!usersData || usersData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-6 text-gray-800">
          Add New Relations
        </h4>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold mb-6 text-gray-800">
        Add New Relations
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">User 1</label>
              <select
                ref={user1SelectRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="user1"
                onChange={handleChange}
                required
              >
                <option value="DEFAULT" name="default">Select User 1</option>
                {usersData.map((user, key) =>
                  <option key={key} value={key}>{user.name}</option>
                )}
              </select>
            </div>
            <div className="flex items-center justify-center text-gray-500 font-bold text-xl">
              -
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
              <select
                ref={relationSelectRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="relationType"
                onChange={handleChange}
                required
              >
                <option value="DEFAULT" name="default">Select Relation</option>
                {relations.map((relation, key) => {
                  return (
                    <option value={relation} key={key}> {relation} </option>
                  )
                })}
              </select>
            </div>
            <div className="flex items-center justify-center text-gray-500 font-bold text-xl">
              -
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">User 2</label>
              <select
                ref={user2SelectRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="user2"
                onChange={handleChange}
                required
              >
                <option value="DEFAULT" name="default">Select User 2</option>
                {usersData.map((user, key) =>
                  <option key={key} value={key} >{user.name}</option>
                )}
              </select>
            </div>
            <div className="flex items-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                type="submit"
              >
                Add Relation
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User 1</label>
              <select
                ref={user1SelectRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="user1"
                onChange={handleChange}
                required
              >
                <option value="DEFAULT" name="default">Select User 1</option>
                {usersData.map((user, key) =>
                  <option key={key} value={key}>{user.name}</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
              <select
                ref={relationSelectRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="relationType"
                onChange={handleChange}
                required
              >
                <option value="DEFAULT" name="default">Select Relation</option>
                {relations.map((relation, key) => {
                  return (
                    <option value={relation} key={key}> {relation} </option>
                  )
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User 2</label>
              <select
                ref={user2SelectRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="user2"
                onChange={handleChange}
                required
              >
                <option value="DEFAULT" name="default">Select User 2</option>
                {usersData.map((user, key) =>
                  <option key={key} value={key} >{user.name}</option>
                )}
              </select>
            </div>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              type="submit"
            >
              Add Relation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateRelation;

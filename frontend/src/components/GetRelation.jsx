import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../actions/users';
import { getRelation } from '../actions/relations';

function GetRelation() {
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.users);
  const [selectUser, setSelectUser] = useState({
    user1Id: '', userName1: '', user2Id: '', userName2: ''
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for relation:', selectUser);
    dispatch(getRelation(selectUser));
  }

  const handleChange = (e) => {
    let key = e.target.value;
    let userName = usersData[key]?.name;
    let userId = usersData[key]?._id;

    if (e.target.name !== "default" && e.target.name === "user1") {
      setSelectUser({
        ...selectUser,
        userName1: userName,
        user1Id: userId
      })
    }
    else if (e.target.name !== "default" && e.target.name === "user2") {
      setSelectUser({
        ...selectUser,
        userName2: userName,
        user2Id: userId
      })
    }
    else {
      // TODO
    }
  }

  // Show loading state if users are not loaded yet
  if (!usersData || usersData.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Find Relationship Path</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">User 1</label>
            <select
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
          <div className="flex items-end justify-center text-gray-500 font-bold text-xl">
            -
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">User 2</label>
            <select
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              type="submit"
            >
              Search Path
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default GetRelation;

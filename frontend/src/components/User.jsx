import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../actions/users';
import ShowUser from './ShowUser';
import CreateUserForm from './CreateUserForm';

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <CreateUserForm />
        <ShowUser />
      </div>
    </div>
  );
};

export default User;

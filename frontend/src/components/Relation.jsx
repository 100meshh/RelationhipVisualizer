import React, { useEffect } from 'react';
import CreateRelation from './CreateRelation';
import ShowAllRelations from './ShowAllRelations';
import { useDispatch } from 'react-redux';
import { getAllRelations } from '../actions/relations';

function Relation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRelations());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <CreateRelation />
        <ShowAllRelations />
      </div>
    </div>
  );
}

export default Relation;

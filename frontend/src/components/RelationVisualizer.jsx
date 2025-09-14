import React from 'react';
import GetRelation from './GetRelation';
import ShowRelation from './ShowRelation';

const RelationVisualizer = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <div className="flex items-center justify-center flex-col w-full">
        <GetRelation />
        <ShowRelation />
      </div>
    </div>
  );
}

export default RelationVisualizer;

import React from 'react';
import { useSelector } from 'react-redux';

const ShowRelation = () => {
  const relationGraphs = useSelector(state => state.relationVis);

  return (
    <div>
      {!relationGraphs || relationGraphs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">No users selected</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {relationGraphs.map((relationGraph, key) => (
            <div key={key} className="text-lg text-green-600">
              {key <= 4 ? ( // Show top 5 paths as per original
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">→</span>
                  <span className="font-bold">({relationGraph.length - 1})</span>
                  <span className="mx-2">
                    {relationGraph.map((user, userKey) => (
                      <span key={userKey}>
                        {userKey === 0 || userKey + 1 === relationGraph.length ? (
                          <strong className="font-bold">{user}</strong>
                        ) : (
                          user
                        )}
                        {userKey + 1 < relationGraph.length && (
                          <span className="mx-1">→</span>
                        )}
                      </span>
                    ))}
                  </span>
                </div>
              ) : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowRelation;

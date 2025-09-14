import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRelation } from '../actions/relations';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <span className="ml-2 text-gray-600">Loading relations...</span>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex items-center">
      <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <span className="text-red-700">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Retry
        </button>
      )}
    </div>
  </div>
);

const ShowAllRelations = () => {
  const dispatch = useDispatch();
  const relationsData = useSelector(state => state.relations);
  const [deletingId, setDeletingId] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log('Relations data:', relationsData);
  }, [relationsData]);

  const handleDelete = async (relationId) => {
    setDeletingId(relationId);
    try {
      await dispatch(deleteRelation(relationId));
    } catch (error) {
      console.error('Error deleting relation:', error);
    } finally {
      setDeletingId(null);
    }
  };

  // Check if relationsData is loading (assuming it's null/undefined when loading)
  if (relationsData === null || relationsData === undefined) {
    return <LoadingSpinner />;
  }

  // Check if there's an error (assuming error state)
  if (relationsData.error) {
    return <ErrorMessage message="Failed to load relations" onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Relations List</h3>
      {!relationsData.length ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <p className="text-lg text-gray-500">No relations added yet</p>
          <p className="text-sm text-gray-400 mt-1">Create relationships between users using the form above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {relationsData.map((relation, key) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="font-medium text-gray-900 truncate">{relation.from?.name || 'Unknown User'}</span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                    {relation.relation}
                  </span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-900 truncate">{relation.to?.name || 'Unknown User'}</span>
                </div>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                onClick={() => handleDelete(relation._id)}
                disabled={deletingId === relation._id}
              >
                {deletingId === relation._id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAllRelations;

import React from 'react';

const InlineError = ({ error }) => {
  return (
    <div className="text-subMain w-full mt-2 text-xs font-medium">
      <p>{error}</p>
    </div>
  );
};

export default InlineError;

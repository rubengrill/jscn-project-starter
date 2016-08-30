import React from 'react';


export const Candidate = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
});

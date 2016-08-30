import React from 'react';

import { Candidate } from '../models';


const VotingSummary = React.createClass({

  propTypes: {
    candidates: React.PropTypes.arrayOf(Candidate).isRequired,
    candidateScores: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <div>
        {this.props.candidates.map((candidate, index) => (
            <div key={index}>{candidate.name} {this.props.candidateScores[candidate.id]}</div>
        ))}
      </div>
    );
  },

});

export default VotingSummary;

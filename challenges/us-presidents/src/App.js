import React from 'react';
import { Provider } from 'react-redux';
import SampleClassComponent from './components/SampleClassComponent';
import logo from './logo.svg';
import settings from './settings';
import fetch from './fetch';
import VotingSummary from './components/VotingSummary';
import './App.css';

const App = React.createClass({

  getInitialState() {
    return {
      candidates: [],
      candidateScores: {},
    };
  },

  componentDidMount() {
    this.loadSummary();
  },

  loadSummary() {
    fetch(`${settings.api_base}/summary`)
      .then(res => res.json())
      .then(summary => {
        this.setState({
          candidates: summary.candidates,
          candidateScores: summary.candidateScores,
        });
      });
  },

  vote(candidateId) {
    fetch(`${settings.api_base}/votes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidateId }),
    })
      .then(() => this.loadSummary())
      .catch(() => console.log('Vote failed'));
  },

  render() {
    return (
      <div className="App">
        <VotingSummary candidates={this.state.candidates} candidateScores={this.state.candidateScores} />

        {this.state.candidates.map((candidate, index) => (
            <div key={index}>
              <button onClick={() => this.vote(candidate.id)}>Vote for {candidate.name}</button>
            </div>
        ))}
      </div>
    );
  },

});

export default App;

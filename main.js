import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { QRCodeSVG } from 'qrcode.react';

// This would be your actual hosting URL in production
const HOSTING_URL = 'https://your-deployment-url.com/game';

// Presenter view component
const PresenterView = () => {
  const [results, setResults] = useState({
    round1: { safe: 0, risky: 0 },
    round2: { safe: 0, risky: 0, totalEligible: 0 },
    round3: { safe: 0, risky: 0, totalEligible: 0 }
  });
  const [currentRound, setCurrentRound] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const startNextRound = () => {
    setCurrentRound(prev => prev + 1);
    setShowResults(false);
  };

  const endRound = () => {
    setShowResults(true);
  };

  const chartData = [
    {
      name: 'Round 1 (Baseline)',
      'Safe Choice %': (results.round1.safe / (results.round1.safe + results.round1.risky) * 100) || 0,
      'Risky Choice %': (results.round1.risky / (results.round1.safe + results.round1.risky) * 100) || 0,
    },
    {
      name: 'Round 2 (Winners)',
      'Safe Choice %': (results.round2.safe / results.round2.totalEligible * 100) || 0,
      'Risky Choice %': (results.round2.risky / results.round2.totalEligible * 100) || 0,
    },
    {
      name: 'Round 3 (Losers)',
      'Safe Choice %': (results.round3.safe / results.round3.totalEligible * 100) || 0,
      'Risky Choice %': (results.round3.risky / results.round3.totalEligible * 100) || 0,
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Presenter Controls</h2>
          
          <div className="p-4 border rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-4">QR Code for Participants</h3>
            <QRCodeSVG value={HOSTING_URL} size={200} />
            <p className="mt-2 text-sm text-gray-600">Scan to participate</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={startNextRound}
              disabled={currentRound >= 3}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Start Round {currentRound + 1}
            </button>
            
            <button
              onClick={endRound}
              disabled={currentRound === 0}
              className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              End Current Round
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {showResults ? (
            <>
              <h2 className="text-2xl font-bold">Results</h2>
              <div className="w-full h-96">
                <BarChart width={500} height={300} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Safe Choice %" fill="#4CAF50" />
                  <Bar dataKey="Risky Choice %" fill="#2196F3" />
                </BarChart>
              </div>
            </>
          ) : (
            <div className="p-6 border rounded-lg bg-white">
              <h3 className="text-xl font-semibold mb-4">
                Current Round: {currentRound === 0 ? 'Not Started' : currentRound}
              </h3>
              <div className="space-y-2">
                <p>Total Responses: {results[`round${currentRound}`]?.safe + results[`round${currentRound}`]?.risky || 0}</p>
                <p>Safe Choices: {results[`round${currentRound}`]?.safe || 0}</p>
                <p>Risky Choices: {results[`round${currentRound}`]?.risky || 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Participant view component
const ParticipantView = () => {
  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState(null);
  const [eligible, setEligible] = useState(true);

  const options = {
    1: {
      safe: 'Keep 100 points',
      risky: '50/50 chance: +100 or -50 points'
    },
    2: {
      safe: 'Keep current points',
      risky: '50/50 chance: +200 or -150 points'
    },
    3: {
      safe: '+50 points',
      risky: '50/50 chance: +100 or -50 points'
    }
  };

  if (!eligible) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl">Thanks for participating! Waiting for next eligible round...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Round {round}: {round === 1 ? 'Baseline' : round === 2 ? 'After Gains' : 'After Losses'}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setChoice('safe')}
          disabled={!!choice}
          className="p-4 text-lg rounded-lg border-2 hover:bg-gray-50"
        >
          {options[round]?.safe}
        </button>
        
        <button
          onClick={() => setChoice('risky')}
          disabled={!!choice}
          className="p-4 text-lg rounded-lg border-2 hover:bg-gray-50"
        >
          {options[round]?.risky}
        </button>
      </div>

      {choice && (
        <p className="text-center text-green-600">
          Choice recorded! Please wait for the next round...
        </p>
      )}
    </div>
  );
};

export default PresenterView;
export { ParticipantView };
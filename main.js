const { useState } = React;

export const RiskGame = () => {
    const [page, setPage] = useState('choice');

    const takeRisk = () => {
        const won = Math.random() < 0.5;
        setPage(won ? 'win' : 'lose');
    };

    if (page === 'safe') {
        return React.createElement('div', { className: 'max-w-md mx-auto p-6 text-center space-y-6' },
            React.createElement('h1', { className: 'text-2xl font-bold' }, 'Your Result'),
            React.createElement('div', { className: 'p-6 border rounded-lg bg-white space-y-4' },
                React.createElement('p', { className: 'text-xl' }, 'You kept your 100 points!'),
                React.createElement('p', null, 'You played it safe and kept your initial balance.')
            )
        );
    }

    if (page === 'win') {
        return React.createElement('div', { className: 'max-w-md mx-auto p-6 text-center space-y-6' },
            React.createElement('h1', { className: 'text-2xl font-bold' }, 'Your Result'),
            React.createElement('div', { className: 'p-6 border rounded-lg bg-green-50 space-y-4' },
                React.createElement('p', { className: 'text-xl font-bold text-green-600' }, 'You Won!'),
                React.createElement('p', { className: 'text-green-600' }, 'New balance: 200 points'),
                React.createElement('p', null, 'You took a risk and it paid off.')
            )
        );
    }

    if (page === 'lose') {
        return React.createElement('div', { className: 'max-w-md mx-auto p-6 text-center space-y-6' },
            React.createElement('h1', { className: 'text-2xl font-bold' }, 'Your Result'),
            React.createElement('div', { className: 'p-6 border rounded-lg bg-red-50 space-y-4' },
                React.createElement('p', { className: 'text-xl font-bold text-red-600' }, 'You Lost!'),
                React.createElement('p', { className: 'text-red-600' }, 'New balance: 50 points'),
                React.createElement('p', null, 'You took a risk and it didn\'t work out this time.')
            )
        );
    }

    return React.createElement('div', { className: 'max-w-md mx-auto p-6 text-center space-y-6' },
        React.createElement('h1', { className: 'text-2xl font-bold' }, 'Risk Game'),
        React.createElement('div', { className: 'space-y-6' },
            React.createElement('p', { className: 'text-lg' }, 'You have 100 points. Choose:'),
            React.createElement('div', { className: 'space-y-4' },
                React.createElement('button', {
                    onClick: () => setPage('safe'),
                    className: 'w-full p-4 text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-600'
                }, 'Play it Safe (Keep 100 points)'),
                React.createElement('button', {
                    onClick: takeRisk,
                    className: 'w-full p-4 text-lg rounded-lg bg-red-500 text-white hover:bg-red-600'
                }, 'Take a Risk (50/50 chance: +100 or -50)')
            )
        )
    );
};
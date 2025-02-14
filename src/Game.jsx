import React, { useState, useEffect } from 'react';

function Game({ title }) {
    const [targetNumber, setTargetNumber] = useState(null);
    const [currentGuess, setCurrentGuess] = useState('');
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [message, setMessage] = useState('');
    const [gameWon, setGameWon] = useState(false);
    const [gameLost, setGameLost] = useState(false);

    // Function to generate a random number
    const generateNumber = () => Math.floor(Math.random() * 100) + 1;

    // Start or restart the game
    const startNewGame = () => {
        setTargetNumber(generateNumber());
        setAttemptsLeft(3);
        setCurrentGuess('');
        setGameWon(false);
        setGameLost(false);
        setMessage("A new number has been generated. Good luck!");
    };

    // Initialize game
    useEffect(() => {
        startNewGame();
    }, []);

    // Handle input change
    const handleGuessChange = (event) => {
        setCurrentGuess(event.target.value);
    };

    // Handle Guess submission
    const handleGuessSubmit = () => {
        if (gameWon || gameLost) return;

        const guess = parseInt(currentGuess, 10);
        if (isNaN(guess)) {
            setMessage("Please enter a valid number.");
            return;
        }

        if (guess === targetNumber) {
            setMessage(`🎉 Congratulations! You guessed the number ${targetNumber}!`);
            setGameWon(true);
        } else {
            setAttemptsLeft((prevAttempts) => {
                const newAttemptsLeft = prevAttempts - 1;

                if (newAttemptsLeft === 0) {
                    setMessage(`💀 Game Over! The correct number was ${targetNumber}.`);
                    setGameLost(true);
                } else {
                    setMessage(guess < targetNumber ? "Too low! Try again." : "Too high! Try again.");
                }

                return newAttemptsLeft;
            });
        }

        setCurrentGuess("");
    };

    return (
        <div className="game-area">
            <header className="game-header">
                <h1 className="game-header-title">{title}</h1>
                <button onClick={startNewGame}>New Game</button>
            </header>

            <section className="game-body">
                <h2>{message}</h2>
                <p>Attempts left: {attemptsLeft}</p>

                {!gameWon && !gameLost && (
                    <div>
                        <input
                            type="number"
                            value={currentGuess}
                            onChange={handleGuessChange}
                            placeholder="Enter your guess"
                        />
                        <button onClick={handleGuessSubmit}>Submit</button>
                    </div>
                )}

                {gameWon && <p>🎉 You win! Click "New Game" to play again.</p>}
                {gameLost && <p>💀 Try again! Click "New Game" to restart.</p>}
            </section>
        </div>
    );
}

export default Game;

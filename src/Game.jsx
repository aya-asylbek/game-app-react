import React from 'react';

function Game(props) {
   // const [inputValue, setInputValue] = useState(0);
    return (
        <div className="game-area">
            <header className="game-header">
                <h2 className="game-header-title">{props.title}</h2>
                <button>New Game</button>
            </header>

            <section className="game-body">
                <h2 className="u-center">
                    {`A new number has been generated`} <br />{`10 trials remaining`}{" "}
                    <br /> {`Good luck!`}
                </h2>
                              {/* <input type="text" value={inputValue} onChange={handleChange} /> */}
               


            </section>






        </div>
    );
}

export default Game;

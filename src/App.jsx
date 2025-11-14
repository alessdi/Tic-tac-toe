import { useState } from 'react';
import batmanImg from './assets/batman.png';
import jokerImg from './assets/joker.png';

// ---- Componente Square ----
function Square({ value, onSquareClick, theme, isWinning, pieceSet }) {
  // value puede ser 'X', 'O', '🦇', '🤡' o null
  let content = null;

  if (pieceSet === 'imagenes') {
    if (value === 'X') {
      content = (
        <div className="piece-img-wrapper">
          <img src={batmanImg} alt="Ficha 1" />
        </div>
      );
    } else if (value === 'O') {
      content = (
        <div className="piece-img-wrapper">
          <img src={jokerImg} alt="Ficha 2" />
        </div>
      );
    }
  } else {
    content = value;
  }

  return (
    <button
      className={`square square-${theme} ${isWinning ? 'square-winning' : ''}`}
      onClick={onSquareClick}
    >
      <span className="square-value">{content}</span>
    </button>
  );
}

// ---- calculateWinner: devuelve ganador + línea ----
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// ---- Componente Board (3x3) ----
function Board({ xIsNext, squares, onPlay, theme, pieceSet }) {
  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : [];

  function handleClick(i) {
    if (winner || squares[i]) return;

    const nextSquares = squares.slice();

    if (pieceSet === 'normal') {
      nextSquares[i] = xIsNext ? 'X' : 'O';
    } else if (pieceSet === 'batman') {
      nextSquares[i] = xIsNext ? '🦇' : '🤡';
    } else if (pieceSet === 'imagenes') {
      // guardamos X / O, pero se verán como imágenes en Square
      nextSquares[i] = xIsNext ? 'X' : 'O';
    }

    onPlay(nextSquares);
  }

  function getPlayerLabel(isXTurn) {
    if (pieceSet === 'normal') return isXTurn ? 'X' : 'O';
    if (pieceSet === 'batman') return isXTurn ? '🦇' : '🤡';
    if (pieceSet === 'imagenes') return isXTurn ? 'X' : 'O';
  }

  // Contenido visual del ganador (imagen pequeña o texto)
  function getWinnerContent() {
    if (!winner) return null;
    if (pieceSet === 'imagenes') {
      const src = winner === 'X' ? batmanImg : jokerImg;
      return (
        <div className="winner-img-wrapper">
          <img src={src} alt="Ficha ganadora" />
        </div>
      );
    }
    return winner;
  }

  let status;
  if (winner) {
    status = 'Ganador: ' + winner;
  } else if (!squares.includes(null)) {
    status = 'Empate 😮';
  } else {
    status = 'Siguiente jugador: ' + getPlayerLabel(xIsNext);
  }

  return (
    <>
      <div className={`status status-${theme}`}>{status}</div>

      {winner && (
        <div className={`winner-banner winner-banner-${theme}`}>
          <span className="winner-icon">{getWinnerContent()}</span>
          <span>¡Ganó la ficha {winner}!</span>
        </div>
      )}

      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          theme={theme}
          isWinning={winningLine.includes(0)}
          pieceSet={pieceSet}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          theme={theme}
          isWinning={winningLine.includes(1)}
          pieceSet={pieceSet}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          theme={theme}
          isWinning={winningLine.includes(2)}
          pieceSet={pieceSet}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          theme={theme}
          isWinning={winningLine.includes(3)}
          pieceSet={pieceSet}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          theme={theme}
          isWinning={winningLine.includes(4)}
          pieceSet={pieceSet}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          theme={theme}
          isWinning={winningLine.includes(5)}
          pieceSet={pieceSet}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          theme={theme}
          isWinning={winningLine.includes(6)}
          pieceSet={pieceSet}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          theme={theme}
          isWinning={winningLine.includes(7)}
          pieceSet={pieceSet}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          theme={theme}
          isWinning={winningLine.includes(8)}
          pieceSet={pieceSet}
        />
      </div>
    </>
  );
}

// ---- Componente Game ----
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const [theme, setTheme] = useState('medianoche'); // medianoche | claro | batman
  const [pieceSet, setPieceSet] = useState('normal'); // normal | batman | imagenes
  const [boardVisualSize, setBoardVisualSize] = useState('mediano'); // pequeño | mediano | grande

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function toggleBoardSize() {
    setBoardVisualSize((prev) => {
      if (prev === 'pequeño') return 'mediano';
      if (prev === 'mediano') return 'grande';
      return 'pequeño';
    });
  }

  const moves = history.map((squares, move) => {
    const description =
      move > 0 ? 'Ir al movimiento #' + move : 'Ir al inicio del juego';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Easter egg
  const [titleClicks, setTitleClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  function handleTitleClick() {
    const newCount = titleClicks + 1;
    setTitleClicks(newCount);
    if (newCount >= 3) {
      setShowEasterEgg(true);
      setTimeout(() => {
        setShowEasterEgg(false);
        setTitleClicks(0);
      }, 2500);
    }
  }

  return (
    <div className={`game game-${theme}`}>
      <header className="game-header">
        <h1 className="game-title" onClick={handleTitleClick}>
          Tic Tac Toe
        </h1>

        {showEasterEgg && (
          <div className="easter-egg">
            <div className="bat-animation">🦇</div>
            <p>Alessandro Novelo 67423</p>
          </div>
        )}
      </header>

      <div className="game-body">
        {/* Izquierda: tablero grande */}
        <div className={`game-board board-${boardVisualSize}`}>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            theme={theme}
            pieceSet={pieceSet}
          />
        </div>

        {/* Derecha: opciones + historial */}
        <aside className="sidebar">
          <section className={`options-panel options-${theme}`}>
            <h2>Opciones</h2>

            <div className="control-group">
              <label htmlFor="theme-select">Tema:</label>
              <select
                id="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="medianoche">Medianoche</option>
                <option value="claro">Claro</option>
                <option value="batman">Batman</option>
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="piece-select">¿Qué fichas deseas usar?</label>
              <select
                id="piece-select"
                value={pieceSet}
                onChange={(e) => {
                  setPieceSet(e.target.value);
                  handleReset();
                }}
              >
                <option value="normal">Normales (X / O)</option>
                <option value="batman">Batman (🦇 / 🤡)</option>
                <option value="imagenes">Imágenes (batman/joker)</option>
              </select>
            </div>

            <div className="control-group">
              <label>Tamaño del tablero:</label>
              <button onClick={toggleBoardSize}>
                {boardVisualSize === 'pequeño'
                  ? 'Tablero pequeño'
                  : boardVisualSize === 'mediano'
                  ? 'Tablero mediano'
                  : 'Tablero grande'}
              </button>
            </div>

            <div className="control-group">
              <label>Reiniciar juego:</label>
              <button onClick={handleReset}>Reiniciar</button>
            </div>
          </section>

          <section className={`game-info game-info-${theme}`}>
            <h2>Historial</h2>
            <ol>{moves}</ol>
          </section>
        </aside>
      </div>
    </div>
  );
}

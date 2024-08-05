import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Stopwatch from "./Stopwatch";
import "./App.css";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";

function initGrid(puzzle) {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      grid[i][j] = 0;
    }
  }

  for (let i = 0; i < puzzle.length; i++) {
    let row = Math.floor(i / 9);
    let col = i % 9;
    if (puzzle[i] !== null) {
      // npm sudoku package uses 0-8 instead of 1-9 which is fucking stupid

      grid[row][col] = parseInt(puzzle[i]) || 9;
    } else {
      grid[row][col] = 0;
    }
  }

  return grid;
}

function solutionGrid(solution) {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      grid[i][j] = 0;
    }
  }

  for (let i = 0; i < solution.length; i++) {
    let row = Math.floor(i / 9);
    let col = i % 9;

    if (solution[i] !== null) {
      grid[row][col] = parseInt(solution[i]) || 9;
    } else {
      grid[row][col] = 0;
    }
  }

  return grid;
}

function handleChanges(e, grid, setGrid) {}



function SudokuGrid({ puzzle, solution, onPuzzleSolved }) {
  const [grid, setGrid] = useState(initGrid(puzzle));
  const [solGrid, setSolGrid] = useState(solutionGrid(solution));

  const [selectedNum, setSelectedNum] = useState(0);



  let solvedGrid = solutionGrid(solution);

  console.log("puzzle in grid: ", grid);

  const handleInputChange = (e, rowIndex, colIndex) => {
    const inputValue = parseInt(e.target.value);

    if (!isNaN(inputValue)) {
      // Clone the current grid to avoid mutating the state directly
      const newGrid = grid.map((row) => [...row]);

      // Update the corresponding cell in the grid with the input value
      if (inputValue !== solvedGrid[rowIndex][colIndex] && inputValue !== 0) {
        // Reset the cell to 0 if the value is incorrect
        newGrid[rowIndex][colIndex] = -1;
      } else {
        newGrid[rowIndex][colIndex] = inputValue;
      }
      // Update the state with the new grid
      setGrid(newGrid);
    } else if (e.target.value === "") {
      const newGrid = grid.map((row) => [...row]);
      newGrid[rowIndex][colIndex] = 0;
      setGrid(newGrid);
    }
  };

  useEffect(() => {
    if (JSON.stringify(grid) === JSON.stringify(solGrid)) {
      onPuzzleSolved(true);
      console.log("puzzle is solved");
      let num = 1;
      const intervalId = setInterval(() => {
        setSelectedNum(num);
        num++;
        
        if (num > 9) {
          clearInterval(intervalId);
        }
      }, 700);
      setSelectedNum(0);
    }
  }, [grid, solGrid]);

  useEffect(() => {
    const newGrid = initGrid(puzzle);
    const newSol = solutionGrid(solution);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setGrid(newGrid);
    setSolGrid(newSol);
  }, [puzzle, solution]);

  return (
    <div> 
      <div className=" sudgrid flex justify-center mt-10">
        <div className="wrapper">
          <div className="field grid grid-rows-9 content-center ">
            {grid.map((row, rowIndex) => (
              <div
                className=" srow grid grid-cols-9 content-center "
                key={rowIndex}
              >
                {row.map((number, colIndex) => (
                  <input
                    className={`something transition duration-300 ease-in-out ${
                      number === selectedNum && number !== 0
                        ? "selected-num"
                        : ""
                    } focus:outline-none  focus:ring-purple-600 ${
                      number !== 0 ? "read-only" : "writeable"
                    } ${
                      number !== solGrid[rowIndex][colIndex] && number !== 0
                        ? "wrong-number"
                        : ""
                    } `}
                    key={colIndex}
                    type="text"
                    placeholder={number === 0 || number === -1 ? "" : number}
                    readOnly={number === solGrid[rowIndex][colIndex]}
                    maxLength="1"
                    onClick={(e) => {
                      setSelectedNum(number);
                    }}
                    onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                    onKeyDown={(e) => {
                      // Allow only digits from 1 to 9 and prevent 0
                      if (
                        !(
                          (e.key >= "1" && e.key <= "9") ||
                          e.key === "Backspace"
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                  ></input>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [puzzle, setPuzzle] = useState(makepuzzle());
  const [solution, setSolution] = useState(solvepuzzle(puzzle));

  const [reset, setReset] = useState(false)
  const [stoppage, setStoppage] = useState(false)

  const handleNewPuzzle = () => {
    const newPuzzle = makepuzzle();
    const newSolution = solvepuzzle(newPuzzle);

    setPuzzle(newPuzzle);
    setSolution(newSolution); // Update the solution state with the new solution
    setReset(true);
    setTimeout(() => setReset(false), 0); // Ensures the timer is reset correctly
    setStoppage(false)

    const inputElements = document.querySelectorAll(".writeable");
    inputElements.forEach((input) => {
      input.value = "";
    });
  };

  const handleSolvePuzzle = () => {
    
    setPuzzle(solution);
    setStoppage(true)
  };
  const handlePuzzleSolved = () => {
    setStoppage(true);
  };
  console.log("Puzzle: ", puzzle);

  return (
    <div>
      
      <div>
        <h1 className="text-4xl text-center mt-10">Sudoku </h1>
      </div>
      <div className="flex flex-row  justify-evenly items-center">
      <SudokuGrid solution={solution} puzzle={puzzle} onPuzzleSolved={handlePuzzleSolved} />
        <div className="flex flex-col justify-evenly -ml-15">
        <Stopwatch resetTimer={reset} stopTimer={stoppage}/>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNewPuzzle}
          >
            Generate New Puzzle
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={handleSolvePuzzle}
          >
            Solve Puzzle
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

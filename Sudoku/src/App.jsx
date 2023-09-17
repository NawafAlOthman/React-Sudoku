import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";

let puzzle = makepuzzle();
let solution = solvepuzzle(puzzle);

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

function SudokuGrid() {
  const [grid, setGrid] = useState(initGrid(puzzle));

  const [selectedNum, setSelectedNum] = useState(0);

  let solvedGrid = solutionGrid(solution);
  console.log("Solution: ", solvedGrid);

  const handleInputChange = (e, rowIndex, colIndex) => {
    const inputValue = parseInt(e.target.value);

    if (!isNaN(inputValue)) {
      // Clone the current grid to avoid mutating the state directly
      const newGrid = grid.map((row) => [...row]);

      // Update the corresponding cell in the grid with the input value
      if (inputValue === solvedGrid[rowIndex][colIndex]) {
        newGrid[rowIndex][colIndex] = inputValue;

        // Update the state with the new grid
        setGrid(newGrid);
      }
    }
  };

  useEffect(() => {
    const newGrid = initGrid(puzzle);
    const solGrid = solutionGrid(solution);
    setGrid(newGrid);
  }, [puzzle]);

  return (
    <div>
      <div className=" flex justify-center mt-10">
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
                    } `}
                    key={colIndex}
                    type="text"
                    placeholder={number === 0 ? "" : number}
                    readOnly={number !== 0}
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
  return (
    <div>
      <div>
        <h1 className="text-4xl text-center mt-10">Sudoku </h1>
      </div>
      <SudokuGrid />
    </div>
  );
}

export default App;

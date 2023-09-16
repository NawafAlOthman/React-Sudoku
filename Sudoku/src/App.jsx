import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
    grid[row][col] = parseInt(puzzle[i]) || 0;
  }

  return grid;
}

function App() {
  let puzzle = makepuzzle();
  let solution = solvepuzzle(puzzle);

  const [grid, setGrid] = useState(initGrid(puzzle));

  let temp = initGrid(puzzle);
  console.log(temp);

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
                    className="something "
                    key={colIndex}
                    type="text"
                    placeholder={number === 0 ? "" : number}
                    maxLength="1"
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

export default App;

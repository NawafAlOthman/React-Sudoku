import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";

function App() {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  console.log(grid);
  // let puzzle = makepuzzle()
  return (
    <div>
      <div className=" flex justify-center mt-10">
        <div className="wrapper">
          <div className="field grid grid-rows-9 content-center ">
            {grid.map((row, rowIndex) => (
              <div className=" grid grid-cols-9 content-center " key={rowIndex}>
                {row.map((number, colIndex) => (
                  <input
                    className="something"
                    key={colIndex}
                    type="text"
                    placeholder=" "
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

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calndar from "./container/CalendarContainer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Calndar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

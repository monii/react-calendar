import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calndar from "./container/CalendarContainer";

function App() {
  return (
    // <div className="App">
    //   <BrowserRouter basename="react-calendar/">
    //     <Routes>
    //       <Route exact path="/" element={<Calndar />} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>

    // 로컬용 App
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

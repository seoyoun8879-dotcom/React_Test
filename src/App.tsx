import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Practice from "./practice/Practice";
import ComponentTest from "./component_test/ComponentTest";
import LayoutTest from "./layout_test/LayoutTest";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/practice" element={<Practice />}></Route>
      <Route path="/component-test" element={<ComponentTest />}></Route>
      <Route path="/layout-test" element={<LayoutTest />}></Route>
    </Routes>
  );
}

export default App;

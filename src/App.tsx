import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Practice from "./pages/practice/Practice";
import ComponentTest from "./pages/component_test/ComponentTest";
import LayoutTest from "./pages/layout_test/LayoutTest";

function App() {
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

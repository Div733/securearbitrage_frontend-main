import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
// import LoaderPro from "./components/loader/LoaderPro";
import SecureLayout from "./components/page/SecureWebsite/Layout/SecureLayout";

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // if (isLoading) {
  //   return <LoaderPro></LoaderPro>;
  // }
  
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<SecureLayout/>} />
      </Routes>
    </div>
  );
}

export default App;


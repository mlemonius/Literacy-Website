import Main from "./main";
import "./App.css";
import Navbar from "./Components/Navbar";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

function App() {
  const [cookies] = useCookies(["userID"]);

  console.log(typeof cookies.userID);
  return (
    <div className="App">
      {cookies.userID === "undefined" || cookies.userID === "" ? (
        <></>
      ) : (
        <Navbar />
      )}
      <Main />
    </div>
  );
}

export default App;

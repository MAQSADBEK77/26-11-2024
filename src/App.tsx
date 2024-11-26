import "./App.css";
import IQTest from "./components/IQTest";
import NavBar from "./components/NavBar";
import PersonalHumanData from "./components/PersonalHumanData";

function App() {
  return (
    <>
      <div className="full-container">
        <NavBar />
        <div className="container">
          <PersonalHumanData />
          <IQTest />
        </div>
      </div>
    </>
  );
}

export default App;

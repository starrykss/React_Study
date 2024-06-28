import Header from "./components/Header.jsx";
import StateLogin from "./components/StateLogin.jsx";
import RefLogin from "./components/RefLogin.jsx";
import Signup from "./components/Signup.jsx";
import Copyright from "./components/Copyright.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <StateLogin />
        <Signup />
      </main>
      <Copyright />
    </>
  );
}

export default App;

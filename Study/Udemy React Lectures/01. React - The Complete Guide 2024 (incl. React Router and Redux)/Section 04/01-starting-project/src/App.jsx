import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";

function App() {
  console.log("APP COMPONENT EXECUTING");

  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
      <Footer />
    </>
  );
}

export default App;

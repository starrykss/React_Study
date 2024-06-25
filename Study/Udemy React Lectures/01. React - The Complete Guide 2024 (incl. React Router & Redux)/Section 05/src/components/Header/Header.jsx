import pageLogo from "../../assets/investment-calculator-logo.png";

export default function Header() {
  return (
    <div id="header">
      <img src={pageLogo} alt="logo showing a money bag" />
      <h1>React Investment Calculator</h1>
    </div>
  );
}

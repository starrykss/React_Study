import { useState, useEffect } from "react";

import UserInput from "./UserInput";
import Results from "./Results";

export default function Content() {
  // const [initialInvestment, setInitialInvestment] = useState(0);
  // const [annualInvestment, setAnnualInvestment] = useState(0);
  // const [expectedReturn, setExpectedReturn] = useState(0);
  // const [duration, setDuration] = useState(0);

  const [userInput, setUserInput] = useState({
    initialInvestment: 15000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue, // string -> number
      };
    });
  }

  const inputIsValid = userInput.duration >= 1;

  // let calculatedResult;

  // if (initialInvestment && annualInvestment && expectedReturn && duration) {
  //   calculatedResult = calculateInvestmentResults({
  //     initialInvestment: initialInvestment,
  //     annualInvestment: annualInvestment,
  //     expectedReturn: expectedReturn,
  //     duration: duration,
  //   });
  //   console.log("[RESULT]", calculatedResult);
  // }

  // console.log(
  //   "[ALL]",
  //   initialInvestment,
  //   annualInvestment,
  //   expectedReturn,
  //   duration
  // );

  // for Debug
  // useEffect(() => {
  //   console.log(`[initialInvestment] ${initialInvestment}`);
  // }, [initialInvestment]);

  // useEffect(() => {
  //   console.log(`[annualInvestment] ${annualInvestment}`);
  // }, [annualInvestment]);

  // useEffect(() => {
  //   console.log(`[expectedReturn] ${expectedReturn}`);
  // }, [expectedReturn]);

  // useEffect(() => {
  //   console.log(`[duration] ${duration}`);
  // }, [duration]);

  return (
    <>
      <UserInput
        // setInitialInvestment={setInitialInvestment}
        // setAnnualInvestment={setAnnualInvestment}
        // setExpectedReturn={setExpectedReturn}
        // setDuration={setDuration}
        onChange={handleChange}
        userInput={userInput}
      />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results input={userInput} />}
    </>
  );
}

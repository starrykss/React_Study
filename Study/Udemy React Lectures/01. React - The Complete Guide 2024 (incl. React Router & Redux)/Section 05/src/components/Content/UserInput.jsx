// import { useEffect } from "react";

// let inputNumber;
// export default function UserInput({ setInitialInvestment setAnnualInvestment, setExpectedReturn, setDuration })

export default function UserInput({ onChange, userInput }) {
  // 방법 2
  // function handleChange2(event, inputType) {
  //   inputNumber = event.target.value;

  //   if (inputType == "initial_investment") {
  //     setInitialInvestment(inputNumber);
  //   } else if (inputType == "annual_investment") {
  //     setAnnualInvestment(inputNumber);
  //   } else if (inputType == "expected_return") {
  //     setExpectedReturn(inputNumber);
  //   } else if (inputType == "duration") {
  //     setDuration(inputNumber);
  //   }
  // }

  // for Debug
  // useEffect(() => {
  //   console.log(`[inputNumber] : ${inputNumber}`);
  // }, [inputNumber]);

  return (
    <>
      <div id="user-input">
        <div className="input-group">
          <p>
            <label>INITIAL INVESTMENT</label>
            <input
              type="number"
              value={userInput.initialInvestment}
              // onChange={() => handleChange(event, "initial_investment")}
              onChange={(event) =>
                onChange("initialInvestment", event.target.value)
              }
              required
            />
          </p>
          <p>
            <label>ANNUAL INVESTMENT</label>
            <input
              type="number"
              value={userInput.annualInvestment}
              // onChange={() => handleChange(event, "annual_investment")}
              onChange={(event) =>
                onChange("annualInvestment", event.target.value)
              }
              required
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label>EXPECTED RETURN</label>
            <input
              type="number"
              value={userInput.expectedReturn}
              // onChange={() => handleChange(event, "expected_return")}
              onChange={(event) =>
                onChange("expectedReturn", event.target.value)
              }
              required
            />
          </p>
          <p>
            <label>DURATION</label>
            <input
              type="number"
              value={userInput.duration}
              // onChange={() => handleChange(event, "duration")}
              onChange={(event) => onChange("duration", event.target.value)}
              required
            />
          </p>
        </div>
      </div>
    </>
  );
}

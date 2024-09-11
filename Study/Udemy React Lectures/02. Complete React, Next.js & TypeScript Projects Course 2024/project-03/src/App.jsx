import TitleUI from './components/TitleUI';

import ErrorExample from './components/ErrorExample';
import UseStateArray from './components/UseStateArray';
import UseStateBasics from './components/UseStateBasics';
import UseStateGotcha from './components/UseStateGotcha';
import UseStateObject from './components/UseStateObject';
import UseEffectBasics from './components/UseEffectBasics';
import MultipleEffects from './components/MultipleEffects';
import FetchData from './components/FetchData';
import MultipleReturnsBasics from './components/MultipleReturnsBasics';
import MultipleReturnsFetchData from './components/MultipleReturnsFetchData';
import ShortCircuitTernaryExample from './components/ShortCircuitTernaryExample';
import ToggleChallenge from './components/ToggleChallenge';
import UserChallenge from './components/UserChallenge';
import CleanUpFunction from './components/CleanUpFunction';
import LeverageJavascript from './components/LeverageJavascript';
import ControlledInputs from './components/ControlledInputs';
import MultipleInputs from './components/MultipleInputs';
import OtherInputs from './components/OtherInputs';
import UncontrolledInputs from './components/UncontrolledInputs';
import UseRefExample from './components/UseRefExample';
import ToggleCustomHook from './components/ToggleCustomHook';
import FetchDataCustomHook from './components/FetchDataCustomHook';
import ContextApiExample from './components/ContextApiExample';

function App() {
  return (
    <div className="whole-container">
      <TitleUI />
      <div className="sections-container">
        <ErrorExample />
        <UseStateBasics />
        <UseStateArray />
        <UseStateObject />
        <UseStateGotcha />
        <UseEffectBasics />
        <MultipleEffects />
        <FetchData />
        <MultipleReturnsBasics />
        <MultipleReturnsFetchData />
        <ShortCircuitTernaryExample />
        <ToggleChallenge />
        <UserChallenge />
        <CleanUpFunction />
        <LeverageJavascript />
        <ControlledInputs />
        <MultipleInputs />
        <OtherInputs />
        <UncontrolledInputs />
        <UseRefExample />
        <ToggleCustomHook />
        <FetchDataCustomHook />
        <ContextApiExample />
      </div>
    </div>
  );
}

export default App;

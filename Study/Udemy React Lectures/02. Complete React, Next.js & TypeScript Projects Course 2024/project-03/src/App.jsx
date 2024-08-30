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
      </div>
    </div>
  );
}

export default App;

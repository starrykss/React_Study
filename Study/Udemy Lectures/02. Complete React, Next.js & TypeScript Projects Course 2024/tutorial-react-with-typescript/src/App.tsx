import ReturnComponent from './components/Return';
import PropsComponent from './components/Props';
import StateComponent from './components/State';
import EventsComponents from './components/Events';
import ChallengeComponent from './components/Challenge';
import ParentComponent from './components/Context';
import ReducersComponents from './components/Reducers';
import FetchDataComponent from './components/FetchData';
import ReduxToolkitComponent from './components/ReduxToolkit';
import TaskApp from './components/TaskApp';

function App() {
  return (
    <main>
      <h2>React & Typescript</h2>
      <ReturnComponent />
      <PropsComponent name="Hi" id={12345}>
        <h3>Hello World!</h3>
      </PropsComponent>
      <PropsComponent name="Park" id={2222} />
      <StateComponent />
      <EventsComponents />
      <ChallengeComponent type="basic" name="Susan" />
      <ChallengeComponent type="advanced" name="Kahn" email="hello@world.com" />
      <ParentComponent />
      <ReducersComponents />
      <FetchDataComponent />
      <ReduxToolkitComponent />
      <br />
      <TaskApp />
    </main>
  );
}

export default App;

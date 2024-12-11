import useToggle from '../hooks/useToggle'; // Custom Hook

const ToggleCustomHook = () => {
  const { show, toggle } = useToggle(true);

  return (
    <div className="section">
      <h1>Toggle Custom Hooks</h1>
      <div>
        <h4>toggle custom hook</h4>
        <button className="btn" onClick={toggle}>
          toggle
        </button>
        {show && <h4>some stuff</h4>}
      </div>
    </div>
  );
};

export default ToggleCustomHook;

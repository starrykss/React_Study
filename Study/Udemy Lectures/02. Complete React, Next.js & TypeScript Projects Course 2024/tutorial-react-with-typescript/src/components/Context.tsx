import { useTheme, ThemeProvider } from '../context';

const ParentComponent = () => {
  return (
    <ThemeProvider>
      <ContextComponent />
    </ThemeProvider>
  );
};

const ContextComponent = () => {
  const context = useTheme();
  console.log(context);

  return (
    <main>
      <h2>Context API</h2>
      <button
        onClick={() => {
          if (context.theme === 'dark') {
            context.setTheme('system');
            return;
          }
          context.setTheme('dark');
        }}
        className="btn btn-center"
      >
        Toggle Theme
      </button>
    </main>
  );
};

export default ParentComponent;

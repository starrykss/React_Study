import Carousel from './components/Carousel';
import SlickCarousel from './components/SlickCarousel';

const App = () => {
  return (
    <main>
      <h3>Custom Carousel</h3>
      <Carousel />

      <h3>Carousel with React Slick</h3>
      <SlickCarousel />
    </main>
  );
};
export default App;

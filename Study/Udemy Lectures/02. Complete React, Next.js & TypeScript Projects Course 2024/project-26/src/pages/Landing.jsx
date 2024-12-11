import { Link } from 'react-router-dom';

import mainImg from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
            nesciunt? Cumque aspernatur cupiditate accusamus, possimus alias
            maiores. In repellendus iure cum consequatur iste ipsam, vero
            quisquam, nemo voluptatum tempore obcaecati.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={mainImg} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;

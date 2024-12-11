import PageLinks from './PageLinks/PageLinks';
import SocialLinks from './SocialLinks/SocialLinks';

const Footer = () => {
  return (
    <footer className="section footer">
      <PageLinks parentClass="footer-links" itemClass="footer-link" />

      <SocialLinks parentClass="footer-icons" itemClass="footer-icon" />

      <p className="copyright">
        copyright &copy; Backroads travel tours company
        <span id="date"></span> all rights reserved
      </p>
    </footer>
  );
};

export default Footer;

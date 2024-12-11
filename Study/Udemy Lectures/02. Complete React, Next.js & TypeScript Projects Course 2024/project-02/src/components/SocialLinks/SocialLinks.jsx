import SocialLink from './SocialLink';

import { socialLinks } from '../../data';

const SocialLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass}>
      {socialLinks.map((link) => (
        <SocialLink
          key={link.id}
          icon={link.icon}
          href={link.href}
          target="_blank"
          className={itemClass}
          rel="noreferrer"
        />
      ))}
    </ul>
  );
};

export default SocialLinks;

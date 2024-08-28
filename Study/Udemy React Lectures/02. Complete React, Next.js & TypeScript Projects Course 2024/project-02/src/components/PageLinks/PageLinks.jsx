import PageLink from './PageLink';

import { pageLinks } from '../../data';

const PageLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass} id="nav-links">
      {pageLinks.map((item) => (
        <PageLink
          key={item.id}
          content={item.content}
          href={item.href}
          className={itemClass}
        />
      ))}
    </ul>
  );
};

export default PageLinks;

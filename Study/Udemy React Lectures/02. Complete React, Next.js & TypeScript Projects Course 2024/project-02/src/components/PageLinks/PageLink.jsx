const PageLink = ({ content, ...props }) => {
  return (
    <li>
      {' '}
      <a {...props}>{content}</a>
    </li>
  );
};

export default PageLink;

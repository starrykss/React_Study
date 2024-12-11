const SocialLink = ({ icon, ...props }) => {
  return (
    <li>
      <a {...props}>
        <i className={icon}></i>
      </a>
    </li>
  );
};

export default SocialLink;

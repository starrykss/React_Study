import React from "react";
import PropTypes from "prop-types";

class PropsComponent extends React.Component {
  render() {
    return <div className="message-container">{this.props.name}</div>;
  }
}

// 자료형 선언 (문자열형)
PropsComponent.propTypes = {
  name: PropTypes.string,
};

export default PropsComponent;

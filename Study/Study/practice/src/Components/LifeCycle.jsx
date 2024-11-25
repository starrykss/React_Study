import React from "react";

class LifeCycle extends React.Component {
  static getDerivedStateFromProps() {
    console.log("getDerivedStateFromProps 호출");
    return {};
  }

  constructor(props) {
    super(props);

    // getDerivedStateFromProps() 함수를 사용하므로
    // 경고 메시지를 건너 뛰기 위해 state 초기값을 설정한다.
    this.state = {};
    console.log("constructor 호출");
  }

  componentDidMount() {
    console.log("componentDidMount 호출");
    // this.setState({ updated: true });
    this.forceUpdate();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate 호출");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount 호출");
  }

  getSnapshotBeforeUpdate() {
    console.log("getSnapshotBeforeUpdate 호출");
    return {};
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate 호출");
    return false;
  }

  render() {
    console.log("render 호출");
    return null;
  }
}

export default LifeCycle;

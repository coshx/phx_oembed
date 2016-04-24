import React            from "react";
import { connect }      from "react-redux";

const mapStateToProps = (state) => {
  return({});
};

const mapDispatchToProps = (dispatch) => {
  return({});
};

class CardContainer extends React.Component {
  render() {
    return(
      <div>CardContainer</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)

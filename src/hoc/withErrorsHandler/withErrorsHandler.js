import React, { Component } from "react";
import Aux from "../AuxComponent/AuxComponent";
import Modal from "../../components/UI/Modal/Modal";

const withErrorsHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
        this.setState({
          error: error,
        });
      });
    }
    errorComfirmedHandler = () => {
      this.setState({
        error: null,
      });
    };
    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} close={this.errorComfirmedHandler}>
              {this.state.error ? this.state.error.message : null}
              </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorsHandler;

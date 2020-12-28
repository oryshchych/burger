import React from "react";
import Aux from "../AuxComponent/AuxComponent";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorsHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} close={clearError}>
            {error ? error.message : null}
            </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorsHandler;

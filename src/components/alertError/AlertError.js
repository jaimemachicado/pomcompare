import React from 'react';
import { Alert } from 'react-bootstrap';

function AlertError(props) {
      return (
        <Alert variant="danger">
          <Alert.Heading>{props.fileName}</Alert.Heading>
          <p>
            The file is not supported. Please, select a XML file.
          </p>
        </Alert>
      );
  }


  export default AlertError;
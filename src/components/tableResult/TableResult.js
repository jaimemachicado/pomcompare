import React from 'react';
import { Table } from 'react-bootstrap';

function TableResult(props) {
      return (
        <Table size="sm" striped bordered hover>
            <thead>
                <tr>
                <th>GroupId</th>
                <th>ArtifactId</th>
                <th>Old Version</th>
                <th>New Version</th>
                </tr>
            </thead>
            <tbody>
                {props.dependencias.map(function(dependency){
                    return (
                    <tr>
                        <td>{dependency.dependencia.split("#")[0]}</td>
                        <td>{dependency.dependencia.split("#")[1]}</td>
                        <td>{dependency.fichero_1}</td>
                        <td>{dependency.fichero_2}</td>
                    </tr>
                    );
                })}
            </tbody>
        </Table>
      );
  }


  export default TableResult;
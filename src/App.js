import NavBar from "./components/navbar/NavBar";
import {useState} from 'react';
import LoadFiles from "./components/loadFiles/LoadFiles";
import {Col, Container, Row, Accordion} from "react-bootstrap";
import { Button } from 'react-bootstrap';
import {dependenciesDiff} from './common/DifferencesFunctions';
import TableResult from "./components/tableResult/TableResult";

function App() {
  const [pomViejo, setPomViejo] = useState("");
  const [pomNuevo, setPomNuevo] = useState("");
  const [resultadoComparacion, setResultadoComparacion] = useState();
  const [comparing, setComparing] = useState(false);


  const handleCompareClick = (pomViejo, pomNuevo) => {
    if(pomViejo.length > 0 && pomNuevo.length > 0) {
      setComparing(true);
      console.log("Resultado comparacion: ",dependenciesDiff(pomViejo, pomNuevo));
      setResultadoComparacion(dependenciesDiff(pomViejo,pomNuevo));
    }
  }

  const handleRestartClick = () => {
    setComparing(false);
    setPomNuevo("");
    setPomViejo("");
  }

  return (
      <Container>
        <Row>
          <NavBar></NavBar>
        </Row>
        {!comparing && 
        <div>
        <Row>
          <Col sm={{span:5}}>
            <LoadFiles updatePom={setPomViejo}></LoadFiles>
          </Col>  
          <Col sm={{span:5, offset:2}}>
            <LoadFiles updatePom={setPomNuevo}></LoadFiles>
          </Col>
        </Row>
        <Row>
        <Button variant="primary" onClick={() => handleCompareClick(pomViejo, pomNuevo)}>
          Compare  
        </Button>
        </Row></div>}
        {comparing && <div>
        <Row>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Common Dependencies:</Accordion.Header>
            <Accordion.Body>
              <TableResult dependencias={resultadoComparacion.comunes}></TableResult>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Deleted Dependencies:</Accordion.Header>
            <Accordion.Body>
              <TableResult dependencias={resultadoComparacion.soloEnFichero1}></TableResult>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Added Dependencies:</Accordion.Header>
            <Accordion.Body>
              <TableResult dependencias={resultadoComparacion.soloEnFichero2}></TableResult>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Updated Dependencies:</Accordion.Header>
            <Accordion.Body>
              <TableResult dependencias={resultadoComparacion.diferencias}></TableResult>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </Row>
        <Row>
        <Button variant="primary" onClick={() => handleRestartClick(pomViejo, pomNuevo)}>
          Compare other POM files
        </Button>
        </Row>
        </div>}
      </Container>

  );
}
export default App;

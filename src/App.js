import NavBar from "./components/navbar/NavBar";
import {useState} from 'react';
import LoadFiles from "./components/loadFiles/LoadFiles";
import {Col, Container, Row } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import {dependenciesDiff} from './common/DifferencesFunctions';

function App() {
  const [pomViejo, setPomViejo] = useState("");
  const [pomNuevo, setPomNuevo] = useState("");
  const [pomResultante, setPomResultante] = useState("");
  const [comparing, setComparing] = useState(false);


  const handleCompareClick = (pomViejo, pomNuevo) => {
    if(pomViejo.length > 0 && pomNuevo.length > 0) {
      setComparing(true);
      console.log("Resultado comparacion: ",dependenciesDiff(pomViejo, pomNuevo));
    }
  }

  const handleRestartClick = () => {
    setComparing(false);
    setPomNuevo("");
    setPomViejo("");
    setPomResultante("");
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
          POM files compared!
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

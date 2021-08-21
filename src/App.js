import NavBar from "./components/navbar/NavBar";
import LoadFiles from "./components/loadFiles/LoadFiles";
import {Col, Container, Row } from "react-bootstrap";

function App() {
  return (
      <Container>
        <Row>
          <NavBar></NavBar>
        </Row>
        <Row>
          <Col sm={{span:5}}>
            <LoadFiles></LoadFiles>
          </Col>
          <Col sm={{span:5, offset:2}}>
            <LoadFiles></LoadFiles>
          </Col>
        </Row>
      </Container>

  );
}
export default App;

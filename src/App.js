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
          <Col>
            <LoadFiles></LoadFiles>
          </Col>
          <Col>
            <LoadFiles></LoadFiles>
          </Col>
        </Row>
      </Container>

  );
}
export default App;

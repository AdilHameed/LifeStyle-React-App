import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
      <Container fluid="sm">
        <Navbar.Brand href="#home" style={{ fontSize: "25px" }}>
          Lifestyle
        </Navbar.Brand>
        <Nav className="justify-content-end ">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="./login">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

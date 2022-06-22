import styles from "./Layout.module.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { VscDebugDisconnect } from "react-icons/vsc";
import { logout } from "../utils/Loader";
import { useAppSelector } from "./redux/reduxHooks";

const NavBar = () => {
  const { isLoading, user } = useAppSelector((state) => state.auth);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className={styles.navBarMainTitle}>
          <div className={styles.navBarLogo}>
            <VscDebugDisconnect />
          </div>
          FindDeed
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!user?.user && (
              <>
                {" "}
                <Nav.Link href="/auth/login">Login</Nav.Link>
                <Nav.Link href="/auth/register">Register</Nav.Link>
              </>
            )}
            {user?.user && (
              <>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link href="/job/postJob">Employers / Post Job</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

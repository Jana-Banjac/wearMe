import React from 'react'
<<<<<<< HEAD
import logo from '../assets/logo.png'
=======
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector , useDispatch} from 'react-redux'
<<<<<<< HEAD
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const Header = () => {
 const { cartItems } = useSelector((state) => state.cart);

 const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

=======
//import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const Header = () => {
 //const { cartItems } = useSelector((state) => state.cart);
 //const { userInfo } = useSelector((state) => state.auth);

 const cartItems = []; 
 const userInfo = null;

    const dispatch = useDispatch();
    const navigate = useNavigate();
/*
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }

    }
<<<<<<< HEAD

=======
*/
const logoutHandler = () => {};
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        expand="md"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
<<<<<<< HEAD
                src={logo}
                alt="FTN Skriptarnica"
=======
                src="/wearifylogo.png"
                alt="Wearify"
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
              />

              <span className="fw-semibold">
<<<<<<< HEAD
                Skriptarnica
              </span>{" "}
              Fakulteta tehničkih nauka u Novom Sadu
=======
                Wearify
              </span>{" "}
              Wearify online shop
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
<<<<<<< HEAD
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Korpa
=======
              {/* Cart Link */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b

                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="success"
                      style={{ marginLeft: "5px" }}
                    >
                      {cartItems.reduce(
                        (a, c) => a + c.qty,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

<<<<<<< HEAD
               {userInfo ? (
                     <NavDropdown title={userInfo.name} id="username">
                          <LinkContainer to="/profile">
                              <NavDropdown.Item>Profil</NavDropdown.Item>
                          </LinkContainer>
                             <NavDropdown.Item onClick={logoutHandler}>Odjava</NavDropdown.Item>
                             </NavDropdown>
                        ) : (
                          <LinkContainer to="/login">
                              <Nav.Link><FaUser /> Prijava</Nav.Link>
                          </LinkContainer>)}

                           {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Proizvodi</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Porudžbine</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Korisnici</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
=======
              {/* --- NOVO: Logged User Link --- */}
              <LinkContainer to="/profile">
                  <Nav.Link>Logged User</Nav.Link>
              </LinkContainer>

              {/* --- NOVO: Admin Link --- */}
              <LinkContainer to="/admin">
                  <Nav.Link>Admin</Nav.Link>
              </LinkContainer>

              {/* Login / User Dropdown logic */}
               {userInfo ? (
                     <NavDropdown title={userInfo.name} id="username">
                          <LinkContainer to="/profile">
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                             <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                             </NavDropdown>
                        ) : (
                          <LinkContainer to="/login">
                              <Nav.Link><FaUser /> Login</Nav.Link>
                          </LinkContainer>)}
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
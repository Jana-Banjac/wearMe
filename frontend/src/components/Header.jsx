import React from 'react'
import logo from '../assets/logo.png'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector , useDispatch} from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const Header = () => {
 const { cartItems } = useSelector((state) => state.cart);

 const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

  return (
    <header>
      <Navbar
        className="wearme-header"
        variant="dark"
        expand="md"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="wearMe | Online Clothing Store"
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
              />

              <span className="fw-semibold">
                wearMe
              </span>{" "}
              | Online Clothing Store
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="wearme-nav-action">
                  <FaShoppingCart /> cart

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

               {userInfo ? (
                    <>
                      <LinkContainer to="/profile">
                        <Nav.Link className="wearme-nav-action"><FaUser /> {userInfo.name || 'Profile'}</Nav.Link>
                      </LinkContainer>
                      <Nav.Link className="wearme-nav-action" onClick={logoutHandler}>logout</Nav.Link>
                    </>
                  ) : (
                          <LinkContainer to="/login">
                              <Nav.Link className="wearme-nav-action"><FaUser /> login</Nav.Link>
                          </LinkContainer>)}

                           {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu" className="wearme-nav-action wearme-admin-dropdown">
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
<<<<<<< HEAD
                        <Nav.Link>Prijava</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Prijava</Nav.Link>
=======
                        <Nav.Link>Log In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Log In</Nav.Link>
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
<<<<<<< HEAD
                        <Nav.Link>Podaci o dostavi</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Podaci o dostavi</Nav.Link>
=======
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
<<<<<<< HEAD
                        <Nav.Link>Plaćanje</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Plaćanje</Nav.Link>
=======
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/complete">
<<<<<<< HEAD
                        <Nav.Link> Pregled porudžbine </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled> Pregled porudžbine </Nav.Link>
=======
                        <Nav.Link> Order Summary </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled> Order Summary </Nav.Link>
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
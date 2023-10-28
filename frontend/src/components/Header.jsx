
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useLogoutMutation } from '../slice/userapislice';
import { logout } from '../slice/authslice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const userInfo = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate("/")
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <header>
            <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href='/'>MERN App</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {userInfo.userInfo ? (<>
                                <NavDropdown title={userInfo.userInfo.name} id='username' >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        LogOut
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>) : (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link >
                                            <FaSignInAlt /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link >
                                            <FaSignOutAlt /> Sign Up
                                        </Nav.Link>
                                    </LinkContainer></>)}

                        </Nav>
                    </Navbar.Collapse>
                </Container >
            </Navbar >
        </header >
    );
};

export default Header;
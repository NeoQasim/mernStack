import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from './Loader';

const Hero = () => {
    const userInfo = useSelector((state) => state.auth)
    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>MERN Authentication</h1>
                    <p className='text-center mb-4'>
                        This is a boilerplate for MERN authentication that stores a JWT in
                        an HTTP-Only cookie. It also uses Redux Toolkit and the React
                        Bootstrap library
                    </p>
                    <div className='d-flex'>

                        {userInfo ? (<>

                            <h2>You are Already Logged in
                                <h4>and your name is <span className='text-danger fw-bolder fs-2'>{"d"}</span></h4></h2>
                            {/* <Loader /> */}
                        </>)
                            :
                            (<> <LinkContainer to="/login">
                                <Button variant='primary' className='me-3'>
                                    Sign In
                                </Button>
                            </LinkContainer>
                                <LinkContainer to="/register">
                                    <Button variant='secondary' >
                                        Sign UP
                                    </Button>
                                </LinkContainer>
                            </>)
                        }


                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Hero;
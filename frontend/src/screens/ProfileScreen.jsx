import { useState, useEffect } from "react"
import { Form, Button, } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { setCredentials } from "../slice/authslice"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import { useUpdateUserMutation } from "../slice/userapislice"
// import {Link, useNavigate } from "react-router-dom"


const ProfileScreen = () => {
    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [UpdateUser, { isLoading }] = useUpdateUserMutation()
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    useEffect(() => {
        setname(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.name, userInfo.email])


    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            toast.error('passwords doesnot match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            try {
                const res = await UpdateUser({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success("profile updated", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } catch (error) {

                toast.error(error?.data.message || error.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        }
    }

    return (
        <> <FormContainer>
            <h1>Update Profile</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmpassword '>
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder=' confirm password '
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {isLoading &&
                    <>
                        <Loader />
                    </>
                }

                <Button type='submit' variant='primary' className='mt-3'>
                    Update
                </Button>
            </Form>


        </FormContainer>

        </>
    )
}


export default ProfileScreen
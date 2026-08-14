import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const updatedUser = {
            ...userInfo,
            name,
            email,
        };

        dispatch(setCredentials(updatedUser));
        toast.success('Profile updated successfully');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Row className='gy-4'>
            <Col md={4}>
                <h2>User Profile</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter new password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword' className='my-2'>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm new password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-3'>
                        Update Profile
                    </Button>
                </Form>
            </Col>
            
            <Col md={8}>
                <h2>My Orders</h2>
                <Card className='border-0 shadow-sm p-4 text-center text-muted'>
                    No orders found.
                </Card>
            </Col>
        </Row>
    );
};

export default Profile;

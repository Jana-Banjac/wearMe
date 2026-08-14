import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';

const CreatePost = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        
        toast.success('Post created successfully!');
        navigate('/');
    };

    return (
        <FormContainer>
            <Card className='border-0 shadow-sm p-4'>
                <h1>Create New Post</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter product name'
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            required
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image URL (e.g. /images/sample.jpg)'
                            value={image}
                            required
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category' className='my-2'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category (e.g. Shirts, Jeans)'
                            value={category}
                            required
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Enter product description'
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-3'>
                        Publish Post
                    </Button>
                </Form>
            </Card>
        </FormContainer>
    );
};

export default CreatePost;

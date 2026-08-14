import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  Form,
  Button,
  FormControl,
} from 'react-bootstrap';

import { toast } from 'react-toastify';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] =
    useState(0);
  const [description, setDescription] =
    useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [
    updateProduct,
    { isLoading: loadingUpdate },
  ] = useUpdateProductMutation();

  const [
    uploadProductImage,
    { isLoading: loadingUpload },
  ] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        category,
        description,
        countInStock,
      }).unwrap();

      toast.success(
        'Product updated successfully'
      );

      refetch();

      navigate('/admin/productlist');
    } catch (err) {
      toast.error(
        err?.data?.message || err.error
      );
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    formData.append(
      'image',
      e.target.files[0]
    );

    try {
      const res =
        await uploadProductImage(
          formData
        ).unwrap();

      setImage(res.image);

      toast.success(
        'Image uploaded successfully'
      );
    } catch (err) {
      toast.error(
        err?.data?.message || err.error
      );
    }
  };

  return (
    <>
      <Link
        to='/admin/productlist'
        className='btn btn-light my-3'
      >
        Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter product price'
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />
            </Form.Group>

            <Form.Group
              controlId='image'
              className='my-2'
            >
              <Form.Label>Image</Form.Label>

              <Form.Control
                type='text'
                placeholder='Product image URL'
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
              />

              <FormControl
                type='file'
                onChange={uploadFileHandler}
              />
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>
                Stock Quantity
              </Form.Label>

              <Form.Control
                type='number'
                placeholder='Enter stock quantity'
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(e.target.value)
                }
              />
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>

              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>

              <Form.Control
                type='text'
                placeholder='Enter product description'
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>

          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

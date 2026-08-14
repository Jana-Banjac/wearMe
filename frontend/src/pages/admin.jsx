import { Row, Col, Card, Table, Button } from 'react-bootstrap';

const Admin = () => {
    const mockProducts = [
        { _id: '1', name: 'Denim Shorts', price: 25.0, category: 'Shorts' },
        { _id: '2', name: 'Jeans', price: 35.0, category: 'Jeans' },
        { _id: '3', name: 'Pants', price: 40.0, category: 'Pants' },
    ];

    return (
        <>
            <h1 className='mb-4'>Admin Dashboard</h1>

            <Row className='mb-4 gy-3'>
                <Col md={4}>
                    <Card className='border-0 shadow-sm text-center p-3 bg-light'>
                        <h5>Total Sales</h5>
                        <h3 className='text-success'>$12,450.00</h3>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='border-0 shadow-sm text-center p-3 bg-light'>
                        <h5>Orders</h5>
                        <h3 className='text-primary'>24 Active</h3>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='border-0 shadow-sm text-center p-3 bg-light'>
                        <h5>Users</h5>
                        <h3 className='text-dark'>148 Registered</h3>
                    </Card>
                </Col>
            </Row>

            <Card className='border-0 shadow-sm p-4'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h2>Manage Products</h2>
                </div>
                
                <Table striped hover responsive className='table-sm mb-0 wearme-admin-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProducts.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.category}</td>
                                <td>
                                    <Button variant='light' className='btn-sm me-2'>
                                        Edit
                                    </Button>
                                    <Button variant='danger' className='btn-sm text-white'>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </>
    );
};

export default Admin;

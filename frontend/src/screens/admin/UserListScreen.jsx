import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] =
    useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>

      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {user._id !== userInfo?._id && (
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;

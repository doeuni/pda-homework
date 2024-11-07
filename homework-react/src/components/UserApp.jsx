import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function UserApp() {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      const resp = await axios.get(url);
      setUser(resp.data);
    };
    getUsers();
  }, []);

  const handleUserClick = async (user) => {
    setSelectedUser(user);

    const postsResp = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    setUserPosts(postsResp.data);

    const todosResp = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
    setUserTodos(todosResp.data);

    handleShow();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <h1>Users</h1>
      <ListGroup>
        {user.map((e, i) => {
          return (
            <ListGroup.Item key={i} onClick={() => handleUserClick(e)}>
              {e.id}. {e.name} - {e.email}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6}>
                <h4>Posts:</h4>
                <ul>
                  {userPosts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </ul>
              </Col>
              <Col md={6}>
                <h4>Todos:</h4>
                <ul>
                  {userTodos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

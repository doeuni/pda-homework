import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function UserApp() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getStock = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      const resp = await axios.get(url);
      setUser(resp.data);
    };
    getStock();
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <ListGroup>
        {user.map((e, i) => {
          return (
            <ListGroup.Item key={i}>
              {e.id}. {e.name} - {e.email}
            </ListGroup.Item>
          );
        })}
        <ListGroup.Item disabled></ListGroup.Item>
        <ListGroup.Item></ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

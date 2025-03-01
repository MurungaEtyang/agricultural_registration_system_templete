import { useState, useEffect } from "react";
import { getRoles, addRole } from "../../api-service/users";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { addNgrokUrl, getNgrokUrls } from "../../api-service/ngrok";

const Settings = () => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [ngrokUrl, setNgrokUrl] = useState("");
  const [ngrokUrls, setNgrokUrls] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await getRoles();
      if (response.success) {
        setRoles(response.response || {});
      }
    };

    const fetchNgrokUrls = async () => {
      const response = await getNgrokUrls();
      if (response.success) {
        setNgrokUrls(response.response || []);
      }
    };

    fetchRoles();
    fetchNgrokUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role) {
      const response = await addRole(role);
      if (response.success) {
        setRoles([...roles, role]);
        setRole("");
      }
    }
  };

  const handleNgrokSubmit = async (e) => {
    e.preventDefault();
    const { success, error, message } = await addNgrokUrl(ngrokUrl);
    if (success) {
      alert(message);
    } else {
      alert(error || "An error occurred. Please check your internet connection.");
    }
    setNgrokUrl("");
  };

  return (
    <Container className="roles-container">
      <Row>
        <Col xs={12} md={6}>
          <h2>Settings</h2>
          <ul className="roles-list">
            {roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>

          <h2>Ngrok URLs</h2>
          <ul className="roles-list">
            {Object.keys(ngrokUrls).map((key, index) => (
              <li key={index}>{ngrokUrls[key]}</li>
            ))}
          </ul>
        </Col>
        <Col xs={12} md={6}>
          <h2>Add Role</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRole">
              <Form.Label>Enter role</Form.Label>
              <Form.Control
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter role"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
          <h2>Add Ngrok URL</h2>
          <Form onSubmit={handleNgrokSubmit}>
            <Form.Group controlId="formNgrokUrl">
              <Form.Label>Enter Ngrok URL</Form.Label>
              <Form.Control
                type="text"
                value={ngrokUrl}
                onChange={(e) => setNgrokUrl(e.target.value)}
                placeholder="Enter Ngrok URL"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
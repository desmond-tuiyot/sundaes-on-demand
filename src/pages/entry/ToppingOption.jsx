import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleClick = (event) => {
    // console.log(event.target.checked);
    updateItemCount(name, event.target.checked ? 1 : 0);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Col xs="11">
          <Form.Check type="checkbox" label={name} onClick={handleClick} />
        </Col>
      </Form.Group>
    </Col>
  );
}

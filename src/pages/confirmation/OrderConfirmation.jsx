import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = ({ changePhase }) => {
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderConfirmation(response.data.orderNumber);
      })
      .catch((error) => {
        console.log("here");
        console.log(error);
      });
  }, []);

  return orderConfirmation ? (
    <div>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderConfirmation}</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button
        variant="light"
        onClick={() => {
          changePhase("inProgress");
          resetOrder();
        }}
      >
        Create new order
      </Button>
    </div>
  ) : (
    <h1>Loading....</h1>
  );
};

export default OrderConfirmation;

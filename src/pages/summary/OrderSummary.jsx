import Row from "react-bootstrap/Row";

import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderSummary = ({ changePhase }) => {
  const [{ totals }] = useOrderDetails();

  return (
    <>
      <Row>
        <h1>Order Summary</h1>
      </Row>
      <Row>
        <h2>Scoops: {totals.scoops}</h2>
      </Row>
      <Row>
        <h2>Toppings: {totals.toppings}</h2>
      </Row>
      <Row>
        <h2>Total: {totals.grandTotal}</h2>
      </Row>
      <Row>
        <SummaryForm changePhase={changePhase} />
      </Row>
    </>
  );
};

export default OrderSummary;

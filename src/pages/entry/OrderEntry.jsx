import Button from "react-bootstrap/Button";

import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = ({ changePhase }) => {
  let [{ totals }] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
      <Button
        variant="light"
        onClick={() => {
          changePhase("review");
        }}
      >
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;

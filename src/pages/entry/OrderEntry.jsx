import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = () => {
  let [{ totals }] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
    </div>
  );
};

export default OrderEntry;

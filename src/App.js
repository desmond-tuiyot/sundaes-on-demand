import { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  const [phase, setPhase] = useState("inProgress");

  const currentPhaseComponent = {
    inProgress: <OrderEntry changePhase={setPhase} />,
    review: <OrderSummary changePhase={setPhase} />,
    complete: <OrderConfirmation changePhase={setPhase} />,
  };

  return (
    <Container>
      <OrderDetailsProvider>
        {currentPhaseComponent[phase]}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;

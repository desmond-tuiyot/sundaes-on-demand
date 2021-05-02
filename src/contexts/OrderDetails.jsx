import { createContext, useContext, useEffect, useState, useMemo } from "react";

import { pricePerItem } from "../constants";
import { formatCurrency } from "../utilities";

// create a context
const OrderDetails = createContext();

// create custom hook to check if we're inside a provider
const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
};

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

const initialOptionCounts = {
  scoops: new Map(),
  toppings: new Map(),
};

const initialTotals = () => {
  const zeroCurrency = formatCurrency(0);
  return {
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  };
};

const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionsCount] = useState(initialOptionCounts);

  const [totals, setTotals] = useState(initialTotals);

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCount = { ...optionCounts };

      const optionCountsMap = new Map(optionCounts[optionType]);
      optionCountsMap.set(itemName, parseInt(newItemCount));
      newOptionsCount[optionType] = optionCountsMap;

      setOptionsCount(newOptionsCount);
    }

    function resetOrder() {
      setOptionsCount(initialOptionCounts);
      setTotals(initialTotals);
    }

    // getter: object containing option ounts for scoops and toppings, subtotals, and totals
    // setter: update optioncount
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
};

export { useOrderDetails, OrderDetailsProvider };

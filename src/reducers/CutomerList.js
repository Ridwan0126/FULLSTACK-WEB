const customerList = {
  listCustomer: [],
};
const customerReduce = (state = customerList, action) => {
  const { type, payload } = action;
  console.log("state:", state);
  console.log("action:", payload);
  switch (type) {
    case "customer":
      return {
        ...state,
        listCustomer: [...state.listCustomer, payload.customer],
      };
    default:
      return state;
  }
};

export default customerReduce;

export function storeDelivery(data) {
  return {
    type: "@delivery/STORE_DELIVERY",
    data
  };
}

export function setDelivery(data) {
  return {
    type: "@delivery/SET_DELIVERY",
    data
  };
}

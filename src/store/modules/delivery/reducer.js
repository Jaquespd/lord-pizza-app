import produce from "immer";

export default function delivery(state = {}, action) {
  switch (action.type) {
    case "@delivery/STORE_DELIVERY":
      return action.data;

    case "@delivery/SET_DELIVERY": {
      return produce(state, draft => {
        const { data } = action;

        draft = Object.assign(draft, data);
      });
    }

    default:
      return state;
  }
}

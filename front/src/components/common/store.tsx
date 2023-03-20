import { combineReducers, createStore } from "redux";

const intraIdReducer = (state: string = "", action: any) => {
  switch (action.type) {
    case "SET_ID":
      return action.intraId;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  intraId: intraIdReducer,
});

const store = createStore(rootReducer);

export default store;

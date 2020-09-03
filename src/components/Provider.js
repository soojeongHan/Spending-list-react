import React, { useReducer, useRef, useContext } from "react";

const spendingList = [
  {
    id: 1,
    category: "식사",
    text: "용개반점",
    price: 7000,
  },
  {
    id: 2,
    category: "식료품",
    text: "양배추",
    price: 5000,
  },
  {
    id: 3,
    category: "교통",
    text: "택시비",
    price: 20000,
  },
  {
    id: 4,
    category: "생활",
    text: "관리비",
    price: 100000,
  },
  {
    id: 5,
    category: "의료",
    text: "병원 진료",
    price: 7000,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_SPENDING":
      return state.concat(action.spending);
    case "UPDATE_SPENDING":
      return state.map((element) =>
        element.id === action.spending.id ? action.spending : element
      );
    case "REMOVE_SPENDING":
      return state.filter((element) => element.id !== action.id);
    default:
      throw new Error("unhanlded Error");
  }
};

const StateContext = React.createContext();
const DispatchContext = React.createContext();
const NextIdContext = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, spendingList);
  const nextId = useRef(6);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <NextIdContext.Provider value={nextId}>
          {children}
        </NextIdContext.Provider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useSpendingState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("can not find Provider");
  }
  return context;
};
export const useSpendingDispatch = () => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error("can not find Provider");
  }
  return context;
};
export const useSpendingNextId = () => {
  const context = useContext(NextIdContext);
  if (!context) {
    throw new Error("can not find Provider");
  }
  return context;
};

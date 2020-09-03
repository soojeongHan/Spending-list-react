import React from "react";
import styled from "styled-components";
import { useSpendingState } from "./Provider";

const HeadBlock = styled.div`
  h1 {
    font-size: 34px;
    margin: 0;
  }
  .today {
    font-size: 21px;
    font-weight: bold;
    margin-top: 12px;
  }
  .total_spending {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    padding-bottom: 18px;
    border-bottom: 1px solid #dee2e6;
  }
  .total_spending_price {
    color: red;
  }
`;
const Head = () => {
  const now = new Date();
  const today = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const state = useSpendingState();
  const totalPrice = state.reduce(
    (preValue, curValue) => preValue + curValue.price,
    0
  );
  return (
    <HeadBlock>
      <h1>오늘의 지출</h1>
      <div className="today">{today}</div>
      <div className="total_spending">
        총 지출 : <span className="total_spending_price">-{totalPrice}원</span>
      </div>
    </HeadBlock>
  );
};

export default Head;

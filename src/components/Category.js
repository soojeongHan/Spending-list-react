import React from "react";
import styled from "styled-components";

const Category = styled.select`
  padding: 4px 0px;
`;

const optionValue = ["식사", "식료품", "교통", "생활", "의료"];

export const CategorySelect = ({ value, onChange, name }) => {
  return (
    <Category
      defaultValue={value}
      selected={value}
      onChange={onChange}
      name={name}
    >
      {!name && <option value="전체">전체</option>}
      {optionValue.map((value, index) => {
        return (
          <option key={index} value={value}>
            {value}
          </option>
        );
      })}
    </Category>
  );
};

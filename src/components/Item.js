import React, { useReducer, useCallback } from "react";
import styled, { css } from "styled-components";
import { useSpendingDispatch } from "./Provider";
import { MdDelete, MdCheck, MdEdit, MdClose } from "react-icons/md";
import { CategorySelect } from "./Category";

const ItemBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 10px;
`;
const ItemCategory = styled.div`
  font-size: 14px;
  font-weight: 550;
  padding: 6px 12px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  border: none;
  border-radius: 5px;
  ${(props) =>
    props.category === "식사" &&
    css`
      background: #ffec99;
    `}
  ${(props) =>
    props.category === "식료품" &&
    css`
      background: #b2f2bb;
    `}
  ${(props) =>
    props.category === "교통" &&
    css`
      background: #ffd8a8;
    `}
  ${(props) =>
    props.category === "생활" &&
    css`
      background: #eebefa;
    `}
  ${(props) =>
    props.category === "의료" &&
    css`
      background: #a5d8ff;
    `}
`;
const ItemText = styled.div`
  flex: 1;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 550;
`;
const ItemTextInput = styled.input`
  width: 120px;
  margin-left: 10px;
  font-size: 14px;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: red;
  padding-right: 10px;
`;
const ItemPriceInput = styled.input`
  width: 65px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 550;
`;
const ItemEdit = styled.div`
  cursor: pointer;
  font-size: 18px;
  padding-right: 5px;
`;
const ItemRemove = styled.div`
  cursor: pointer;
  font-size: 18px;
  padding-right: 5px;
`;
const ItemCheck = styled.div`
  cursor: pointer;
  font-size: 18px;
  padding-right: 5px;
`;
const ItemCancel = styled.div`
  cursor: pointer;
  font-size: 18px;
  padding-right: 5px;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_EDITING":
      return {
        ...state,
        isEditing: !state.isEditing,
      };
    case "ON_CHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      throw new Error("unhandled Error");
  }
};

const Item = ({ id, text, price, category }) => {
  const listDispatch = useSpendingDispatch();
  const [state, dispatch] = useReducer(reducer, {
    isEditing: false,
    selectCategory: category,
    inputText: text,
    inputPrice: price,
  });
  const { isEditing, selectCategory, inputText, inputPrice } = state;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "ON_CHANGE",
      name,
      value,
    });
  }, []);
  const onEditing = () => {
    dispatch({
      type: "IS_EDITING",
    });
  };
  const onRemove = () => {
    listDispatch({
      type: "REMOVE_SPENDING",
      id,
    });
  };
  const onUpdate = () => {
    const spending = {
      id,
      category: selectCategory,
      text: inputText,
      price: Number(inputPrice),
    };
    listDispatch({
      type: "UPDATE_SPENDING",
      spending,
    });
    dispatch({
      type: "IS_EDITING",
    });
  };
  const onCancel = () => {
    dispatch({
      type: "IS_EDITING",
    });
  };
  return (
    <ItemBlock>
      {isEditing ? (
        <>
          <CategorySelect
            name="selectCategory"
            onChange={onChange}
            value={category}
          ></CategorySelect>
          <ItemTextInput
            onChange={onChange}
            name="inputText"
            defaultValue={text}
          />
          <ItemPriceInput
            onChange={onChange}
            name="inputPrice"
            defaultValue={price}
          />
          <ItemCheck onClick={onUpdate}>
            <MdCheck />
          </ItemCheck>
          <ItemCancel onClick={onCancel}>
            <MdClose />
          </ItemCancel>
        </>
      ) : (
        <>
          <ItemCategory category={category}>{category}</ItemCategory>
          <ItemText>{text}</ItemText>
          <ItemPrice>-{price}원</ItemPrice>
          <ItemEdit onClick={onEditing}>
            <MdEdit />
          </ItemEdit>
          <ItemRemove onClick={onRemove}>
            <MdDelete />
          </ItemRemove>
        </>
      )}
    </ItemBlock>
  );
};

export default React.memo(Item);

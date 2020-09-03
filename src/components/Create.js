import React from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useReducer } from "react";
import { useSpendingNextId, useSpendingDispatch } from "./Provider";

const CreatePositioner = styled.div`
  margin: 0;
  width: 100%;
  height: 130px;
  background: #ffffff;
  border-top: 1px solid #dee2e6;
  bottom: 0;
  left: 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  position: absolute;
`;
const CreateForm = styled.form`
  padding: 10px;
`;
const CategoryBlock = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
`;
const CategoryInput = styled.select`
  margin-left: 8px;
`;
const TextBlock = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;
const TextInput = styled.input`
  margin-left: 8px;
`;
const PriceBlock = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
`;
const PriceInput = styled.input`
  margin-left: 8px;
`;
const RegisterBlock = styled.div`
  display: flex;
  justify-content: center;
`;
const RegisterButton = styled.button`
  width: 100px;
  font-size: 18px;
`;
const CreateIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #1098ad;
  border-radius: 50%;
  font-size: 40px;
  color: #ffffff;
  background: #1098ad;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
  right: 0;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.isCreate &&
    css`
      transform: rotate(-45deg);
      background: #e03131;
      border: 1px solid #e03131;
    `}
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_CREATE":
      return {
        ...state,
        isCreate: !state.isCreate,
      };
    case "ON_CHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("unhandled Error");
  }
};

const initialState = {
  isCreate: false,
  category: "식사",
  text: "",
  price: "",
};

const Create = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useSpendingNextId();
  const listDispatch = useSpendingDispatch();
  const { isCreate, category, text, price } = state;

  const isCreating = () => {
    dispatch({
      type: "IS_CREATE",
    });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    const reg = /^[0-9\b]+$/;
    if (name === "price" && reg.test(e.target.value)) {
      dispatch({ type: "ON_CHANGE", name, value: Number(value) });
    } else if (name === "price" && !reg.test(e.target.value)) {
      alert("숫자를 입력하지 마세요.");
    } else if (name !== "price") {
      dispatch({ type: "ON_CHANGE", name, value });
    }
  };
  const onCreate = (e) => {
    e.preventDefault();
    const spending = {
      id: nextId.current,
      category,
      text,
      price,
    };
    listDispatch({
      type: "CREATE_SPENDING",
      spending,
    });
    dispatch({
      type: "IS_CREATE",
    });
    dispatch({
      type: "CLEAR",
    });
    nextId.current += 1;
  };
  return (
    <>
      {isCreate && (
        <CreatePositioner>
          <CreateForm onSubmit={onCreate}>
            <CategoryBlock>
              카테고리 :
              <CategoryInput
                name="category"
                defaultValue={category}
                onChange={onChange}
              >
                <option value="식사">식사</option>
                <option value="식료품">식료품</option>
                <option value="교통">교통</option>
                <option value="생활">생활</option>
                <option value="의료">의료</option>
              </CategoryInput>
            </CategoryBlock>
            <TextBlock>
              제목 :
              <TextInput name="text" defaultValue={text} onChange={onChange} />
            </TextBlock>
            <PriceBlock>
              가격 :
              <PriceInput
                name="price"
                defaultValue={price}
                onChange={onChange}
              />
            </PriceBlock>
            <RegisterBlock>
              <RegisterButton>등록</RegisterButton>
            </RegisterBlock>
          </CreateForm>
        </CreatePositioner>
      )}
      <CreateIcon isCreate={isCreate} onClick={isCreating}>
        <MdAdd />
      </CreateIcon>
    </>
  );
};

export default Create;

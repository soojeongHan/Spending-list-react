import React, { useState } from 'react';
import styled from 'styled-components';
import Item from './Item';
import { useSpendingState } from './Provider';
import { CategorySelect } from './Category';

const ListBlock = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const CategoryBlock = styled.div`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 0px;
  border-bottom: 1px solid #dee2e6;
`;
// const CategorySelect = styled.select`
//   padding: 4px 0px;
// `;

const List = () => {
  const state = useSpendingState();
  const [category, setCategory] = useState('전체');
  const onChange = e => {
    setCategory(e.target.value);
  };
  return (
    <>
      <CategoryBlock>
        <span>카테고리별로 보기 : </span>
        <CategorySelect value={category} onChange={onChange} />
      </CategoryBlock>
      <ListBlock>
        {category === '전체'
          ? state.map(item => (
              <Item
                key={item.id}
                id={item.id}
                category={item.category}
                text={item.text}
                price={item.price}
              />
            ))
          : state
              .filter(item => item.category === category)
              .map(item => (
                <Item
                  key={item.id}
                  id={item.id}
                  category={item.category}
                  text={item.text}
                  price={item.price}
                />
              ))}
      </ListBlock>
    </>
  );
};

export default List;

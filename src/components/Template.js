import React from 'react';
import styled from 'styled-components';

const TemplateBlock = styled.div`
  width: 400px;
  height: 600px;
  background: #ffffff;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 40px;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);

  display: flex;
  flex-direction: column;

  position: relative;
`;
const Template = ({ children }) => {
  return <TemplateBlock>{children}</TemplateBlock>;
};

export default Template;

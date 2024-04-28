import styled from "styled-components";

export const Button = styled.button`
  display: ${(props) => props.display};
  align-items: center;
  background: ${(props) => props.bgColor};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  margin-top: ${(props) => props.marginTop};
  margin-right:${(props) => props.marginRight}; 
  font-size: ${(props) => props.fontSize};
  width: ${(props) => props.width};
  border: 0;
  cursor: pointer;
  box-shadow: ${(props) => props.boxShadow};
  color: ${(props) => props.color};
  margin-left: ${(props) => props.marginLeft};
  opacity: 0.99;
  margin-bottom: ${(props) => props.marginBottom};

  /* box-shadow: ${(props) => props.Shadow}; */
  &:hover {
    background: ${(props) => props.hover};
    color: ${(props) => props.hoverColor};
  }
`;

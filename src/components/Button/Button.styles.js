import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;

  border: 1px solid #111111;
  padding: 10px;

  width: ${(props) => props.width}px;
  cursor: pointer;
`;

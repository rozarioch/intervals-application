import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  padding: 15px;
  font-size: 20px;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 24px;
  font-size: 20px;
`;

export const SelectInput = styled.select`
  height: 24px;
  font-size: 20px;
`;

export const TimerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

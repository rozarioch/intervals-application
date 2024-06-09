import React from "react";
import { Wrapper } from "./Button.styles";

const Button = ({ width, onClick, text }) => {
  return (
    <Wrapper width={width} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

export default Button;

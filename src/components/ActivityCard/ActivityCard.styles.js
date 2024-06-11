import styled from "styled-components";

export const CardWrapper = styled.div`
  padding: 10px 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  width: 100%;

  background: ${(props) => {
    if (props.status === "active") {
      return `linear-gradient(90deg, #0394fc ${
        100 - props.percentage
      }%, #ffffff ${100 - props.percentage}%)`;
    } else if (props.status === "done") {
      return "#0394fc";
    } else {
      return "initial"; // or a default background value
    }
  }};
`;

// background-color: ${(props) =>
//   props.status === "active" ? `green` : `blue`};

export const ActivityName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const ActivityTime = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

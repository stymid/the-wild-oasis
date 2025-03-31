import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.$type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
  ${(props) =>
    props.$type === "hotizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
`;
export default Row;

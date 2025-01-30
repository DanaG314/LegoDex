import { Panel } from 'primereact/panel';
import styled from 'styled-components';

export const LegoDetailsPanel = styled(Panel)`
  padding-top: 50px;
  width: 80%;

  img {
    width: 400px;
    height: auto;
    display: flex;
    justify-self: center;
  }
`;

export const LegoDetailsBody = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
  grid-template-rows: 1fr;

  h2 {
    grid-column-start: 1;
  }
  p {
    grid-column-start: 2;
    grid-row-start: 1;
  }
`;

export const LegoInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UpdateAndDelete = styled.div`
  grid-column-start: 2;
  grid-row-start: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 20px;

  button.delete {
    height: 50px;
    background-color: red;
    border: none;
  }
`;

import { Card } from 'primereact/card';
import styled from 'styled-components';

export const LegoDetailsCard = styled(Card)`
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  .p-card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    img {
      width: 250px;
      height: 250px;
      object-fit: contain;
      border-radius: ;
    }
  }
`;

export const LegoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 45px;
  width: 80%;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

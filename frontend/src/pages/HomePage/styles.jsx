import { Card } from 'primereact/card';
import styled from 'styled-components';

export const LegoCard = styled(Card)`
  border: 1px solid black;
  .p-card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    img {
      width: 250px;
      height: 250px;
      object-fit: contain;
    }
  }
`;

export const LegoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 45px;
  width: 80%;
`;

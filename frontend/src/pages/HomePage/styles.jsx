import { Card } from 'primereact/card';
import styled from 'styled-components';

export const LegoCard = styled(Card)`
  border: 1px solid black;
  background-color: #c42317;
  color: white;
  .p-card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: white;

    .p-card-subtitle {
      color: white;
    }

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
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 45px;
  width: 100%;
`;

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Filters = styled.div`
  min-width: 250px;
`;

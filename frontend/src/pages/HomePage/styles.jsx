import { Card } from 'primereact/card';
import styled from 'styled-components';

export const LegoCard = styled(Card)`
  border: 1px solid black;
  background-color: #c42317;
  color: white;
  height: 100%;

  .p-card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: white;

    subTitle {
      color: white;
    }
    .p-card,
    .p-card-subtitle {
      color: white !important;
    }

    img {
      width: 100%;
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
  width: 80%;
`;

export const PageContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
`;

export const Filters = styled.div`
  min-width: 250px;
`;

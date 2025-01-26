import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Panel } from 'primereact/panel';
import * as legoService from '../../services/legoService';
import { StyledDiv } from './styles';

const LegoDetailsPage = ({ user }) => {
  const { legoSetId } = useParams();
  const [lego, setLego] = useState([]);

  useEffect(() => {
    const fetchLego = async () => {
      try {
        const response = await legoService.show(legoSetId);
        setLego(response.sets[0]);
      } catch (error) {
        console.error('Error fetching Lego sets:', error);
      }
    };
    fetchLego();
  }, [legoSetId]);

  return (
    <Panel header={lego?.name}>
      <img src={lego?.image?.imageURL} />
      <StyledDiv>
        <p>{lego?.setID}</p>
        <p>{lego?.rating}</p>
      </StyledDiv>
      {user && <button>Add to Collection</button>}
    </Panel>
  );
};

export default LegoDetailsPage;

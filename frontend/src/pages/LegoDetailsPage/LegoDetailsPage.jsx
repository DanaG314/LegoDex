import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Panel } from 'primereact/panel';
import * as legoService from '../../services/legoService';
import { StyledDiv } from './styles';
import LegoSetForm from '../../components/LegoSetForm/LegoSetForm';

const LegoDetailsPage = ({ user }) => {
  const { legoSetId } = useParams();
  const [lego, setLego] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const fetchLego = async () => {
      try {
        const response = await legoService.show(legoSetId); // calls show from legoService to fetch details for a specific set
        setLego(response.sets[0]);
      } catch (error) {
        console.error('Error fetching Lego sets:', error);
      }
    };
    fetchLego(); // starts process of fetching the set
  }, [legoSetId]); // runs when legoSetId value changes

  return (
    <>
      <Panel header={lego?.name}>
        <img src={lego?.image?.imageURL} />
        <StyledDiv>
          <p>{lego?.setID}</p>
          <p>{lego?.rating}</p>
        </StyledDiv>
        {user && (
          <button
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            Add to Collection
          </button>
        )}
      </Panel>
      {dropdown && (
        <LegoSetForm
          legoId={lego.setID}
          number={lego.number}
          numberVariant={lego.numberVariant}
          rating={lego.rating}
          imageURL={lego.image.imageURL}
          legoName={lego.name}
        />
      )}
    </>
  );
};

export default LegoDetailsPage;

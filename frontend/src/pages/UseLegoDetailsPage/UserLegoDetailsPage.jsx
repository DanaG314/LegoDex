import * as userLegoService from '../../services/userLegoService';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  LegoDetailsPanel,
  LegoDetailsBody,
  LegoInfo,
  UpdateAndDelete,
} from './styles';
import LegoSetForm from '../../components/LegoSetForm/LegoSetForm';

const UserLegoDetailsPage = () => {
  const { legoId } = useParams();
  const [lego, setLego] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  console.log(legoId);

  useEffect(() => {
    console.log('fetchLego() started');
    const fetchLego = async () => {
      try {
        const response = await userLegoService.showUserSet(legoId); // calls show from legoService to fetch details for a specific set
        console.log('Fetched Lego:', response);
        setLego(response);
      } catch (error) {
        console.error('Error fetching Lego sets:', error);
      }
    };
    fetchLego(); // starts process of fetching the set
  }, [legoId]); // runs when legoSetId value changes
  console.log(lego);
  return (
    <>
      <LegoDetailsPanel header={lego?.legoName}>
        <LegoDetailsBody>
          <img src={lego.imageURL} />
          <LegoInfo>
            <h2>{lego.legoId}</h2>
            <h2>{lego.rating}</h2>
          </LegoInfo>
          <p className='m-0'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <UpdateAndDelete>
            <button
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              Update
            </button>

            <button className='delete'>Delete</button>
          </UpdateAndDelete>
        </LegoDetailsBody>
      </LegoDetailsPanel>
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

export default UserLegoDetailsPage;

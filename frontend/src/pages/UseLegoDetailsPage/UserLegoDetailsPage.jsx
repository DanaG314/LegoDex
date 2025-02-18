import * as userLegoService from '../../services/userLegoService';
import { useEffect, useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useParams } from 'react-router';
import {
  LegoDetailsPanel,
  LegoDetailsBody,
  LegoInfo,
  UpdateAndDelete,
} from './styles';
import LegoSetForm from '../../components/LegoSetForm/LegoSetForm';

const UserLegoDetailsPage = ({ handleDeleteSet }) => {
  const { legoId } = useParams();
  const [lego, setLego] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const items = [
    { label: '🏠', url: '/' },
    { label: 'My Collection', url: '/my-collection' },
    { label: `${lego.legoName}` },
  ];
  const home = { icon: 'pi pi-home', url: '/' };

  console.log(legoId);
  console.log('Lego', lego);

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

  return (
    <>
      <BreadCrumb model={items} home={home} />

      <LegoDetailsPanel header={lego?.legoName}>
        <LegoDetailsBody>
          <img src={lego.imageURL} />
          <LegoInfo>
            <h2>#{lego.legoId}</h2>
            {!lego.rating ? <h1></h1> : <h2>⭐️{lego.rating}</h2>}
          </LegoInfo>
          <div>
            <h2>Status: {lego.availabilityStatus}</h2>
            <h2>Condition: {lego.condition}</h2>
            {!lego.notes ? (
              <p>No notes were written for this set</p>
            ) : (
              <p className='m-0'>Notes: {lego.notes}</p>
            )}
          </div>
          <UpdateAndDelete>
            <button
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              Update
            </button>

            <button
              className='delete'
              onClick={() => handleDeleteSet(lego._id)}
            >
              Delete
            </button>
          </UpdateAndDelete>
        </LegoDetailsBody>
      </LegoDetailsPanel>
      {dropdown && (
        <LegoSetForm
          id={lego._id}
          update={true}
          condition={lego.condition}
          availabilityStatus={lego.availabilityStatus}
          inFavourites={lego.inFavourites}
          inWishlist={lego.inWishlist}
          legoId={lego.legoId}
          rating={lego.rating}
          imageURL={lego.imageURL}
          legoName={lego.legoName}
          legoNotes={lego.notes}
        />
      )}
    </>
  );
};

export default UserLegoDetailsPage;

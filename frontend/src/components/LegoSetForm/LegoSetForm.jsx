import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import * as userLegoService from '../../services/userLegoService';
import { useNavigate } from 'react-router';

const LegoSetForm = ({
  id,
  condition,
  availabilityStatus,
  inFavourites,
  inWishlist,
  legoName,
  legoId,
  rating,
  imageURL,
  legoNotes,
  update,
}) => {
  const [wishlistChecked, setWishlistChecked] = useState(
    inWishlist ? inWishlist : false
  );
  const [favouritesChecked, setFavouritesChecked] = useState(
    inFavourites ? inFavourites : false
  );
  const [available, setAvailable] = useState(
    availabilityStatus ? { name: availabilityStatus } : null
  );
  const [conditionState, setConditionState] = useState(
    condition ? { name: condition } : null
  );
  const [notes, setNotes] = useState(legoNotes ? legoNotes : '');

  // const [set, setSet] = useState({
  //   legoName,
  //   legoId,
  //   rating,
  //   imageURL,
  //   inWishlist: wishlistChecked,
  //   inFavourites: favouritesChecked,
  //   availabilityStatus,
  //   condition,
  //   number,
  //   numberVariant,
  // });
  const stati = [
    { name: 'Available' },
    { name: 'Hard to Find' },
    { name: 'Leaving Soon' },
    { name: 'Retired' },
  ];
  console.log(legoName, legoId, rating, imageURL);

  const navigate = useNavigate();

  const conditionStati = [{ name: 'Opened' }, { name: 'Unopened' }];

  async function handleSubmit(evt) {
    evt.preventDefault();
    const set = {
      name: legoName,
      legoId,
      rating,
      imageURL,
      inWishlist: wishlistChecked,
      inFavourites: favouritesChecked,
      availabilityStatus: available.name,
      condition: conditionState.name,
      notes,
    };
    console.log(set);
    try {
      if (update) {
        await userLegoService.update(set, id);
        navigate('/my-collection');
      } else {
        await userLegoService.create(set);
        navigate('/my-collection');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (evt) => {
    evt.preventDefault();
    setNotes(evt.target.value);
  };

  console.log(available);

  return (
    <>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <section>
          <label htmlFor='availabilityStatus'>Availability Status: </label>
          <Dropdown
            value={available}
            onChange={(e) => setAvailable(e.value)}
            options={stati}
            optionLabel='name'
            placeholder='Select status'
            className='w-full md:w-14rem'
          />
        </section>
        <div className='card flex justify-content-center'>
          <label htmlFor='condition'>Condition: </label>
          <Dropdown
            value={conditionState}
            onChange={(e) => setConditionState(e.value)}
            options={conditionStati}
            optionLabel='name'
            placeholder='Select status'
            className='w-full md:w-14rem'
          />
        </div>

        <div className='card flex justify-content-flex-start'>
          <label>Add to Wishlist: </label>
          <Checkbox
            onChange={(e) => setWishlistChecked(e.checked)}
            checked={wishlistChecked}
            value='Add to Wishlist'
          ></Checkbox>
        </div>
        <div className='card flex justify-content-flex-start'>
          <label>Add to Favourites: </label>
          <Checkbox
            onChange={(e) => setFavouritesChecked(e.checked)}
            checked={favouritesChecked}
            value='Add to Wishlist'
          ></Checkbox>
        </div>
        <label htmlFor='notes'>Notes: </label>
        <textarea
          name='notes'
          id='notes'
          onChange={handleChange}
          value={notes}
        ></textarea>
        <button type='submit'>ADD SET</button>
      </form>
    </>
  );
};

export default LegoSetForm;

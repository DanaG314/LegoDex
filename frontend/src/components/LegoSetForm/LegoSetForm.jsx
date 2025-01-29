import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import * as userLegoService from '../../services/userLegoService';
import { useNavigate } from 'react-router';

const LegoSetForm = ({
  legoName,
  legoId,
  rating,
  imageURL,
  number,
  numberVariant,
}) => {
  const [wishlistChecked, setWishlistChecked] = useState(false);
  const [favouritesChecked, setFavouritesChecked] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [condition, setCondition] = useState(null);
  const [notes, setNotes] = useState('');
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
      availabilityStatus: availabilityStatus.name,
      condition: condition.name,
      number,
      numberVariant,
      notes,
    };
    console.log(set);
    try {
      await userLegoService.create(set);
      navigate('/my-collection');
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (evt) => {
    evt.preventDefault();
    setNotes(evt.target.value);
  };

  return (
    <>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div className='availability-select'>
          <label htmlFor='availabilityStatus'>Availability Status: </label>
          <Dropdown
            value={availabilityStatus}
            onChange={(e) => setAvailabilityStatus(e.value)}
            options={stati}
            optionLabel='name'
            placeholder='Select status'
            className='w-full md:w-14rem'
          />
        </div>
        <div className='card flex justify-content-center'>
          <label htmlFor='condition'>Condition: </label>
          <Dropdown
            value={condition}
            onChange={(e) => setCondition(e.value)}
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
        <textarea name='notes' id='notes' onChange={handleChange}></textarea>
        <button type='submit'>ADD SET</button>
      </form>
    </>
  );
};

export default LegoSetForm;

import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

const LegoSetForm = () => {
  const [checked, setChecked] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [condition, setCondition] = useState(null);
  const stati = [
    { name: 'Available' },
    { name: 'Hard to Find' },
    { name: 'Leaving Soon' },
    { name: 'Retired' },
  ];

  const conditionStati = [{ name: 'Opened' }, { name: 'Unopened' }];

  return (
    <>
      <form>
        <div className='card flex justify-content-center'>
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
          <label>Add to Wishlist </label>
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
            value='Add to Wishlist'
          ></Checkbox>
        </div>
        <div className='card flex justify-content-flex-start'>
          <label>Add to Favourites </label>
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
            value='Add to Wishlist'
          ></Checkbox>
        </div>
        <button type='submit'>ADD SET</button>
      </form>
    </>
  );
};

export default LegoSetForm;

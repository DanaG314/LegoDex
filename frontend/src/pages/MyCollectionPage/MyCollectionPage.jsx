import * as userLegoService from '../../services/userLegoService';
import { useEffect, useState } from 'react';

const MyCollectionPage = () => {
  const [mySets, setMySets] = useState([]);

  useEffect(() => {
    async function fetchSets() {
      try {
        const data = await userLegoService.index();
        setMySets(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSets();
  }, []);

  console.log('My sets', mySets);

  return <h1>My Collection</h1>;
};

export default MyCollectionPage;

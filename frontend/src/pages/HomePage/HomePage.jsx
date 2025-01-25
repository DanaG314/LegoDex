import { useEffect, useState } from 'react';
import * as legoService from '../../services/legoService';

const HomePage = () => {
  const [legos, setLegos] = useState([]);

  useEffect(() => {
    const fetchLegos = async () => {
      const response = await legoService.index();
      setLegos(response.sets);
    };

    fetchLegos();
  }, []);

  return <h1>Legos</h1>;
};

export default HomePage;

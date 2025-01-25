import { useEffect, useState } from 'react';
import * as legoService from '../../services/legoService';
import { Button } from 'primereact/button';
import { LegoCard, LegoContainer } from './styles';

const HomePage = () => {
  const [legos, setLegos] = useState([]);

  useEffect(() => {
    const storedLegos = localStorage.getItem('legos');
    if (storedLegos) {
      setLegos(JSON.parse(storedLegos));
    } else {
      const fetchLegos = async () => {
        try {
          const response = await legoService.index();
          setLegos(response.sets);
          localStorage.setItem('legos', JSON.stringify(response.sets));
        } catch (error) {
          console.error('Error fetching Lego sets:', error);
        }
      };

      fetchLegos();
    }
  }, []);

  return (
    <>
      <h1>Lego Sets</h1>
      <LegoContainer>
        {legos?.map((lego) => (
          <LegoCard
            key={lego.setID}
            title={lego.name}
            subTitle={`${lego.number} - ${lego.rating} stars`}
            header={<img src={lego.image.imageURL} />}
          ></LegoCard>
        ))}
      </LegoContainer>
    </>
  );
};

export default HomePage;

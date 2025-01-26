import { useEffect, useState } from 'react';
import * as legoService from '../../services/legoService';
import { Filters, HomePageContainer, LegoCard, LegoContainer } from './styles';
import { Link } from 'react-router';

const HomePage = () => {
  const [legos, setLegos] = useState([]);
  // const navigate = useNavigate();

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
      <HomePageContainer>
        <Filters>
          <label htmlFor='releaseYear'>Release Year</label>
          <ul
            style={{
              textDecoration: 'none ',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <li>
              <input type='checkbox' /> 2025
            </li>
            <li>
              <input type='checkbox' /> 2024
            </li>
            <li>
              <input type='checkbox' /> 2023
            </li>
            <li>
              <input type='checkbox' /> 2022
            </li>
          </ul>
        </Filters>
        <LegoContainer>
          {legos?.map((lego) => (
            <LegoCard
              key={lego.setID}
              title={lego.name}
              subTitle={`${lego.number} - ${lego.rating} stars`}
              header={
                <Link to={`/lego-sets/${lego.setID}`}>
                  <img src={lego.image.imageURL} />
                </Link>
              }
            ></LegoCard>
          ))}
        </LegoContainer>
      </HomePageContainer>
    </>
  );
};

export default HomePage;

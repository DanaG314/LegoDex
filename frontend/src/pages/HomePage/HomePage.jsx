import { useContext, useEffect, useState } from 'react';
import * as legoService from '../../services/legoService';
import { HomePageContainer, LegoCard, LegoContainer } from './styles';
import { Link } from 'react-router';
import { SearchContext } from '../../searchContext';

const HomePage = () => {
  const [legos, setLegos] = useState([]);
  const search = useContext(SearchContext);

  useEffect(() => {
    // fetch legos on pageload
    const fetchLegos = async () => {
      try {
        let response = null;
        // check if search is present
        if (search) {
          // use search route
          response = await legoService.search(search); // calls legoService.search(search) to search for legosets based on the query
        } else {
          // otherwise use index
          response = await legoService.index();
        }
        setLegos(response.sets); // updates the legos state with the fetched sets from API response
        localStorage.setItem('legos', JSON.stringify(response.sets)); // saves the fetched lego sets to the browser's localStorage in JSON
      } catch (error) {
        console.error('Error fetching Lego sets:', error);
      }
    };
    fetchLegos();
  }, [search]); // runs when the search value changes

  return (
    <>
      <h1>Lego Sets</h1>
      <HomePageContainer>
        <LegoContainer>
          {legos?.map((lego) => (
            <LegoCard
              key={lego.setID}
              title={lego.name}
              subTitle={`${lego.number} - ${lego.rating} ⭐️`}
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

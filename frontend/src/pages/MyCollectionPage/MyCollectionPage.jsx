import * as userLegoService from '../../services/userLegoService';
import { useEffect, useState } from 'react';
import { LegoContainer, LegoCard } from '../HomePage/styles';
import { Link } from 'react-router';
import { PageContainer } from './styles';

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
  const wishlistSets = mySets.filter((set) => set.inWishlist);
  const collectionSets = mySets.filter((set) => !set.inWishlist);

  return (
    <>
      <h1>My Collection</h1>
      <PageContainer>
        <LegoContainer>
          {collectionSets.map((lego) => (
            <LegoCard
              key={lego.setID}
              title={lego.name}
              subTitle={`${lego?.legoId} - ${lego.rating} ⭐️`}
              header={
                <Link to={`/my-collection/${lego?._id}`}>
                  <img src={lego?.imageURL} />
                </Link>
              }
            />
          ))}
        </LegoContainer>
        <hr />
        <h1>My Wishlist</h1>
        {wishlistSets.map((lego) => (
          <LegoCard
            key={lego.setID}
            title={lego.name}
            subTitle={`${lego?.legoId} - ${lego.rating} ⭐️`}
            header={
              <Link to={`/my-collection/${lego?._id}`}>
                <img src={lego?.imageURL} />
              </Link>
            }
          />
        ))}
      </PageContainer>
    </>
  );
};

export default MyCollectionPage;

{
  /* <h1>Lego Sets</h1>
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
      </HomePageContainer> */
}

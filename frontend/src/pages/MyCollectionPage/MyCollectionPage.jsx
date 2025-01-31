import * as userLegoService from '../../services/userLegoService';
import { useEffect, useState } from 'react';
import { LegoCard } from '../HomePage/styles';
import { Link } from 'react-router';
import { PageContainer } from './styles';
import { Carousel } from 'primereact/carousel';
import { BreadCrumb } from 'primereact/breadcrumb';

// import { SearchContext } from '../../searchContext';

const MyCollectionPage = () => {
  const [mySets, setMySets] = useState([]);
  const items = [{ label: '🏠', url: '/' }, { label: 'My Collection' }];
  const home = { icon: 'pi pi-home', url: '/' };
  // const search = useContext(SearchContext);
  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  // const navigate = useNavigate();

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

  // useEffect(() => {
  //   console.log('Yo');
  //   if (search !== '') {
  //     navigate('/');
  //   }
  // }, [search]);

  console.log('My sets', mySets);
  const wishlistSets = mySets.filter((set) => set.inWishlist);
  const collectionSets = mySets.filter((set) => !set.inWishlist);

  const productTemplate = (lego) => {
    return (
      <LegoCard
        key={lego.setID}
        title={lego.legoName}
        subTitle={`${lego?.legoId}`}
        header={
          <Link to={`/my-collection/${lego?._id}`}>
            <img src={lego?.imageURL} />
          </Link>
        }
      />
    );
  };

  return (
    <>
      <BreadCrumb model={items} home={home} />

      <h1>My Collection</h1>
      <PageContainer>
        {collectionSets.length > 0 ? (
          <Carousel
            value={collectionSets}
            numVisible={3}
            numScroll={3}
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
          />
        ) : (
          <p>No sets in collection yet!</p>
        )}

        <h1>My Wishlist</h1>
        <Carousel
          value={wishlistSets}
          numVisible={3}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
        />
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

import { Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { SearchContext } from '../../searchContext';
// import './NavBar.css';

const CustomNavBar = styled(Menubar)`
  height: 100px;
  background-color: #c42317;
  color: white;
`;

export default function NavBar({ user, setUser, setSearch }) {
  const search = useContext(SearchContext);
  const [searchVal, setSearchVal] = useState(search);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchVal(e.target.value); // updates the search bar state with the current
    // of the input field
    if (e.target.value === '') {
      // explicitly sets searchVal to an empty string ('')
      setSearchVal(''); // even though the first line already sets it to '',
      // this line ensures the state is updated correctly and may act as a safeguard.
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // checks if the key pressed is the Enter key, if it is that means
      // the user wants to preform a search
      setSearch(searchVal); // this updates the search state, the value used for
      // this search is taken from searchVal which shows the users current input in the
      // search bar.
    }
  };

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  }

  const itemRenderer = (item) => (
    <a className='flex align-items-center p-menuitem-link color-white'>
      <span className={item.icon} />
      <span className='mx-2'>{item.label}</span>
      {item.badge && <Badge className='ml-auto' value={item.badge} />}
      {item.shortcut && (
        <span className='ml-auto border-1 surface-border border-round surface-100 text-xs p-1'>
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        navigate('/');
      },
    },
  ];
  const userSets = {
    label: 'Sets',
    icon: 'pi pi-search',
    items: [
      {
        label: 'New Releases',
        icon: 'pi pi-bolt',
        template: itemRenderer,
      },
      {
        label: 'Retiring Soon',
        icon: 'pi pi-server',
        template: itemRenderer,
      },
      {
        label: 'My Collection',
        icon: 'pi pi-pencil',
        template: itemRenderer,
        command: () => navigate('/my-collection'),
      },
      {
        label: 'My Wishlist',
        template: itemRenderer,
        command: () => navigate('/my-wishlist'),
      },
    ],
  };

  if (user) {
    items.push(userSets);
  }

  // const start = (            <------- use later for LEGODEX logo
  //   <img
  //     alt='logo'
  //     src='https://primefaces.org/cdn/primereact/images/logo.png'
  //     height='40'
  //     className='mr-2'
  //   ></img>
  // );

  const end = (
    <div className='align-items-center gap-2' style={{ display: 'flex' }}>
      <InputText
        placeholder='Search...'
        value={searchVal}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type='text'
        className='w-8rem sm:w-auto'
        style={{ marginRight: 5 }}
      />

      {user ? (
        <>
          <span className='p-menuitem-link'>
            Welcome, {user?.name}&nbsp;|&nbsp;
          </span>
          <a
            className='p-menuitem-link'
            style={{ marginLeft: 5, marginRight: 5 }}
            onClick={handleLogOut}
          >
            Log Out
          </a>
        </>
      ) : (
        <>
          <Link
            className='p-menuitem-link'
            style={{ marginLeft: 5, marginRight: 5 }}
            to='/login'
          >
            Log In
          </Link>
          <Link
            className='p-menuitem-link'
            style={{ marginLeft: 5, marginRight: 5 }}
            to='/signup'
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );

  return (
    <div className='card'>
      <CustomNavBar model={items} end={end} />
    </div>
  );
}

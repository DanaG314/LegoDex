import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import styled from 'styled-components';
// import './NavBar.css';

const CustomNavBar = styled(Menubar)`
  height: 100px;
`;

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  }

  const itemRenderer = (item) => (
    <a className='flex align-items-center p-menuitem-link'>
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
    {
      label: 'Sets',
      icon: 'pi pi-search',
      items: [
        {
          label: 'All Sets',
          icon: 'pi pi-bolt',
          template: itemRenderer,
        },
        {
          label: 'Themes',
          icon: 'pi pi-server',
          template: itemRenderer,
        },
        {
          label: 'Release Year',
          icon: 'pi pi-pencil',
          template: itemRenderer,
        },
        {
          separator: true,
        },
      ],
    },
  ];

  const start = (
    <img
      alt='logo'
      src='https://primefaces.org/cdn/primereact/images/logo.png'
      height='40'
      className='mr-2'
    ></img>
  );

  const end = (
    <div className='align-items-center gap-2' style={{ display: 'flex' }}>
      <InputText
        placeholder='Search...'
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
    // <nav className='NavBar'>
    //   <NavLink to='/'>Home</NavLink>
    //   &nbsp; | &nbsp;
    //   {user ? (
    //     <>
    //       <NavLink to='/my-collection'>My Collection</NavLink>
    //       &nbsp; | &nbsp;
    //       <Link to='' onClick={handleLogOut}>
    //         Log Out
    //       </Link>
    //       &nbsp; | &nbsp;
    //       <span>Welcome, {user.name}</span>
    //     </>
    //   ) : (
    //     <>
    //       <NavLink to='/login'>Log In</NavLink>
    //       &nbsp; | &nbsp;
    //       <NavLink to='/signup'>Sign Up</NavLink>
    //     </>
    //   )}
    // </nav>

    <div className='card'>
      <CustomNavBar model={items} end={end} />
    </div>
  );
}

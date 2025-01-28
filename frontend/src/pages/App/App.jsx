import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import './App.css';
import HomePage from '../HomePage/HomePage';
import LegoDetailsPage from '../LegoDetailsPage/LegoDetailsPage';
import MyCollectionPage from '../MyCollectionPage/MyCollectionPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import { PrimeReactProvider } from 'primereact/api';
import { SearchContext } from '../../searchContext';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={search}>
      <PrimeReactProvider>
        <main className='App'>
          <NavBar user={user} setUser={setUser} setSearch={setSearch} />
          <section id='main-section'>
            <Routes>
              {/* if no user available render auth routes */}
              {user ? (
                <Route path='/my-collection' element={<MyCollectionPage />} />
              ) : (
                <>
                  <Route
                    path='/signup'
                    element={<SignUpPage setUser={setUser} />}
                  />
                  <Route
                    path='/login'
                    element={<LoginPage setUser={setUser} />}
                  />
                </>
              )}

              <Route path='/' element={<HomePage />} />
              <Route
                path='/lego-sets/:legoSetId'
                element={<LegoDetailsPage user={user} />}
              />
            </Routes>
          </section>
        </main>
      </PrimeReactProvider>
    </SearchContext.Provider>
  );
}

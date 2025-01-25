import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import './App.css';
import HomePage from '../HomePage/HomePage';
import PostListPage from '../PostListPage/PostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import { PrimeReactProvider } from 'primereact/api';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <PrimeReactProvider>
      <main className='App'>
        <NavBar user={user} setUser={setUser} />
        <section id='main-section'>
          {user ? (
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/posts' element={<PostListPage />} />
              <Route path='/posts/new' element={<NewPostPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route
                path='/signup'
                element={<SignUpPage setUser={setUser} />}
              />
              <Route path='/login' element={<LoginPage setUser={setUser} />} />
            </Routes>
          )}
        </section>
      </main>
    </PrimeReactProvider>
  );
}

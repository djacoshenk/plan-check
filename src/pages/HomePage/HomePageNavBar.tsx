import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { Link } from 'react-router-dom';

import { ReactComponent as PencilLogo } from 'assets/pencil.svg';

import 'pages/HomePage/HomePageNavBar.css';

const LINKS = [
  {
    name: 'Solutions',
    path: '/solutions',
  },
  {
    name: 'Company',
    path: '/company',
  },
];

export function HomePageNavBar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <nav className='home-page-nav-bar-container'>
      <div className='home-page-nav-bar-logo-container'>
        <PencilLogo height={32} width={32} />
        <h1 className='home-page-nav-bar-title'>Plan Check</h1>
      </div>
      <Hamburger
        toggled={menuIsOpen}
        toggle={setMenuIsOpen}
        color='rgba(0, 0, 0)'
        label='open menu'
      />
      <div
        className={`home-page-nav-bar-links-btns-container ${
          menuIsOpen ? 'mobile' : ''
        }`}
      >
        <div className='home-page-nav-bar-links-container'>
          {LINKS.map((link, index) => {
            return (
              <Link
                key={index}
                to={link.path}
                className='home-page-nav-bar-link'
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className='home-page-nav-bar-btns-container'>
          <button type='button' className='home-page-nav-bar-sign-in-btn'>
            Sign In
          </button>
          <button type='button' className='home-page-nav-bar-sign-up-btn'>
            Sign Up
          </button>
          <p className='home-page-nav-bar-sign-in-mobile'>
            Already have an account?{' '}
            <Link to='/sigin' className='home-page-nav-bar-sign-in-link'>
              Sign In
            </Link>{' '}
          </p>
        </div>
      </div>
    </nav>
  );
}

import React, { Suspense, lazy, useState } from 'react';

import { Link } from 'react-router-dom';
import routes from '../../data/routes';
import '../../main.css';

const Menu = lazy(() => import('react-burger-menu/lib/menus/slide'));

const Hamburger = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hamburger-container">
      <nav className="main" id="hambuger-nav">
        <ul>
          {open ? (
            <li className="menu close-menu">
              <div onClick={() => setOpen(!open)} className="menu-hover">&#10005;</div>
            </li>
          ) : (
            <li className="menu open-menu">
              <div onClick={() => setOpen(!open)} className="menu-hover">&#9776;</div>
            </li>
          )}
        </ul>
      </nav>
      <Suspense fallback={<></>}>
        <Menu right isOpen={open}>
          <ul className="hamburger-ul">
            {routes.map((l) => {
              if (l.label !== 'Fundraiser') {
                return (
                  <li key={l.label}>
                    <Link className="hamburger-link" to={l.path} onClick={() => setOpen(!open)}>
                      <h3 className={l.index && 'index-li'}>{l.label}</h3>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={l.label}>
                  <Link className="hamburger-link" to={l.path} onClick={() => setOpen(!open)}>
                    <h3 className={l.index && 'index-li'}><div style={{ color: '#FF0000' }}>{l.label}</div></h3>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Menu>
      </Suspense>
    </div>
  );
};

export default Hamburger;

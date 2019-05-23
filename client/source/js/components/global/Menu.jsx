import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import workAndCoLogoImg from 'img/workco-logo.svg';
import logo from 'img/adaLogo.png';

export default class Menu extends Component {
  render() {
    return (

      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='https://bulma.io'>
            <img src={logo} width='28' height='28' />
          </a>

          <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-start'>

            <NavLink
              activeClassName='Menu-link--active'
              className='Menu-link navbar-item'
              exact
              to={ routeCodes.HOME }
            >
              Home
            </NavLink>
            <NavLink
              activeClassName='Menu-link--active'
              className='Menu-link navbar-item'
              to={ routeCodes.PEOPLE }
            >
              API data example
            </NavLink>
            <NavLink
              activeClassName='Menu-link--active'
              className='Menu-link navbar-item'
              to={ routeCodes.CHARTS }
            >
              Charts
            </NavLink>
            <NavLink
              activeClassName='Menu-link--active navbar-item is-active'
              className='Menu-link navbar-item'
              to={ routeCodes.LANDING }
            >
              Landing
            </NavLink>
            <NavLink
              activeClassName='Menu-link--active navbar-item is-active'
              className='Menu-link navbar-item'
              to='/404'
            >
              404
            </NavLink>


          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                <a className='button is-primary'>
                  <strong>Sign up</strong>
                </a>
                <a className='button is-light'>
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>



    );
  }
}

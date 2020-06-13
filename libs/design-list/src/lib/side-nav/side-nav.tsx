import React from 'react';

import './side-nav.scss';
import {Nav} from "react-bootstrap";
import {MdFormatListBulleted, MdInfo, MdSettings} from "react-icons/md";

/* eslint-disable-next-line */
export interface SideNavProps {}

export const SideNav = (props: SideNavProps) => {
  return (
    <div className="side-nav">
      <div className="logo">
        <h1>
          VEC
        </h1>
      </div>

      <Nav defaultActiveKey="/home" className="flex-column side-nav-rail" variant="tabs">
        <Nav.Link href='/design-list' className='side-link' >
          <MdFormatListBulleted/>
        </Nav.Link>
        <Nav.Link href='/design-list/about' className='side-link' >
          <MdInfo/>
        </Nav.Link>
        <Nav.Link href='/design-list/settings' className='side-link' >
          <MdSettings/>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default SideNav;

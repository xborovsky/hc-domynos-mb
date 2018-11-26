import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import * as logo from '../../resources/img/logo.png';

const Footer = () =>
    <footer>
      <div style={{ marginBottom: '5px' }}>
        <Avatar alt="Logo HC Domynos Praha" src={logo} className="logo center-block" />
      </div>
      <div>Created by Marek Borovský</div>
    </footer>
;

export default Footer;

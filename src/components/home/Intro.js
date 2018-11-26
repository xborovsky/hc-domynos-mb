import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';

import * as cover from '../../resources/img/cover.jpg';
import * as logo from '../../resources/img/logo.png';

const Intro = () =>
    <div className="cover-wrapper">
        <Zoom>
            <img src={cover} alt="Cover" className="cover-img" />
        </Zoom>

        <Fade left cascade delay={700} big>
            <div className="overlay-wrapper">
                <div className="overlay-rect"></div>
                <div className="overlay-rect"></div>
                <div className="overlay-rect"></div>
            </div>
        </Fade>

        <Flip delay={1500}>
            <div className="logo-wrapper">
                <img src={logo} alt="Logo" />
            </div>
        </Flip>
    </div>
;

export default Intro;
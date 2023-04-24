import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter'
import { Provider } from 'react-redux';
import store from './utils/Redux/store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faFacebookF, faInstagram, faLinkedin, faLinkedinIn, faRedditAlien, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faBars, faXmark, faLocationDot, faHeart, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, faCalendarDay, faLessThan, faShareNodes, faGauge, faGaugeHigh, faChair, faDoorOpen, faSuitcase, faChargingStation, faBoxOpen, faCarOn, faTrashCan, faRightFromBracket, faUser, faBookmark, faStar, faCircle, faUserGear, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { faEyeSlash, faEye, faSnowflake } from '@fortawesome/free-regular-svg-icons';

library.add(faFacebook, faTwitter, faInstagram, faLinkedin, faBars, faXmark,
    faLocationDot, faEyeSlash, faEye, faHeart, faChevronDown, faChevronUp,
    faChevronLeft, faChevronRight, faCalendarDay, faLessThan, faShareNodes,
    faSnowflake, faGauge, faGaugeHigh, faChair, faDoorOpen, faSuitcase,
    faChargingStation, faBoxOpen, faCarOn, faTrashCan, faFacebookF, faWhatsapp,
    faLinkedinIn, faInstagram, faRedditAlien, faRightFromBracket, faUser, faBookmark,
    faStar, faCircle, faUserGear, faPlus, faPenToSquare, faXmark);


ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </>,
)

// config
import {IS_BROWSER, IS_SERVER} from "../constant";



/**
 * for resetting the scroll and getting to the top of page when redirected
 */
if (IS_BROWSER)
    window.jumpScrollToTop_offset = 0;
//
export const jumpScrollToTop = () => {
    if (IS_SERVER)
        return;

    // time out is for making sure if the new component script has loaded
    setTimeout(() => $('html,body').animate({scrollTop: window.jumpScrollToTop_offset}, 'fast'), 200);
}

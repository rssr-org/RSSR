// config
import {IS_BROWSER, IS_SERVER} from "../constant";



/**
 * for reset scroll and got to top of page when redirect
 */
if (IS_BROWSER)
    window.jumpScrollToTop_offset = 0;
//
export const jumpScrollToTop = () => {
    if (IS_SERVER)
        return;

    // time out is for ensure new component script loaded
    setTimeout(() => $('html,body').animate({scrollTop: window.jumpScrollToTop_offset}, 'fast'), 200);
}
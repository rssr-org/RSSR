/**
 *  IS_BROWSER in client is 'true' and in server is 'false' and IS_SERVER is reversed
 */
export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER = !IS_BROWSER;

export const IS_DEVELOPMENT =  process.env.NODE_ENV === 'development';
export const IS_PRODUCTION =  process.env.NODE_ENV === 'production';





/**
 * is IOS device
 */
export const isIOS = IS_BROWSER ? !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) : false;





/**
 * is PWA mode
 */
export const isPWA = IS_BROWSER ? window.matchMedia('(display-mode: standalone)').matches : false;





/**
 * API_HOST_IN_CLIENT (in .env file) use in browser for AJAX request and
 * API_HOST_IN_SERVER in server (node js) for HTTP request (fetch data)
 *
 * this routes can be equal for two side but
 * in server (fetch data) is better use API machine IP.
 * for example:
 *     API_HOST_IN_CLIENT = https://api.site.com
 *     API_HOST_IN_SERVER = 192.168.2.1
 */
export const API_DOMAIN = IS_BROWSER ? process.env.API_HOST_IN_CLIENT : process.env.API_HOST_IN_SERVER;





/**
 * use to flash in loading items
 */
export const LOADING_CLASS = 'animated flash infinite d-2s';





/**
 * regex pattern
 * use for validation form
 */
export const regexp = {
    //like: m.ebrahimiaval@gmail.com
    email: '((([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})))',

    //like: 09199624169 OR +989199624169
    mobileNumber: '(^(\\+98|0)?9\\d{9}$)',

    // user password (like: SignInForm)
    password: '(^.{8,62}$)',
};
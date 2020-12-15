import serialize from "serialize-javascript";

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
 * regex pattern
 * use for validation form
 */
export const regexp = {
    //like: m.ebrahimiaval@gmail.com
    email: '((([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})))',

    //like: 09199624169 OR +989199624169
    mobileNumber: '(^(\\+98|0)?9\\d{9}$)',

    // user password (like: SignInForm)
    password: '(^.{6,64}$)',
};



// used in <Index/> for optimize SEO
export const SITE_SCHEMA = serialize({
    "@context":                  "http://schema.org",
    "@type":                     "LocalBusiness",
    "name":                      "your site title",
    "@id":                       "https://www.your-site-domain.com",
    "url":                       "https://your-site-domain.com",
    "image":                     "https://your-site-domain.com/app-logo.png",
    "logo":                      "https://your-site-domain.com/app-logo.png",
    "telephone":                 "+989199624169",
    "geo":                       {
        "@type":     "GeoCoordinates",
        "latitude":  35.8439292, // your location
        "longitude": 50.9544032 // your location
    },
    "contactPoint":              [
        {
            "@type":       "ContactPoint",
            "telephone":   "your phone number",
            "contactType": "customer service"
        }
    ],
    "openingHoursSpecification": {
        "@type":     "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Saturday",
            "Sunday"
        ],
        "opens":     "08:00",
        "closes":    "23:00"
    },
    "sameAs":                    [
        "https://www.instagram.com/your-social-media-account"
    ]
})
/**
 * API path of your application.
 * exp:
 *  if you get home page data from 'https://api.site.com/home, you must
 *  define 'https://api.site.com' as API_HOST_IN_CLIENT and API_HOST_IN_SERVER
 *  in .env file in root of project, then in below api object define 'home' property with '/home' value
 *  and in fetchData method use 'api.home' to access to api url.
 */
let api = {
    // authentication
    signin: '5d70abc13300004d0077933f',
    signup: '5d70abc13300004d0077933f',
    userDetails: '5d70aee23300005a00779357',
    forgetPassword : '5d288a902c0000e3393edae5',
    resetPassword: {
        trust: '5d288a902c0000e3393edae5',
        submit: '5d288a902c0000e3393edae5',
    },
    skeleton:'5d28ae9e2c00005d693edbc8',
    posts: '5d2881ef2c00008b633edab0',
    post: (id) => '5d28ae9e2c00005d693edbc8?id=' + id,
}

export {api};

/**
 * API path of your application.
 * exp:
 *  if you get home page data from 'https://api.site.com/home, you must
 *  define 'https://api.site.com' as API_HOST_IN_CLIENT and API_HOST_IN_SERVER
 *  in .env file in root of project, then in api object down below define 'home' property with '/home' value
 *  and in fetchData method use 'api.home' to access to api url.
 */
let api = {
    // authentication
    signin: '/signin',
    signup: '/signup',
    userDetails: '/userDetails',
    forgetPassword : '/forgetPassword',
    resetPassword: {
        trust: '/resetPasswordTrust',
        submit: '/resetPasswordSubmit',
    },
    skeleton:'/skeleton',
    posts: '/posts',
    post: id => '/posts/' + id,
}

export {api};

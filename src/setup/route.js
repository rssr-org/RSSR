export const route = {
    home: '/',
    post: id => '/post/' + id,
    resetPassword: token => '/reset-password/' + token,

    // --- sign in,up ---
    sign: type => '/sign/' + type,
}


// for improving DX
route.signIn = route.sign('in')
route.signUp = route.sign('up')

export const route = {
    home: '/',
    post: (id) => '/post/' + (id !== undefined ? id : ':postId'),
    resetPassword: (token) => '/reset-password/' + token,
};

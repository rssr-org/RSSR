export const cookie = {
    remove: function (cookieName) {
        cookie.set(cookieName, undefined, -1)
    },



    set: function (cookieName, cookieValue, exdays) {
        if (!exdays)
            exdays = 3650; // 10 year

        cookieValue = JSON.stringify(cookieValue);

        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    },



    /**
     * if exist return value else return  undefined
     * @param cname {string}: cookie name
     * @returns {string|undefined}
     */
    get: function (cookieName) {
        const name = cookieName + "=";
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ')
                cookie = cookie.substring(1)
            if (cookie.indexOf(name) === 0)
                return JSON.parse(cookie.substring(name.length, cookie.length))
        }

        return undefined;
    }
}

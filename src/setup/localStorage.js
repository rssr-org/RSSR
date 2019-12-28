import {storage} from "./utility/storage";




export default function () {
    // check browser support
    if (typeof Storage === 'undefined') {
        console.error("browser does not support local storage!");
        return;
    }




    /**
     * version
     */
        // we set static version for each important release to can remove some value of some version.
        // first version is 1 and add one in each time.
    const version = 1;

    // define version for first time
    storage.init('version', version);

    // available version in localstorage (sometime meaning previous version)
    const nowVersion = storage.get('version');





    /**
     * update
     */
    if (nowVersion !== version) {
        // sample of remove value
        // if (nowVersion < 5 && nowVersion > 2) {
        //     localStorage.removeItem('sampleValue');

        // update available vesion
        storage.set('version', version);
    }
}
import storage from "local-storage";


export default function () {
    /**
     * version
     *
     *  we set static version for each important release to can remove some value of some version.
     *  first version is 1 and add one in each time.
     */
    const version = 1;

    // define version for first time
    if (storage('version') === null)
        storage('version', version);

    // available version in localstorage (sometime meaning previous version)
    const nowVersion = storage('version');





    /**
     * UPDATE
     *
     * you can access to last value by version number for remove or edit
     */
    if (nowVersion !== version) {
        // UPDATE sample:
        // if (nowVersion < 5 && nowVersion > 2) {
        //     localStorage.removeItem('sampleValue');

        // update available vesion
        storage('version', version);
    }





    /**
     * DEFAULT
     *
     * define default value
     */
    // DEFAULT sample:
    // storage('sampleValue', 'SAMPLE_DEFAULT_VALUE');

}

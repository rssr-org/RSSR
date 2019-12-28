import {IS_SERVER} from "../../../setup/constant";

export const toggleOverLoading = (visible) => {
    if (IS_SERVER)
        return;

    document.getElementById('over-loading-wrap').style.display = (visible ? 'block' : 'none')
};
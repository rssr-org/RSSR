import als from "async-local-storage";
import {render} from "./render";
import {fetchProvider} from "./fetchProvider";
import {initialize} from "./initialize";
import {skeletonFetchProvider} from "./skeletonFetchProvider";
import {errorLogger} from "../../setup/utility/errorLogger";
import "../../setup/axiosConfig";


export default function serverRenderer() {
    // start async-local-storage
    als.enable();

    return async (req, res) => {
        // each request need unique scope to can define and work with variables over the request
        als.scope();

        // make response
        const response = (error) => render(error, req, res);

        try {
            // define basic parameters
            initialize(req);

            // handle skeleton data (App.skeleton)
            try {
                await skeletonFetchProvider(req);
            } catch (err) {
                errorLogger('SKELETON >', err, false, req);
            }

            // call fetch() of component and get data
            fetchProvider(req)
                .then(() => response()) // get data successfully
                .catch((err) => response(err)); // occur error in fetchProvider() or render()
        } catch (err) {
            response(err) // occur error in try
        }
    };
}

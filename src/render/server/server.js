import {render} from "./render";
import {fetchProvider} from "./fetchProvider";
import {initialize} from "./initialize";
import {skeletonServerProvider} from "../../Partial/skeleton/skeletonServerProvider";
import "../../setup/axiosConfig";


export default function serverRenderer() {
    return async (req, res) => {

        // DUCT is a channel to access and pass data between sections
        // and will be completed in initialize() method
        const DUCT = {req, res}


        //------- Test of Memory usage-----------//
        //--------------------------------------//
        // const used = process.memoryUsage();
        // let str = '';
        // for (let key in used) {
        //     if (key !== 'external')
        //         str += ` ${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB  /  `
        // }
        // console.log(str)
        //
        // DUCT.bigArray =Array(1e6).fill("some string");
        //--------------------------------------//
        //--------------------------------------//


        // make response
        const response = (error) => render(error, DUCT);

        try {
            // define basic parameters
            initialize(DUCT);

            // handle skeleton data
            await skeletonServerProvider(DUCT);

            // call fetch() of component and get data
            fetchProvider(DUCT)
                .then(() => response()) // get data successfully
                .catch((err) => response(err)); // return error if any occured in fetchProvider() or render()
        } catch (err) {
            response(err) // return error occurance in try
        }
    }
}

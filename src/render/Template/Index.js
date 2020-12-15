import React from 'react';
import serialize from "serialize-javascript";
import {IS_PRODUCTION, SITE_SCHEMA} from "../../setup/constant";


function Index({renderedView, helmet, error, DUCT}) {
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()
    const schema = DUCT.schema
    const {FILE_VERSION} = global;

    // transfer data from server to client
    let dataTransfer;
    if (!error) {
        const updatedState = DUCT.updatedState
        const dataExist = Object.getOwnPropertyNames(updatedState).length;
        if (dataExist)
            dataTransfer = 'RSSR_UPDATED_REDUX_STATES =' + serialize(updatedState);
    } else {
        dataTransfer = 'RSSR_PROCCESS_ERROR = true';
    }

    return (
        <html lang="fa" {...htmlAttrs}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="theme-color" content="#c90065"/>
            <link rel="manifest" href="/manifest.json"/>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            <link rel="shortcut icon" href="/app-icon.png" type="image/png"/>
            <link rel="stylesheet" href={`/dist/styles.css${FILE_VERSION}`}/>
            {
                IS_PRODUCTION ?
                    <script src={`/sub-scripts.js${FILE_VERSION}\`}`}/>
                    :
                    ''
            }
        </head>
        <body className="rtl" {...bodyAttrs}>
            <div id="app-root" dangerouslySetInnerHTML={{__html: renderedView}}></div>
            {
                dataTransfer ? <script dangerouslySetInnerHTML={{__html: dataTransfer}}/> : ''
            }
            {
                schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{__html: serialize(schema)}}></script> : ''
            }
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: SITE_SCHEMA}}></script>
            <script src={`/dist/client.js${FILE_VERSION}`}></script>
        </body>
        </html>
    );
}

export default Index;
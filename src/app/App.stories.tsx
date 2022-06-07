import {App} from "./App";
import React from "react";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    name:'AppWithRedux Component',
    component:App,
    decorators:[ReduxStoreProviderDecorator]
}


export const AddBaseExample = (props:any)=>{
    return <App/>

}

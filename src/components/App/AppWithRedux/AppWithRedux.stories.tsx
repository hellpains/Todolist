import {AppWithRedux} from "./AppWithRedux";
import React from "react";
import {ReduxStoreProviderDecorator} from "../../../stories/ReduxStoreProviderDecorator";

export default {
    name:'AppWithRedux Component',
    component:AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}


export const AddItemFormBaseExample = (props:any)=>{
    return <AppWithRedux/>

}

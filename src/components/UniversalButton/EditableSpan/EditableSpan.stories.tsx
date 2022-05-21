import {EditableSpan} from "./EditableSpan";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    name:'EditableSpan Component',
    component:EditableSpan
}

const callback = action('span wanted change')

export const AddItemFormBaseExample = (props:any)=>{
    return <EditableSpan title={'Start value'} onChange={callback}/>
}

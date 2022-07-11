import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    name: 'AddItemForm Component',
    component: AddItemForm
}

const addItem = action('Button add was pressed inside the form ')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={addItem}/>
}


export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={addItem} disabled={true}/>
}

import {createRef} from 'react'


export const navigationRef = createRef();

export function navigate(name, params){
    if(navigationRef.current?.navigate){
        navigationRef.current.navigate(name,params);
    }
}
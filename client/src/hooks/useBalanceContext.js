import { BalanceContext } from "../context/BalanceContext";
import { useContext } from "react";

export const useBalanceContext = () =>{
    const context = useContext(BalanceContext)

    if(!context){
        throw Error('conext must be used in balance context proivder')
    }

    return context
}
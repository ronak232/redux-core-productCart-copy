import {createContext, useContext, useState} from "react";

const currenyConverter = createContext(null);

const [fetchCurrency, setFetchCurrency] = useState({
    preferredCurrency:null,
    selectedCountry:null
})

const currenyOption = currenyConverter => useContext(currenyConverter);

const MyCurrency = () =>{








}
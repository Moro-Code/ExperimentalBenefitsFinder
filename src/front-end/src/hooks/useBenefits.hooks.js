import React, {useState, useEffect} from "react";
import {fetchBenefits} from "./utils/fetchBenefits";


export function useBenefits(){
    // flag to track when the fetch is happening
    let [isFetching, setIsFetching] = useState(false);
    // flag to note when the fetch has failed
    let [fetchFailed, setFetchFailed] = useState(false);
    // error object if the fetch failed
    let [fetchFailedError, setFetchFailedError] = useState(null);
    // benefits array
    let [benefits, setBenefits] = useState([]);

    useEffect(() => {
        if(!isFetching && !fetchFailed && benefits.length === 0){
            setIsFetching(true);
            setFetchFailed(false);
            fetchBenefits()
                .then(
                    (data) => {
                        setBenefits(data);
                        setIsFetching(false);
                        setFetchFailed(true);
                        setFetchFailedError(null);
                    }
                )
                .catch(
                    (err) => {
                        setFetchFailed(true);
                        setFetchFailedError(err);
                        setIsFetching(false);
                    }
                );
        }
    });

    return {
        isFetching,
        fetchFailed,
        fetchFailedError,
        benefits
    }
}
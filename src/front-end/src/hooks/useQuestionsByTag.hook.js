import React, {useState, useEffect} from "react";
import {fetchQuestionByTag} from "./utils/fetchQuestionsByTag";

/**
 * react hook to use to fetch questions by tag accross the application
 * @param tag - tag for the question
 * @returns {{fetchFailed: boolean, questions: *[], isFetching: boolean, fetchFailedError: any}} - status of request and fetching of the questions
 */
export function useQuestionsByTagHook(tag){
    // flag to track when fetch is happening
    let [isFetching, setIsFetching] = useState(false);
    // flag to note when the fetch has failed
    let [fetchFailed, setFetchFailed] = useState(false);
    // error object if the fetch failed
    let [fetchFailedError, setFetchFailedError] = useState(null);
    // questions array
    let [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (!isFetching && !fetchFailed && questions.length === 0){
            setIsFetching(true);
            setFetchFailed(false);
            fetchQuestionByTag(tag)
                .then(
                    (data) => {
                        setQuestions(data);
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
        questions
    };
}
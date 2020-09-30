import {STRAPI_URL} from "../../variables";

/**
 * async function to fetch questions from the API by tag
 * @param tag - the tag
 * @returns {Promise<any[]>} - the questions
 * @throws {Error} - request returned bad response
 */
export async function fetchQuestionByTag(tag) {
    let response = await fetch(
        STRAPI_URL + `/questions?tags.tag=${tag}`
    );

    if(response.ok){
        return await response.json();
    }
    let err = new Error("response for questions returned bad response code");
    err.statusCode = response.status;
    err.responseBody = await response.text();
}
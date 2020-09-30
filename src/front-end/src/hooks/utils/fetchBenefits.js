import {STRAPI_URL} from "../../variables";

/**
 * async function to fetch benefits from CMS
 * @returns {Promise<any[]>} - the benefits
 *
 * @throws {Error} - the request returned a non okay response code or network error
 */
export async function fetchBenefits() {
    let response = await fetch(STRAPI_URL + "/benefits")

    if(response.ok){
        return await response.json()
    }

    let err = new Error("response for benefits returned a bad response code")
    err.statusCode = response.status
    err.responseBody = await response.text()
}
/**
 * filter benefits by questions values
 * @param questionData - the filter benefits data
 * @param benefits - the benefits array from strapi
 * @param isFilterQuestions - if we are calculating benefit eligibility for filtered questions
 *
 * @returns [any[], any[]]
 */
export function calculateBenefitEligibility(
    questionData,
    benefits,
    isFilterQuestions = false
){
    let eligibleBenefits = [];
    let uneligibleBenefits = [];

    if(Array.isArray(benefits) && benefits.length > 0 && Object.keys(questionData).length > 0){
        // loop over the benefits array and extract the filters
        for(let benefit in benefits){
            let benefitDataFilters = benefits[benefit]["filters"];

            if(Array.isArray(benefitDataFilters) && benefitDataFilters.length > 0){
                // loop over the filters, here we are going to compare the keys to the question data
                // if all the criteria meets those in the questionData then the benefit will be appended to the array
                // and returned
                let benefitPassedFilters = true;
                let filter = 0;
                while(benefitDataFilters && filter < benefitDataFilters.length){
                    let filterData = benefitDataFilters[filter];
                    let question_id = filterData["question"] ? filterData["question"]["question_id"]: undefined;
                    let operation = filterData["operation"];
                    let value = filterData["value"];

                    // if we have all the parameters and this question is in the questionData array
                    if(question_id && operation && value){
                        let questionValue = questionData[question_id];

                        if (questionValue){
                            if(operation === "equal"){
                                benefitPassedFilters = `${questionValue}` === value;
                            }

                            else if(operation === "greater_than"){
                                benefitPassedFilters = `${questionValue}` > value;
                            }

                            else if(operation === "less_than"){
                                benefitPassedFilters = `${questionValue}` < value;
                            }

                            else if(operation === "greater_or_equal"){
                                benefitPassedFilters = `${questionValue}` >= value;
                            }

                            else if(operation === "less_or_equal"){
                                benefitPassedFilters = `${questionValue}` <= value;
                            }

                            else{
                                benefitPassedFilters = false;
                            }
                        }
                        // if this is a filter question we tolerate missing keys in the questionsData argument
                        else if (! isFilterQuestions){
                            benefitPassedFilters = false;
                        }

                    }
                }

                if(benefitPassedFilters){
                    eligibleBenefits.push(benefits[benefit]);
                }
                else{
                    uneligibleBenefits.push(benefits[benefit]);
                }
            }

        }
    }

    return [eligibleBenefits, uneligibleBenefits];
}
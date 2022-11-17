const LIST_QUESTIONS = `
query ListQuestions($query: QuestionQueryInput, $sort: QuestionSortByInput) {
    questions(query: $query, sortBy: $sort) {
        _id
        qid
        question
        options {
            option
            nextQuestion
            selectedBeer
        }
        edition
    }
}
`;

const ADD_QUESTION = `
mutation AddQuestion($input: QuestionInsertInput!) {
    addedQuestion: insertOneQuestion(data: $input) {
        _id
        qid
        question
        options {
            option
            nextQuestion
            selectedBeer
        }
        edition
    }
}
`;

const REPLACE_QUESTION = `
mutation ReplaceQuestion($query: QuestionQueryInput, $input: QuestionInsertInput!) {
    replacedQuestion: replaceOneQuestion(query: $query, data: $input) {
        _id
        qid
        question
        options {
            option
            nextQuestion
            selectedBeer
        }
        edition
    }
}
`;

const DEL_QUESTION = `
mutation DeleteQuestion($query: QuestionQueryInput!) {
    deletedQuestion: deleteOneQuestion(query: $query) {
        _id
        qid
        question
        options {
            option
            nextQuestion
            selectedBeer
        }
        edition
    }
}
`;

export { LIST_QUESTIONS, ADD_QUESTION, REPLACE_QUESTION, DEL_QUESTION };

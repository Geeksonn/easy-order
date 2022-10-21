import { REALM_GRAPHQL_ENDPOINT, generateHeaders } from '@lib/realmClient';
import * as queries from './queries';

const listQuestions = async (query) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.LIST_QUESTIONS,
            variables: {
                query: query,
                sort: 'QID_ASC',
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    if (result.errors) {
        return { error: result.errors };
    } else {
        return result.data.questions;
    }
};

const addQuestion = async (question) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.ADD_QUESTION,
            variables: {
                input: question,
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    if (result.errors) {
        return { error: result.errors };
    } else {
        return result.data.addedQuestion;
    }
};

const deleteQuestion = async (question) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.DEL_QUESTION,
            variables: {
                query: { _id: question._id },
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    if (result.errors) {
        return { error: result.errors };
    } else {
        return result.data.deletedQuestion;
    }
};

const updateQuestion = async (question) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.REPLACE_QUESTION,
            variables: {
                query: { _id: question._id },
                input: question,
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    if (result.errors) {
        return { error: result.errors };
    } else {
        return result.data.replacedQuestion;
    }
};

export { listQuestions, addQuestion, deleteQuestion, updateQuestion };

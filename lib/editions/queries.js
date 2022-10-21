const LIST_EDITIONS = `
query ListEditions ($query: EditionQueryInput, $sort: EditionSortByInput) {
    editions(query: $query, sortBy: $sort) {
        _id
        active
        date {
            month
            year
        }
        name
    }
}
`;

const ADD_EDITION = `
mutation AddEdition ($input: EditionInsertInput!) {
    addedEdition: insertOneEdition(data: $input) {
        _id
        active
        date {
            month
            year
        }
        name
    }
}
`;

const UPDATE_ALL_EDITIONS = `
mutation UpdateAllEditions ($set: EditionUpdateInput!) {
    updateManyEditions(set: $set) {
        matchedCount
        modifiedCount
    }
}
`;

const UPDATE_EDITION = `
mutation UpdateEdition ($query: EditionQueryInput, $set: EditionUpdateInput!) {
    updateOneEdition(query: $query, set: $set) {
        _id
        active
        date {
            month
            year
        }
        name
    }
}
`;

const DELETE_EDITION = `
mutation DeleteEdition ($query: EditionQueryInput!) {
    deleteOneEdition(query: $query) {
        _id
        active
        date {
            month
            year
        }
        name
    }
}
`;

export { LIST_EDITIONS, ADD_EDITION, UPDATE_ALL_EDITIONS, UPDATE_EDITION, DELETE_EDITION };
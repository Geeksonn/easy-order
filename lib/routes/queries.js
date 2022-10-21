const LIST_ROUTES = `
query ListRoutes ($query: RouteQueryInput, $sort: RouteSortByInput){
    routes(query: $query, sortBy: $sort) {
        _id
        name
        beers {
            order
            name
        }
        edition
    }
}
`;

const ADD_ROUTE = `
mutation AddRoute ($input: RouteInsertInput!) {
    addedRoute: insertOneRoute(data: $input) {
        _id
        name
        beers {
            order
            name
        }
        edition
    }
}
`;

const DEL_ROUTE = `
mutation DeleteRoute($query: RouteQueryInput!) {
    deletedRoute: deleteOneRoute(query: $query) {
        _id
        name
        beers {
            order
            name
        }
        edition
    }
}
`;

const UPDATE_ROUTE = `
mutation UpdateRoute ($set: RouteUpdateInput!, $query: RouteQueryInput) {
    updatedRoute: updateOneRoute(set: $set, query: $query) {
        _id
        name
        beers {
            order
            name
        }
        edition
    }
}
`;

export {LIST_ROUTES, ADD_ROUTE, DEL_ROUTE, UPDATE_ROUTE}
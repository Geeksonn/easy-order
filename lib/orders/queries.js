const LIST_ORDERS = `
query ListOrders ($sort: OrderSortByInput, $query: OrderQueryInput) {
    orders(sortBy: $sort, query: $query, limit: 0) {
        _id
        currency
        date
        items {
            _id
        name
        type
        brewery
        degree
        ibu
        image
        imageCard
        price
        currency
        description
        edition
          }
        totalPrice
    }
}
`;

const ADD_ORDER = `
mutation AddOrder($input: OrderInsertInput!) {
    addedOrder: insertOneOrder(data: $input) {
        _id
        currency
        date
        items {
            _id
        name
        type
        brewery
        degree
        ibu
        image
        imageCard
        price
        currency
        description
        edition
          }
        totalPrice
    }
  }
`;

/*
const DEL_ORDER = `
mutation DeleteOrder($input: OrderQueryInput!) {
    deletedOrder: deleteOneOrder(query: $input) {
        _id
        currency
        date
        items
        totalPrice
    }
}
`;
*/

export { LIST_ORDERS, ADD_ORDER /*, DEL_ORDER*/ };

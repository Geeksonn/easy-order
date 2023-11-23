const LIST_ITEMS = `
query ListItems ($query: ItemQueryInput, $sort: ItemSortByInput) {
    beers(query: $query, sortBy: $sort) {
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
}
`;

const ADD_ITEM = `
mutation AddItem($input: ItemInsertInput!) {
    addedItem: insertOneItem(data: $input) {
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
  }
`;

const DEL_ITEM = `
mutation DeleteItem($input: ItemQueryInput!) {
    deletedItem: deleteOneItem(query: $input) {
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
}
`;

const UPDATE_ITEM = `
mutation UpdateItem($query: ItemQueryInput, $set: ItemUpdateInput!) {
    updatedItem: updateOneItem(query: $query, set: $set) {
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
}
`;

export { LIST_ITEMS, ADD_ITEM, DEL_ITEM, UPDATE_ITEM };

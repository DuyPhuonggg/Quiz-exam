const getPagination = (page, size) => {
    const limit = size ? size : 1;
    const offset = page ? (page -1) *limit : 0;
    return { limit, offset};
};

const getPaginationData = (data, page, size) => {
    const {
        count: total_items,
        rows: results
    } = data;
    const current_page = page ? page : 1;
    const total_pages = Math.ceil(total_items/size);

    return { total_items, results, current_page, total_pages};
}

module.exports = {
    getPagination,
    getPaginationData
}
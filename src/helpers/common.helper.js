const {PAGINATION_DEFAULT} = require("../constants/common.constant");
const CommonHelper = {
    getPagination: (page, size) => {
        if (isNaN(page)) page = PAGINATION_DEFAULT.offset;
        if (isNaN(size)) size = PAGINATION_DEFAULT.limit;

        return {
            limit: parseInt(size),
            offset: (parseInt(page) - 1) * parseInt(size)
        };
    },
}

module.exports = CommonHelper;
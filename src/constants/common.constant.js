const AnswersTypes = {
    TRUE: "true",
    FALSE: "false",
};

const EXPIRE_TIME = {
    ACCESS_TOKEN: "60 minutes",
    REFRESH_TOKEN: "1 days"
};

const PAGINATION_DEFAULT = {
    limit: 10,
    offset: 0,
};



module.exports = {
    AnswersTypes,
    EXPIRE_TIME,
    PAGINATION_DEFAULT
};

const ROLE = {
    USER: "user",
    ADMIN: "admin",
    NONE: "none",
};

const GENDER = {
    MALE: "male",
    FEMALE: "female",
    UNKNOWN: "unknown",
}

const WHITE_LIST_ADMIN = [
    'GET/api/v1/users',
]

module.exports = {
    ROLE,
    GENDER,
    WHITE_LIST_ADMIN
}
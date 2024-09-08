const PERMISSION = [
    {
        method: 'ALL',
        base_url: 'all',
        description: 'Have full permissions',
    },
    {
        method: 'GET',
        base_url: '/api/v1/users',
        description: 'Get user(s) infomation',
    },
    {
        method: 'POST',
        base_url: '/api/v1/users',
        description: 'Create new user(s)',
    },
    {
        method: 'PATCH',
        base_url: '/api/v1/users',
        description: 'Updated some information of user(s)',
    },
    {
        method: 'DELETE',
        base_url: '/api/v1/users',
        description: 'Cancel user(s)',
    }
]

module.exports = PERMISSION;
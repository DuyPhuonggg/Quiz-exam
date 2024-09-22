const PERMISSION = [
    {
        method: 'ALL',
        base_url: 'all',
        scope: 'all',
        description: 'Have full permissions',
    },
    {
        method: 'GET',
        base_url: '/api/v1/users',
        scope: 'users',
        description: 'Get user(s) infomation',
    },
    {
        method: 'POST',
        base_url: '/api/v1/users',
        scope: 'users',
        description: 'Create new user(s)',
    },
    {
        method: 'PATCH',
        base_url: '/api/v1/users',
        scope: 'users',
        description: 'Updated some information of user(s)',
    },
    {
        method: 'DELETE',
        base_url: '/api/v1/users',
        scope: 'users',
        description: 'Cancel user(s)',
    },
    {
        method: 'GET',
        base_url: '/api/v1/question',
        scope: 'question',
        description: 'Get question(s) infomation',
    },
    {
        method: 'POST',
        base_url: '/api/v1/question',
        scope: 'question',
        description: 'Create new question(s)',
    },
    {
        method: 'PATCH',
        base_url: '/api/v1/question',
        scope: 'question',
        description: 'Updated some information of question(s)',
    },
    {
        method: 'DELETE',
        base_url: '/api/v1/question',
        scope: 'question',
        description: 'Cancel question(s)',
    },
    {
        method: 'GET',
        base_url: '/api/v1/quiz-exam',
        scope: 'quiz-exam',
        description: 'Get quiz-exam(s) infomation',
    },
    {
        method: 'POST',
        base_url: '/api/v1/quiz-exam',
        scope: 'quiz-exam',
        description: 'Create new quiz-exam(s)',
    },
    {
        method: 'PATCH',
        base_url: '/api/v1/quiz-exam',
        scope: 'quiz-exam',
        description: 'Updated some information of quiz-exam(s)',
    },
    {
        method: 'DELETE',
        base_url: '/api/v1/quiz-exam',
        scope: 'quiz-exam',
        description: 'Cancel quiz-exam(s)',
    }
]

module.exports = PERMISSION;
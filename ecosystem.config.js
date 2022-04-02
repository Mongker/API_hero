module.exports = {
    apps: [
        {
            name: 'base-api',
            script: 'node src/server',
            max_memory_restart: '250M',
        },
    ],
};

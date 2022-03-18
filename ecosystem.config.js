module.exports = {
    apps: [
        {
            name: 'vnr-next',
            script: 'node src/server.js',
            max_memory_restart: '300M',
        },
    ],
};


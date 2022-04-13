const database = {
    file: [
        {
            id: 'c6f8148a-5fb6-4a25-9fdb-ce7be592d640',
            folder: 'start',
            date_string: '6-4-2022',
            fileName: 'g2u8k-kre42',
            size: 60468,
            url: '/api/file/start/6-4-2022/g2u8k-kre42.png',
            timestamps: 1649252729210,
            visit_timestamps: 1649252729211,
            version: '0.0.1',
        },
    ],
    messages: [
        {
            id: 'ff47dfd5-5bd9-48cf-95c5-f75a8345b1b2',
            history_contents: ['[id của db_contents_chat]'],
            use_ids_views: ['[id người được xem và người đăng - người dùng xóa tin nhắn sẽ bị kích khỏi list này]'],
            meId: '[id người đăng bài]',
            version: '0.0.1',
        },
    ],
    contents_chat: [
        {
            id: '[tự sinh]',
            content: 'Hôm nay em mệt',
            media: ['[url link ảnh hoặc file đính kèm]'],
            version: '0.0.1', // [Sau này trình soạn thỏa sẽ thay đổi dữ liệu cũng sẽ khác nên để version để làm đièu kiện render bên client]
            type: 'TEXT [TEXT or MEDIA]',
            timestamps: 1649255580945,
            permissions: {
                ["userId"]: ['ADD', 'PUT', 'DELETE', 'VIEW'], // Gồm có 3 quyền
            },
        },
    ],
    hasMessages: [
        {
            id: '',
            group_id: '[tự sinh]', // Nếu là của người dùng
            name_chat: {
                ["useId"]: 'Con chim nhỏ'
            },
            single_chat: true, // true: là chat đơn - false: là chat riêng
            member: ['Là id của những người trong group chat'],
            messageIds: {
                ["useId"]: [] // Danh sách id của db_messages
            },
            permissions: {
                ["userId"]: 'ADMIN', // [ADMIN or USER] - trong trường hợp chat đơn thì tất cả 2 đều là USER
            },
            version: '0.0.1'
        },
    ],
    users: [
        {
            id: "[tự sinh]",
            version: '0.0.1',
            nickname: '',
            email: '',
            info: '',
            password: '',
            verify: false,
            status: true, // true: là người dùng ở trạng thái hoạt động, false: là người dùng đã khóa tài khoản
            timestamps: 1649252729210,
            visit_timestamps: [1649252729211],
        }
    ]
};

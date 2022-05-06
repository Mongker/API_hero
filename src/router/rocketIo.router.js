/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 10/04/2022
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const socketIO = require('socket.io');

let initRocketRoutes = (server) => {
    const socketIo = socketIO(server, {
        cors: {
            origin: "*",
        }
    });
    socketIo.on("connection", (socket) => {
        console.log("New client connected vs idSocket: " + socket.id);
        socketIo.emit("getId", socket.id)
        socket.on("sendDataClient", function (data) {
            // console.log(data)
            socketIo.emit("sendDataServer", { data });
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
    return server;
};

module.exports = initRocketRoutes;

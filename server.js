/* eslint-disable no-console */

    // require('dotenv').config();
    const express = require('express');
    //const bodyParser = require('body-parser');
    const app = express();
    const port = 4000;
    
    const server = app.listen(`${port}`, function() {
        console.log(`Server started on port ${port}`);
    });
    const io = require('socket.io')(server);
    
    io.on('connection', (socket) => {
        socket.on('draw', data => {
            socket.broadcast.emit('painter', JSON.parse(data) );
             //console.log(data)
        });
     })

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended: false}));
    
    // app.use((req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With, Content-Type, Accept'
    //   );
    //   next();
    // });

      



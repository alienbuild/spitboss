const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { generateMessage } = require('./utils/message');
const { Users } = require('./utils/users');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

// Import: Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Init app
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(3000);
const io = require('socket.io').listen(server);
const users = new Users();

// Init middleware
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

// Database
const dotenv = require('dotenv');dotenv.config();
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));
mongoose.connection.on('error', err => {  console.log(`DB connection error: ${err.message}`)});

// Define routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// New connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // Join
    socket.on('join', (params, callback) => {
        console.log('join params are: ', params);
        // REMINDER: Write validation!
        socket.join(params.room);
        console.log(`${params.user} joined ${params.room}`);
        // Remove user
        users.removeUser(socket.id);
        // Add user
        users.addUser(socket.id, params.user, params.room);
        // Emit Users
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // Requested User List
        socket.on('updateUserList', () => {
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        });
        // Welcome user
        io.to(params.room).emit('newMessage', generateMessage('passthe40', 'Welcome to Pass the 40.'));
        // Announce user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('passthe40', `${params.user} has joined.`));
        //callback();
    });

    // Create message event
    socket.on('createMessage', (message, callback) => {
        console.log(message);
        const user = users.getUser(socket.id);
        // REMINDER: Add validation for empty messages and spam preventation.
        // ie: if user and not string/empty
        if (user) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    // Disconnected
    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        console.log('disconnect msg: ', user);
        // if (user.name) {
        //     console.log(`${user.name} has disconnected.`);
        // } else { console.log('User has disconnected.'); }
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Passthe40', `${user.name} has left.`));
        }
    });

    // Coin Flip
    socket.on('flip', () => {
        const user = users.getUser(socket.id);
        io.to(user.room).emit('coinFlip', { result: 'Coin has been flipped...' });
        setTimeout(() => {
            let result = '';
            x = (Math.floor(Math.random() * 2) == 0);
            if (x) {
                result = 'Heads';
            } else {
                result = 'Tails';
            }
            io.to(user.room).emit('coinFlip', { result: `Coin landed on ${result}` });
        }, 1500);
    });

    // Start vote
    socket.on('startVote', () => {
        const user = users.getUser(socket.id);
        io.to(user.room).emit('votingOpen');
        setTimeout(() => {
            io.to(user.room).emit('votingClosed');
        }, 20000);
        socket.on('vote', (vote) => {
            console.log('vote is: ', vote);
        })
    });

    // Start battle
    socket.on('startBattle', () => {
        const user = users.getUser(socket.id);
        io.to(user.room).emit('startBattle', { result: true });
    })

});

// Start server
app.listen(port, () => console.log(`Server is running port ${port}`));
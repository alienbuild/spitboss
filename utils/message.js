const moment = require('moment');

const generateMessage = (from, text, socketId) => {
    return {
        from,
        text,
        socketId,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage};
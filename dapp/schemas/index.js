const mongoose = require('mongoose');

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.connect(
    'mongodb://localhost',
    {
      dbName: 'multisigwallet',
    },
    (e) => {
      if (e) {
        console.error('연결 에러', e);
      } else {
        console.log('몽고 디비 연결 성공');
      }
    }
  );
};

mongoose.connection.on('error', (e) => {
  console.error('몽고 디비 연결 에러', e);
});

// mongoose.connection.on('disconnected', () => {
//   console.error('연결이 끊겼습니다. 다시 연결을 시도합니다');
//   connect();
// });

module.exports = connect;

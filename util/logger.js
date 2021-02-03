const EventEmitter = require('events');
const dateFormat = require('dateformat');
const path = require('path');

class logger extends EventEmitter {
   log(msg, file) {
      const now = new Date();
      this.emit(
         'log',
         `${dateFormat(
            now,
            'dddd, mmmm dS, yyyy, h:MM:ss TT'
         )}:    ${path.parse(file).base.padEnd(20)}   info      ${msg}`
      );
   }
   warm(msg, file) {
      const now = new Date();
      this.emit(
         'warn',
         `${dateFormat(
            now,
            'dddd, mmmm dS, yyyy, h:MM:ss TT'
         )}:    ${path.parse(file).base.padEnd(20)}   warnning  ${msg}`
      );
   }
   error(msg, file) {
      const now = new Date();
      this.emit(
         'warn',
         `${dateFormat(
            now,
            'dddd, mmmm dS, yyyy, h:MM:ss TT'
         )}:    ${path.parse(file).base.padEnd(20)}   error     ${msg}`
      );
   }
}

const Logger = new logger();
Logger.on('log', (data) => {
   console.log(data);
});
Logger.on('error', (data) => {
   console.error(data);
});
Logger.on('warn', (data) => {
   console.error(data);
});

module.exports = Logger;

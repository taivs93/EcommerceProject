'use strict'
const os = require('os');
const process = require('process');

// count connect
const mongoose = require('mongoose');
const _SECONDS = 5000;

//Mongo DB vẫn sử dụng nhiều truy vấn song song trong connection pool.//poolsize
//Nhiều Service, tiến trình kết nối tới MongoDB.
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections::${numConnection}`);
}

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // Example maximun number of connection based on number of cores
    const maxConnections = numCores * 5;
    
    if(numConnection > maxConnections){
        console.log(`Connection overload detected`);
    }

    console.log(`Active connection: ${numConnection}`); 
    console.log(`Memory usage: ${memoryUsage/1024/1024} MB` );

  }, _SECONDS); //Hàm monitor lặp code nhiều lần theo thời gian cố định.
};

module.exports = {
    countConnect,
    checkOverload
}
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {

  var workers=[];
  //新建worker
  function newWorker(){
    var worker=cluster.fork();

    //监听信息，如果type为broadcast的话，则确定为广播
    worker.on('message', function(msg) {
      if(msg.type=='broadcast'){
        var event=msg.event;
        //向所有worker发送此条广播
        workers.forEach(function(worker){
          worker.send(event);
        })
      }
    });
    return worker;
  }

  for (var i = 0; i < numCPUs; i++) {
    workers.push(newWorker());
  }

    cluster.on('online',function(worker){
        console.log('worker %d is online',worker.id);
    })
} else {
  var worker=cluster.worker;

  //广播就是发送一个type为broadcast的信息，event就是广播内容
  worker.broadcast = function(event){
    worker.send({
      type:'broadcast',
      event:event
    });
  }
  
  worker.on('message',function(event){
    console.log('worker: '+worker.id+' recived event from '+event.workerId);
  })

  //发送广播
  worker.broadcast({
    message:'online',
    workerId:worker.id
  })
}
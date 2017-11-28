const os = require('os');
const path = require('path');
const childProcess = require('child_process');

function createWorkers(count) {
  const workers = [];
  while (workers.length < count) {
    const worker = childProcess.fork(path.join(__dirname, './worker.js'));
    worker.setMaxListeners(1);
    workers.push(worker);
  }
  return workers;
}

const workersCount = os.cpus().length - 1;

module.exports = (function () {
  const workers = createWorkers(workersCount);
  const tasksQueue = [];
  function arrange(task) {
    const worker = workers.pop();
    const { callback } = task;
    worker.send(task);
    worker.once('message', (result) => {
      callback(null, result);
      workers.push(worker); // mission completed
      if (tasksQueue.length > 0) {
        arrange(tasksQueue.pop());
      }
    });
  }
  return {
    queue(task) {
      if (workers.length <= 0) {
        tasksQueue.push(task);
        return;
      }
      arrange(task);
    },
    jobDone() {
      workers.forEach(w => w.kill());
    },
  };
}());

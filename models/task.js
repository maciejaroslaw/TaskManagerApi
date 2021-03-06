const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'tasks.json'
);

const getTasksFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Task {
    constructor(id, title, description, priority){
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
    }

    save(cb) {
        getTasksFromFile(tasks => {
            tasks.push(this);
            fs.writeFile(p, JSON.stringify(tasks), err => {
              if(err){
                cb(err)
              }else{
                cb("success")
              }
            });
        })
    }

    static editTask(taskToEdit, cb){
      getTasksFromFile(tasks => {
        let targetTask = tasks.find(t=>t.id === taskToEdit.id);
        let indexOfTarget = tasks.indexOf(targetTask);

        tasks[indexOfTarget] = taskToEdit;

        fs.writeFile(p, JSON.stringify(tasks), err => {
          if(err){
            cb(err);
          }else{
            cb({status: 'success', task: tasks[indexOfTarget]});
          }
        });
      })
    }

    static deleteTask(id, cb){
      getTasksFromFile(tasks=>{
        // console.log(taskToDelete);
        let taskToDelete = tasks.find(t=>t.id === +id);
        let updatedTasks = tasks.filter(t=>t!=taskToDelete);

        fs.writeFile(p, JSON.stringify(updatedTasks), err => {
          if(err){
            cb(err);
          }else{
            cb("success")
          }
        });
      });
      
    }

    static fetchAll(cb) {
      getTasksFromFile(cb);
    }
}
const Task = require('../models/task');
exports.createTask = (req, res) => {
    Task.fetchAll(tasks => {
        const id = tasks.length > 0 ? +tasks[tasks.length - 1].id+1 : 1;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        const task = new Task(id, title, description, priority);
        task.save(isSaved => {
            if(isSaved === "success"){
                res.status(201).send({message: "Task created!", task: task});
                return;
            }else{
                res.status(500).send({message: isSaved});
                return;
            }
        });
    })
};
exports.getTasks = (req, res) => {
    Task.fetchAll(tasks => {
        res.status(200).send({
            tasks,
        })
    })
};
exports.editTask = (req, res) => {
    for(const [key, val] of Object.entries(req.body.taskToEdit)){
        if(val === "" || val === null){
            res.status(422).send({
                message: `${key} -> Must have value!`
            });
            return;
        }
    }
    
    Task.editTask(req.body.taskToEdit, isSaved => {
        if(isSaved.status === 'success'){
            res.status(200).send({message: "Success", task: isSaved.task})
        }else{
            res.status(500).send({message: isSaved});
        }
    });
};
exports.deleteTask = (req, res) => {
    Task.deleteTask(req.params.id, isDeleted =>{
        res.status(204);
    });
}
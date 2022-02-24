const Task = require('../models/task');
exports.createTask = (req, res) => {
    Task.fetchAll(tasks => {
        const id = tasks.length > 0 ? +tasks[tasks.length - 1].id+1 : 1;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        const task = new Task(id, title, description, priority);
        task.save();
        res.status(201).send({message: "Task created!", task: task});
    })
};
exports.getTasks = (req, res) => {
    Task.fetchAll(tasks => {
        res.status(200).send({
            tasks,
        })
    })
};
exports.getTask = (req, res) => {
    Task.fetchAll(tasks => {
        targetTask = tasks.find(t=>t.id === req.params.id);
        if(targetTask){
            res.status(200).send(targetTask);
        }
    })
}
exports.editTask = (req, res) => {
    for(const [key, val] of Object.entries(req.body.taskToEdit)){
        if(val === "" || val === null){
            res.status(422).send({
                message: `${key} -> Must have value!`
            });
            return;
        }
    }
    
    let editedTask = Task.editTask(req.body.taskToEdit);
    res.status(201).send({message: "Success", editedTask})
};
exports.deleteTask = (req, res) => {
    let isDeleted = Task.deleteTask(req.params.id);
    res.status(204).send({message: isDeleted});
}
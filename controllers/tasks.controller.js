const Task = require('../models/task');
exports.createTask = (req, res) => {
    Task.fetchAll(tasks => {
        const id = tasks.length > 0 ? +tasks[tasks.length - 1].id+1 : 1;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        const task = new Task(id, title, description, priority);
        task.save();
        res.status(200).send({message: "Task created!"});
    })
};
exports.getTasks = (req, res) => {
    Task.fetchAll(tasks => {
        res.send({
            tasks,
        })
    })
};
exports.editTask = (req, res) => {
    Task.editTask(req.body.taskToEdit);
    for(const [key, val] of Object.entries(req.body.taskToEdit)){
        if(val === "" || val === null){
            res.status(422).send({
                message: `${key} -> Must have value!`
            });
            return;
        }
    }
    res.send({message: "Success"})
};
exports.deleteTask = (req, res) => {
    Task.deleteTask(req.params.id);
    res.status(200).send({message: "Propably it worked"});
}
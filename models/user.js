const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'users.json'
);

const getUsersFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = 'user';
  }

  save(cb) {
    getUsersFromFile(users => {
        users.push(this);
        fs.writeFile(p, JSON.stringify(users), err => {
          if(err){
            cb(err);
          }else{
            cb("success")
          }
        });
    })
  }

  static fetchAll(cb) {
    getUsersFromFile(cb);
  }
};

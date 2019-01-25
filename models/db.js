const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/UsersDb',
  { useNewUrlParser: true }, (err) => {
    if (!err) {
      console.log("MongoDB Connection Success")
    } else {
      console.log("Error In DB Connection: " + err)
    }
  }
);

require('./user.model');

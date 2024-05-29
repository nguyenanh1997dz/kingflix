const mongoose = require('mongoose');

function connectToMongoDB(app, PORT) {
  mongoose.connect(process.env.URL_MongoDB)
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `Connected to DB & Server is listening at port ${PORT}`
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = connectToMongoDB;
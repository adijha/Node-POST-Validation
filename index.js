require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => 'You are now connected to Mongo!')
  .catch(err => console.error('Something went wrong', err))

const shopifySchema = new mongoose.Schema({
  data: String,
});

const GoGo = new mongoose.model("GoGo", shopifySchema);

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (request, response) => response.sendFile(`${__dirname}/index.html`));

app.post('/api/data', (request, response) => {
  const postBody = request.body.data;
  console.log(postBody);

  const text = new GoGo({
    data: postBody,
  });
  text.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      response.redirect("/");
    }
  });
});

app.listen(4000, () => console.info('Application running on port 4000'));
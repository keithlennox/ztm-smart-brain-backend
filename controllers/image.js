const Clarifai = require('clarifai'); //Include Clarifai npm package

 //Start of code snippet#1 from Clarifai
const app = new Clarifai.App({
  apiKey: '52215e2d0e7d4c5fb5e0cb1486a66add'
}); //End of code snippet#1 from Clarifai

//Start of code snippet#2 from Clarifai
const handleAPICall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) //.predict() returns a promise.
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
  }//End of code snippet#2 from my Clarifai

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
}
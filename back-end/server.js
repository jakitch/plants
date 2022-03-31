const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const plantSchema = new mongoose.Schema({
    name: String,
    plantType: String,
    potType: String,
});

const Plant = mongoose.model('Plant', plantSchema);

mongoose.connect('mongodb+srv://therock:smallrock@cluster0.oxh0p.mongodb.net/plants?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/api/plants', async(req, res) => {
    try {
        let plants = await Plant.find();
        res.send(plants);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/plants', async(req, res) => {
    try {
        const plant = new Plant({
            name: req.body.name,
            plantType: req.body.plantType,
            potType: req.body.potType
        });
        await plant.save();
        res.send(plant);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/plants/:id', async(req, res) => {
    try {
        await Plant.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3333, () => console.log('Server listening on port 3333...'));
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');

const app = express();

app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`server runs on ${process.env.PORT}`)
});

mongoose.connect(process.env.MONGO_URL)

mongoose.Schema

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const User = mongoose.model('User', userSchema)

// Create
app.post('/users', async (req,res) => {

    try{
        const user = new User(req.body)
        await user.save();
        res.status(201).send(user)
    }catch (error){
        res.status(400).send(error);
    }
});

//Read
app.get('/users', async (req,res) => {
    try {
        const users = await User.find()
        if(!users) {
            res.status(400).send('no user found')
            return
        }
        res.status(200).send(users)
    }catch {
        res.status(500).send(error);
    }
})
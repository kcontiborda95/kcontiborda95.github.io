const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get Posts
router.get('/', async(req,res) => {
   const posts = await loadPostCollection();
   res.send(await posts.find({}).toArray()); 
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        course: req.body.course,
        createdAt: new Date(),
        location: req.body.location, 
        price: req.body.price,
        provider: req.body.provider,
        author: req.body.author
    });
    res.status(201).send();
});


// Delete Posts
router.delete('/:id', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://abc123:sa12345@cluster0-iz0mu.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
});


return client.db('vue_express').collection('posts');
}

module.exports = router;
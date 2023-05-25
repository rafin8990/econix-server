const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nuouh7o.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        await client.connect();
        const productsCollection=client.db('econix-website').collection('products')

        app.get('/products', async(req, res)=>{
            const query={};
            const result=await productsCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/product/:id', async(req, res)=>{
            const id=req.params.id;
            const query={_id: new ObjectId(id)}
            const result=await productsCollection.findOne(query);
            res.send(result)
        })






        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('econix-server is running')
});

app.listen(port, () => {
    console.log(`Econix server is running on port ${port}`);
})
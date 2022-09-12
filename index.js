const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.yaax3wm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const couponCollection = client.db('couponCollection').collection('coupon')

        app.get('/coupons', async (req, res) => {
            const query = {};
            const result = await couponCollection.find(query).toArray();
            res.send(result);
            console.log('all coupons response');
        })

        app.get('/', (req, res) => {
            res.send({ result: 'Done' })
            console.log('responsed');
        })
        app.listen(port, () => {
            console.log(port + ' app is listening');
        })
    }
    finally { }
}
run().catch(console.dir)



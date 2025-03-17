const express = require('express')
const app = express()
require('dotenv').config()
var cors = require('cors')
app.use(express.json());
const port =   process.env.PORT || 3000

// businessDashboard
// tJ2IeONQEDbIp1TU
app.use(cors())





app.get('/', (req, res) => {
  res.send('Hello World!')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bnqcs.mongodb.net/?appName=Cluster0`;

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



     
     const database = client.db("businessDashboardDB");
     const usercollection = database.collection("users");



     app.get("/users/admin/:email",async(req,res)=>{

        let email=req.params.email
  
       
        let query={email}
        let user= await usercollection.findOne(query)
  
        let admin=false
        if(user){
          admin= user?.role === "admin"
        }
  
        res.send({ admin })
  
  
      })


     app.get("/users/user/:email",async(req,res)=>{

        let email=req.params.email
  
       
        let query={email}
        let users= await usercollection.findOne(query)
  
        let user=false
        if(users){
          user= users?.role === "user"
        }
  
        res.send({ user })
  
  
      })
  


     app.post("/users",async(req,res)=>{

        let users=req.body;
        console.log(users)
        let email=users?.email
        let query= {email}
  
        let existingUser= await usercollection.findOne(query)
        if(existingUser){
          return res.status(404).send({message:"Users already existed"})
        }
        const result = await usercollection.insertOne(users);
        res.send(result)
      })














    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
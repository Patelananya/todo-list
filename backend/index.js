const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');
const app=express();

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'anu829',
    database:'todo'
})
db.connect(err=>{
    if(err){
        console.log("Error while connexting to db", err);
        return;
    }
    console.log("DB connected successfully");
})

// app.get('/',(req,res)=>{
//     console.log('default route');
//     res.send("Welcome!");
// })
// app.post('/add-item',(req,res)=>{
//     console.log(req.body);
//     res.send("Item received");
// })

// 1. GET Route (Read all items - Default/Home route)
// This route is set up to fetch all stored to-do items from the database .
app.get('/', async (req, res) => {  // The function uses 'async' keyword 
    db.query("SELECT * FROM todoItems", (err, result) => { // Query structure
        if (err) {
            console.log('Error occurred');// Inferred error handling
            return;
        }
        // Send the fetched data back as the response
        res.send(result); 
    });
});

// 2. POST Route (Create/Add Item)
app.post('/add-item', (req, res) => {
    // The request body contains req.body.text 
    const sql = `INSERT INTO todoItems (itemDescription) VALUES ('${req.body.text}')`; // SQL insertion query structure

    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error occurred'); 
            return; 
        }
        console.log('Created successfully'); 
        res.send("Created successfully"); 
    });
});

// 3. PUT Route (Update/Edit Item)
app.put('/edit-item', (req, res) => {
    console.log("line:54 ", req.body);
    // The query uses item_description and id from the request body 
    // The variables are accessed via req.body.item_description and req.body.id 
    const sql = `UPDATE todoItems SET itemDescription = '${req.body.itemDescription}' WHERE id = ${req.body.ID}`;
    
    db.query(sql, (err, results) => {
        if (err) {
            // Error handling inferred
            return;
        }
        res.send("Updated Successfully");
    });
});

// Note: A DELETE route is mentioned as an assignment for the user,
// but its specific implementation code is not provided in the source material.
app.delete('/delete-item',(req,res)=>{
    const sql=`DELETE from todoItems WHERE ID=${req.body.ID}`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log("Error occurred: ", err);
            return;
        }
        res.send("Deleted successfully");
    })
})


app.listen(3000,()=>{
    console.log("Server running on port 3000");
})
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient ;
const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "taskDB";

mongoClient.connect(connectionUrl, (err, connection) => {
    if(err)
        return console.log(err);
    const db = connection.db(dbName);

    const collection = db.collection("users")

    collection.insertOne({name:"ahmed" , age :20} , (err, data) => {
        if(err) return console.log(err)
        console.log("Inserted successfully")

    })
    collection.insertOne({name:"karam" , age :23} , (err, data) => {
        if(err) return console.log(err)
        console.log("Inserted successfully")

    })
    collection.insertMany([{name : "zyad" , age : 27},
         {name : "Mohamed" , age : 27} ,
         {name : "Mahmood" , age : 27} ,
         {name : "Amira" , age : 27} ,
         {name : "Sameh" , age : 27} ,
         {name : "Ibrahim" , age : 22} ,
         {name : "Kareem" , age : 23} ,
         {name : "Hussien" , age : 21} ,
         {name : "Nour" , age : 21} ,
         {name : "Hagar" , age : 25} ,
        
        ], (err, data) => {
            if(err)
                return console.log(err);
            console.log( "The number of inserted users : " + data.insertedCount);
        })
    collection.find({age :27}).limit(3).toArray((err, data) => {
        if(err)
            return console.log(err);
        console.log( data);    
    })
////////////////////////////////////////////////////////////////////////////////////////////////////
    collection.find({} ).limit(4).toArray((err, data) => { 
     if(err)
        return console.log(err);
    const ids = data.map((item) => item._id)
    collection.updateMany({_id : {$in : ids}} ,{ $set : { name : "reda mohamed"},
        $inc : {age : 4}  
        }).then((data) => console.log(data.modifiedCount))
        .catch((error) => console.log(error));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    collection.updateOne({},{$inc :{age :5} }).then((data) => console.log(data.modifiedCount))
    .catch((error) => console.log(error));

    collection.updateMany({} ,{ $inc : {age : 10}  
                }).then((data) => console.log(data.modifiedCount))
                .catch((error) => console.log(error));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    collection.deleteMany({age :41})
    .then((data) =>
        console.log( "number of deleted user is "+data.deletedCount))
    .catch((error) => console.log(error));
})

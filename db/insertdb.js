var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("testdb");
  var users = [
    { UserID: 1,  Email: 'dvhoang@gmail.com', password: '123456'},
    { UserID: 2, Email: 'dhkhanhly@gmail.com', password: '123456'},
    { UserID: 3, Email: 'lmchau@gmail.com', password: '123456'},
    { UserID: 4, Email: 'dvphuc@gmail.com', password: '123456'},
    { UserID: 5, Email: 'crush@gmail.com', password: '123456'},
    
  ];
  var role = [
      { RoleID:1, RoleName: 'Admin' },
      { RoleID:2, RoleName: 'User' }
  ];
  var userdetail = [
    { UserID:1, Name:'Dao Viet Hoang', PhoneNumber:'0123456789', Address:'Ha Tinh'},
    { UserID:2, Name:'Dang Huynh Khanh Ly', PhoneNumber:'0987654321', Address:'Da Nang'},
    { UserID:3, Name:'Le Minh Chau', PhoneNumber:'0136664789', Address:'Da Nang'},
    { UserID:4, Name:'Dao Viet Phuc', PhoneNumber:'012345555', Address:'Hue'},
    { UserID:5, Name:'Dao Viet Crush', PhoneNumber:'012333789', Address:'Vinh'}
  ];

  //A document in MongoDB is the same as a record in MySQL
  //To insert one doccument we use insertOne()
  //insertMany() To insert multiple documents into a collection
  dbo.collection("User").insertMany(users, function(err, res) {
    if (err) throw err;
    db.close();
  });
  dbo.collection("Role").insertMany(role, function(err, res) {
    if (err) throw err;
    db.close();
  });
  dbo.collection("UserDetail").insertMany(userdetail, function(err, res) {
    if (err) throw err;
    db.close();
  });
  console.log("insert data success!");
});
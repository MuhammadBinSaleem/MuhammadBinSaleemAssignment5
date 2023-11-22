const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path =require('path');
const storage = multer.diskStorage({
    destination: './uploads/',
    filename:function(req,file,cb){
      return cb(null,`MBS+${file.fieldname}${path.extname(file.originalname)}`);
    }
  });
  const upload = multer({storage:storage})
const user = [{
    id:1,
    email: "muhammad@seebiz.com",
    password: "hero"
},
{
    id:2,
    email: "sohaib@seebiz.com",
    password: "unlucky"
},
{
    id:3,
    email: "arbaz@seebiz.com",
    password: "husky"
},
{
    id:4,
    email: "sam@seebiz.com",
    password: "shurli"
},
{
    id:5,
    email: "taqi@seebiz.com",
    password: "sweetpotato"
},
{
    id:6,
    email: "aiza@myheart.com",
    password: "deseartrose"
}
];

const app = express();

app.use(express.json());

const secretKey = 'shhhhh';

app.post("/login", (req, res) => {
   
    const token = jwt.sign( {user} , secretKey);
    res.send(token);
});

app.post("/verify", (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(401).send("Token not provided");
    }


app.post("/createuser", (req, res) => {
    const newUser = req.body;
    user.push(newUser);
    res.send(user);

});

app.post("/deluser", (req, res) => {
    const userID = req.body.id;
    let userIndex = -1;

    for (let i = 0; i < user.length; i++) {
        if (userID === user[i].id) {
            userIndex = i;
            break;
        }
    }
    if (userIndex !== -1) {
        user.splice(userIndex, 1);
        res.send(user);
    } else {
    
       res.send("User doesn't exist");
    }

});


app.post("/update", (req, res) => {
    const userID = req.body.id;
    
    let userIndex = -1;

    for (let i = 0; i < user.length; i++) {
        if (userID === user[i].email) {
            userIndex=i;
        }
        
    }
    if (userIndex !== -1) {
        if(req.body.email1 !== '' && req.body.email !== undefined)
        {
            user[userIndex].password=req.body.password1;
            user[userIndex].email=req.body.email1;
        }
      
        if(req.body.password1 !== '' && req.body.password !== undefined)
        {
            user[userIndex].password=req.body.password1;
            user[userIndex].email=req.body.email1;
        }

        else
        {
            res.send(user);
        }
      
        res.send(user);
    } else {
    
       res.send("User doesn't exist");
    }

});
  

});

app.use('/view',express.static('uploads'))
app.post('/upload', upload.single('file'), (req, res) => {
  
  
  res.send(`http://localhost:5000/view/${req.file.filename}`)
  console.log(req.file)
  
});







const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

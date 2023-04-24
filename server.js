const express = require('express');
const cors = require('cors');
const bodyParser = require('body-Parser');

// const authRoute = require('./routes/auth')


const db = require('./models');




const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let corsOptions = {

   origin : "http://localhost:3001"
  
  };
  app.use(cors(corsOptions));

db.mongoose.connect(db.url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });


  app.get('/', (req, res) => {
    res.json({message: "welcome to amazon"});

  });

// require('./routes/user')(app);
require('./routes/product.js')(app);
require('./routes/user')(app);
require('./routes/shipping')(app);
require('./routes/order')(app);
require('./routes/payment')(app);
const PORT = 3000;


//ALL API
// app.use('/api/auth', authRoute); 
 
app.listen(PORT, () => {
    console.log(`your server is running on port: ${PORT}`);
})



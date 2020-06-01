const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const {db, express} = require('./global');
const user = require('./user_profile');
const user_related = require('./user_anime');
const anime = require('./anime');


const app = express();

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MYSQL")
  })

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/', user);
app.use('/', user_related);
app.use('/anime', anime);
  
app.listen('3000', () => {
    console.log("Server started listening on port 3000.");
});
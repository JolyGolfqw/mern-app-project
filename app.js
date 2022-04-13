const express = require("express");
const config = require("config");
const cors = require('cors')
const { mongoose } = require("mongoose");
const { path } = require("express/lib/application");

const app = express();

app.use(express.json({ extended: true }))
app.use(cors());

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }

const PORT = config.get("port") || 5000;
const SERVER = config.get("server");

async function start() {
  try {
    await mongoose.connect(SERVER);
    app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

start()
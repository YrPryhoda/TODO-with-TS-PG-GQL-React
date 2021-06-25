const PORT = 5500;
const host = 'http://localhost';
const wsHost = 'ws://localhost';
const sessionSecret = 'q$@!JLkH!p-082-30200';
const tokenName = 'app.token';

const sessionOptions = {
  key: tokenName,
  secret: sessionSecret,
  saveUninitialized: false,
  resave: false,
  rolling: true,
  cookie: {
    maxAge: 3600 * 24 * 10000,
    httpOnly: true,
  }
}

const corsOptions = {
  credentials: true,
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//  optionsSuccessStatus: 200
}

export {
  PORT,
  host,
  wsHost,
  sessionOptions,
  sessionSecret,
  corsOptions,
  tokenName
}
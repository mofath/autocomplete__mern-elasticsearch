const http = require("http");
const app = require("./app");
const config = require("./config");

const server = http.createServer(app);

const PORT = config.PORT;

server.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
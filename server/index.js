import "reflect-metadata";
import { createConnection } from "typeorm";

import { httpServer, graphqlPath, subscriptionsPath } from "./src/init/server";
import { PORT, host, wsHost, } from "./src/init/consts";

createConnection()
  .then(() => {
    httpServer.listen({ port: PORT }, () => {
      console.log(`
        Apollo server is running on ${host}:${PORT}${graphqlPath},
        Sockets server is on ${wsHost}:${PORT}${subscriptionsPath}
      `);
    })
  })
  .catch(e => {
    console.log(e, "MAIN");
  })

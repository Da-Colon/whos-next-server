/**
 * Module dependencies.
 */

 import debugLib from "debug";
 import dotenv from "dotenv";
 import http from "http";
 
 dotenv.config();
 
 (async () => {
   const debug = debugLib("whos-next:api");
   /**
    * Normalize a port into a number, string, or false.
    */
 
   const normalizePort = (val: any) => {
     const port = parseInt(val, 10);
 
     if (isNaN(port)) {
       // named pipe
       return val;
     }
 
     if (port >= 0) {
       // port number
       return port;
     }
 
     return false;
   };
 
   /**
    * Event listener for HTTP server "error" event.
    */
 
   function onError(error: any) {
     if (error.syscall !== "listen") {
       throw error;
     }
 
     const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
 
     // handle specific listen errors with friendly messages
     switch (error.code) {
       case "EACCES":
         console.error(bind + " requires elevated privileges");
         process.exit(1);
       case "EADDRINUSE":
         console.error(bind + " is already in use");
         process.exit(1);
       default:
         throw error;
     }
   }
 
   /**
    * Event listener for HTTP server "listening" event.
    */
 
   function onListening() {
     const addr = server.address();
     const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
     debug("Listening on " + bind);
   }
   /**
    * Create a database connection.
    */
 
   const db = database(process.env.DB_NAME || "development");
 
   /**
    * Initialize an app instance with database connection.
    */
 
   const app = await appServer(db);
 
   /**
    * Get port from environment and store in Express.
    */
 
   const port = normalizePort(process.env.API_PORT || "8080");
   app.set("port", port);
 
   /**
    * Create HTTP server.
    */
 
   const server = http.createServer(app);
 
   /**
    * Listen on provided port, on all network interfaces.
    */
 
   server.listen(port);
   server.on("error", onError);
   server.on("listening", onListening);
 })();
 
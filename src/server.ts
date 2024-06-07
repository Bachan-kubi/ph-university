import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import {Server} from 'http';
import { x } from 'joi';



let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
// unhandled rejection
process.on("unhandledRejection", ()=>{
  console.log('😒unhandledRejection is detected!, shutting down ...');
  if(server){
    server.close(()=>{
      process.exit(1)
    });
  }
  process.exit(1);
});

// uncaught error
process.on("uncaughtException", ()=>{
  console.log("😒 uncaughtException detected, shutting down ... ");
  process.exit(1);
});







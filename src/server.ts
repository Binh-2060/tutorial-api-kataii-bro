import app from "./app";
import {config} from "dotenv";
import {resolve} from "path";
import {createServer} from "http";
import environment from './environment';

config({path: resolve(__dirname, ".env")});

const port = environment.port || 2000;

const server = createServer(app);

server.listen(port, () => {
    const appId = environment.app_id;
    console.log(appId);
    console.log(`listening on port ${port} (${environment.node_env})`);
});

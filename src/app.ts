import { envs } from "./config/plugins/envs.plugin";
import { LogModel } from "./data/mongo";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server";


 

(async() => {

    main();

})();


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });
    //Server.start();


    //crear una coleccion = tabla, documento = registro
    const newLog = await LogModel.create({
        message: 'Test message desde mongo',
        origin: 'app.ts',
        level: 'low',
    });


    await newLog.save();




}
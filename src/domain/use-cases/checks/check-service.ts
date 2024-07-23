import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;



export class CheckService implements CheckServiceUseCase {

    constructor (
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccesCallback, 
        private readonly errorCallback: ErrorCallback 
    ) {}
    
    
    public async execute(url:string):Promise<boolean> {

        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            };
            this.successCallback && this.successCallback();
            const log = new LogEntity({
                message: `${url} is ok`, 
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log)
            return true;
        } catch (error) {



            const errorMessage = `${error}`;
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(`${errorMessage}`);

            return false;



        }
        
        
    }
}
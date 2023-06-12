import { IConfigService } from "../interfaces/config.interface";
import { DotenvParseOutput, config } from "dotenv"

export class ConfigSrevice implements IConfigService{
  private config: DotenvParseOutput;
  constructor(){
    const { error, parsed } = config();
    if(error){
      throw new Error("There isn't .env file")
    }
    if(!parsed){
      throw new Error(".env file is empty")
    }
    this.config = parsed;
  }
  get(key: string): string{
    const res = this.config[key]
    if(!res){
      throw new Error("This key is not found")
    }
    return res
  }

}
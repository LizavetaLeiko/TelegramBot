import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../interfaces/context.interface";
import axios, { AxiosResponse } from "axios";
import { IConfigService } from "../config/config.interface";


export class AnimalCommand extends Command{
  configService: IConfigService;
  animal: string;
  constructor(public bot: Telegraf<IBotContext>, configService: IConfigService, animal: string){
    super(bot)
    this.configService = configService
    this.animal = animal
  }
  handle(): void {
    this.bot.command(this.animal , async ctx => {
      this.getQuery(ctx)
    })
    this.bot.action('more', ctx =>{
      this.getQuery(ctx)
    })
  }
  async getQuery(ctx: IBotContext): Promise<any>{
    let randomPage = Math.floor(Math.random() * 50)
      try {
        const response: AxiosResponse<any> = await axios.get<any>(`https://api.pexels.com/v1/search?query=${this.animal}&per_page=1&page=${randomPage}`, {headers: {Authorization: this.configService.get('PICTURES_TOKEN')}});
        ctx.replyWithPhoto(response.data.photos[0].url ? response.data.photos[0].url : 'sorry, something is wrong with photo, try again', Markup.inlineKeyboard([Markup.button.callback('One more photo', 'more')]))
      } catch (err) {
        ctx.reply(`Sorry, something is wrong`)
      }
  }
}
import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../interfaces/context.interface";
import axios, { AxiosResponse } from "axios";
import { IConfigService } from "../config/config.interface";
import { createPlacesListMessage } from "../helpers/createPlacesListMessage";
import { IPlacesCollection } from "../interfaces/placesData.interfaces";


export class PlacesCommand extends Command{
  configService: IConfigService;
  long: number;
  lat: number;
  constructor(public bot: Telegraf<IBotContext>, configService: IConfigService){
    super(bot)
    this.configService = configService
    this.long = 0
    this.lat = 0
  }
  handle(): void {
    this.bot.command('places', async ctx => {
      ctx.sendMessage("What is a city you interested in?");
      this.bot.hears(/.*/, async (ctx2) => {
        const city = ctx2.message.text.trim()
        this.getCityQuery(ctx, city)
      });
    })
    this.bot.action(/places_(foods|religion|natural|cultural)/, async (ctx3) => {
      let msg = await this.getCategoryQuery(ctx3.match[0].slice(7));
      if (typeof msg === "string"){
        ctx3.reply(msg)
      }
    });
  }
  async getCityQuery(ctx: IBotContext, city: string): Promise<any>{
      try {
        const response: AxiosResponse<any> = await axios.get<any>(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${this.configService.get("PLACES_TOKEN")}`);
        this.lat = response.data.lat
        this.long = response.data.lon
        ctx.reply(`Ok, your city is ${response.data.name}
What type of places would you like to get?`, Markup.inlineKeyboard([Markup.button.callback('Food', 'places_foods'), Markup.button.callback('Religion', 'places_religion'), Markup.button.callback('Nature', 'places_natural'), Markup.button.callback('Culture', 'places_cultural')]))
      } catch (err) {
        ctx.reply(`Sorry, something is wrong. Please, check your city (it should be in english and without any spaces, smileys, quotes, etc.) or try later`)
      }
  }
  async getCategoryQuery(kind: string): Promise<IPlacesCollection | string>{
    try {
      const response: AxiosResponse<IPlacesCollection> = await axios.get<any>(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${this.long}&lat=${this.lat}&kinds=${kind}&format=geojson&limit=15&apikey=${this.configService.get("PLACES_TOKEN")}`);
      return createPlacesListMessage(response.data)
    } catch (err) {
      return `Sorry, something is wrong. Please, try later`
    }
}
}
import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { IBotContext } from '../interfaces';
import { getAnimalPicture } from '../api';
import { createAnimalMessage } from '../helpers/createAnimalMessage';

export class AnimalCommand extends Command {
  animal: string;
  constructor(public bot: Telegraf<IBotContext>, animal: string) {
    super(bot);
    this.animal = animal;
  }
  handle(): void {
    this.bot.command(this.animal, async (ctx) => {
      const data = await getAnimalPicture(this.animal);
      createAnimalMessage(data, ctx);
    });
    this.bot.action('more', async (ctx) => {
      const data = await getAnimalPicture(this.animal);
      createAnimalMessage(data, ctx);
    });
  }
}

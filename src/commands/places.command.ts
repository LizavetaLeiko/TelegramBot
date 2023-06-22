import { Markup, Telegraf } from 'telegraf';

import { Command } from './command.class';

import { commands, messages, placesBtns } from '@constants';
import { IBotContext } from '@interfaces';
import { getCity, getPlaces } from '@api';
import { createPlacesListMessage } from '@helpers';

export class PlacesCommand extends Command {
  long: number;

  lat: number;

  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
    this.long = 0;
    this.lat = 0;
  }

  handle(): void {
    this.bot.command(commands.places.value, async (ctx) => {
      ctx.sendMessage(messages.questions.askCity);

      this.bot.hears(/.*/, async (ctx2) => {
        const city = ctx2.message.text.trim();
        const data = await getCity(city);

        if (typeof data === 'string') {
          ctx2.reply(data);
        } else {
          this.lat = data.lat;
          this.long = data.lon;
          const cityName = data.name || '';
          ctx2.reply(
            `${messages.info.userCity(cityName)}
${messages.questions.askTypeOfPlaces}`,
            Markup.inlineKeyboard(
              placesBtns.map((item) =>
                Markup.button.callback(`${item}`, `places_${item}`),
              ),
            ),
          );
        }
      });
    });

    this.bot.action(
      /places_(foods|religion|natural|cultural)/,
      async (ctx3) => {
        const data = await getPlaces(
          ctx3.match[0].slice(7),
          this.long,
          this.lat,
        );
        if (typeof data === 'string') {
          ctx3.reply(data);
        } else {
          ctx3.reply(createPlacesListMessage(data));
        }
      },
    );
  }
}

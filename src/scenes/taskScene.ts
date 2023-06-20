import { Scenes } from 'telegraf';
import { v4 as uuidv4 } from 'uuid';
import { IBotContext } from '../interfaces/context.interface';
import { skipMiddleware } from '../middlewares/skipScene.middleware';
import {
  reminderHearer,
  taskHearer,
  titleHearer,
} from '../helpers/hearers/task.hearers';

export const TaskScene = new Scenes.WizardScene<IBotContext>(
  'task-scene',
  async (ctx) => {
    return ctx.wizard.next();
  }
  );
  
TaskScene.use(skipMiddleware)

TaskScene.enter(async (ctx) => {
  ctx.session.task = {
    id: uuidv4(),
    title: '',
    user_id: 0,
    text: '',
  };
  await ctx.reply('Send me a title of the new task');
});
TaskScene.hears(/.*/, async (ctx) => {
  if (ctx.wizard.cursor === 0) {
    titleHearer(ctx);
  } else if (ctx.wizard.cursor === 1) {
    taskHearer(ctx);
  } else {
    reminderHearer(ctx);
  }
}),
  TaskScene.action(/setReminder_*/, async (ctx4) => {
    ctx4.reply(
      `When should I to remind you? 
Please, send me a date in format DD.MM.YYYY.00:00 
without any smiles or spaces(for example 09.09.2023.14:00)`
    );
    ctx4.wizard.next();
  });
TaskScene.action('no', async (ctx4) => {
  ctx4.reply("Ok, i wouldn't remind you");
  ctx4.scene.leave();
});

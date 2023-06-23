import { Scenes } from 'telegraf';

import { v4 as uuidv4 } from 'uuid';

import { messages, scenes } from '@constants';
import { IBotContext } from '@interfaces';
import { reminderHearer, taskHearer, titleHearer } from '@helpers';
import { skipMiddleware } from '@middlewares';

export const TaskScene = new Scenes.WizardScene<IBotContext>(
  scenes.task,
  async (ctx) => {
    return ctx.wizard.next();
  },
);

TaskScene.use(skipMiddleware);

TaskScene.enter(async (ctx) => {
  ctx.session.task = {
    id: uuidv4(),
    title: '',
    user_id: 0,
    text: '',
  };
  await ctx.reply(messages.questions.askTaskTitle);
});

TaskScene.hears(/.*/, async (ctx) => {
  if (ctx.wizard.cursor === 0) {
    titleHearer(ctx);
  } else if (ctx.wizard.cursor === 1) {
    taskHearer(ctx);
  } else {
    reminderHearer(ctx);
  }
});

TaskScene.action(/setReminder_*/, async (ctx4) => {
  ctx4.reply(messages.questions.askTaskReminderTime);
  ctx4.wizard.next();
});

TaskScene.action(messages.btns.dontSetReminder, async (ctx4) => {
  ctx4.reply(messages.info.dontRemind);
  ctx4.scene.leave();
});

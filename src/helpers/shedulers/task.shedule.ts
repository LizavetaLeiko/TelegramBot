import schedule from 'node-schedule';

import { IBotContext } from '@interfaces';
import { getTask } from '@api';
import { createRule, createTaskMessage } from '@helpers';

export function setTaskRimender(msg: string, taskId: string, ctx: IBotContext) {
  const rule = createRule(msg);
  schedule.scheduleJob(rule, async () => {
    const task = await getTask(taskId);
    if (task) {
      ctx.reply(createTaskMessage(task));
    }
  });
}

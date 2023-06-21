import schedule from 'node-schedule';

import { createRule } from '../createRuleForSchedule';
import { createTaskMessage } from '../createTaskMessage';

import { IBotContext } from '../../interfaces';
import { getTask } from '../../api';

export function setTaskRimender(msg: string, taskId: string, ctx: IBotContext) {
  const rule = createRule(msg);
  schedule.scheduleJob(rule, async () => {
    const task = await getTask(taskId);
    if (task) {
      ctx.reply(createTaskMessage(task));
    }
  });
}

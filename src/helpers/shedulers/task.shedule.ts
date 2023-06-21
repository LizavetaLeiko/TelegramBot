import schedule from 'node-schedule';

import { createTaskMessage } from '../createTaskMessage';

import { fromUTC } from '../../constants';
import { IBotContext } from '../../interfaces';
import { getTask } from '../../api';

export function setTaskRimender(msg: string, taskId: string, ctx: IBotContext) {
  const [day, month, year, hours, minutes] = msg.split(/[.:]/);
  const rule = new schedule.RecurrenceRule();
  rule.year = +year;
  rule.hour = +hours - fromUTC;
  rule.minute = +minutes;
  rule.date = +day;
  rule.month = +month - 1;
  
  schedule.scheduleJob(rule, async () => {
    const task = await getTask(taskId);
    if (task) {
      ctx.reply(createTaskMessage(task));
    }
  });
}

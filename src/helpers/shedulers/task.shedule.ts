import  schedule  from 'node-schedule';
import { IBotContext } from '../../interfaces';
import { createTaskMessage } from '../createTaskMessage';

export default function setTaskRimender(msg: string, taskId: string, ctx: IBotContext){
  const fromUTC = 3;
  const [day, month, year, hours, minutes] = msg.split(/[.:]/);
    const rule = new schedule.RecurrenceRule();
    rule.year = +year;
    rule.hour = +hours - fromUTC;
    rule.minute = +minutes;
    rule.date = +day;
    rule.month = +month - 1;
    schedule.scheduleJob(rule, async () => {
      ctx.reply(await createTaskMessage(taskId));
    });
}
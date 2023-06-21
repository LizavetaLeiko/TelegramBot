import schedule from 'node-schedule';

import { fromUTC } from '../constants';


export const createRule = function (msg: string) {
  const [day, month, year, hours, minutes] = msg.split(/[.:]/);
  const rule = new schedule.RecurrenceRule();
  rule.year = +year;
  rule.hour = +hours - fromUTC;
  rule.minute = +minutes;
  rule.date = +day;
  rule.month = +month - 1;
  return rule;
};
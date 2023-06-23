import { commands } from '@constants';
import { ICommand } from '@interfaces';

export function createHelpMessage(): string {
  const commandsArray = Object.entries(commands).slice(1).map(([key, value]) => value);
  const response = commandsArray.map( (item: ICommand, i: number) =>
    `${++i}. /${item.value} - ${item.desc}`,
  );

  return response.join('\n');
}

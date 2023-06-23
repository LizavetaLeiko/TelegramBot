import { ITask } from '@interfaces';


export const messages = {
  errors: {
    unknownErr: 'Sorry, something is wrong, try it later',
    unknownCommand: 'There is no such command',
    cityErr: `Sorry, I can't find this city. 
Please, check it (it should be in english and without any spaces, smileys, quotes, etc.)`,
    subscNotCanceled: "Sorry, something is wrong, your subscription hasn't been canceled, try it later",
    invalidTaskTitle: "Title can't be empty or longer than 60 symbols",
    invalidTaskContent: "Task can't be empty",
    invalidTaskData: 'Invalid data format, it should be in format DD.MM.YYYY.00:00 ',
    taskIsNotFound: `You set a task reminder for this time, 
but unfortunately an error occurred and the text of the task was lost`,
  },
  info: {
    helloMsg: (name: string) => `Hello ${name}, send me "/help" to see what i can do`,
    userCity: (city: string) => `Ok, your city is ${city}`,
    places: 'There is a list of places:',
    weatherSubscribed: (hour: string) =>  `Great! I will send you the forecast every morning at ${hour}:00`,
    dontSubscribeWeather: "Ok, i wouldn't send you the weather forcast",
    heventWeatherSubsc: "You don't have weather subscriptions. To create one - /weather",
    subscCanceled: 'Your subscription has been canceled',
    noTasks: `There is no tasks
Create one by /task command`,
    taskReminder: (task: ITask) => `Don't forget about your task!
✅ ${task.title}
${task.text}`,
    taskTitles: 'Titles of your actual tasks:',
    taskCreated: 'Your task is created!',
    remindSetted: 'Ok I will send you a reminder',
    dontRemind: "Ok, i wouldn't remind you",
    tasksRemoved: 'Your tasks removed',
    skipScene: 'Ok, you can call another command',
  },
  questions: {
    askCity: 'What is your city?',
    askTypeOfPlaces: 'What type of places would you like to get?',
    askForcastTime: 'What time would you like to get the forecast?',
    askCityToUnsubscribe: 'Please, choose the city you would like to unsubscribe from',
    askTaskTitle: 'Send me a title of the new task',
    askTaskContent: 'Send me your task',
    askTaskReminder: 'Would you like to set a reminder?',
    askTaskReminderTime: `When should I to remind you? 
Please, send me a date in format DD.MM.YYYY.00:00 
without any smiles or spaces(for example 09.09.2023.14:00)`,
  },
  btns: {
    morePhoto: 'One more photo',
    subscribeWeather: 'Get weather every morning',
    dontSubscribeWeather: "Don't subscribe",
    weatherSubscTime :{
      '6': ['At 6:00', 'subscribed_6am'],
      '9': ['At 9:00', 'subscribed_9am'],
    },
    setReminder: 'Set a reminder',
    dontSetReminder: "Don't set a reminder",
    deleteTasks: 'Delete all tasks',
  },
};
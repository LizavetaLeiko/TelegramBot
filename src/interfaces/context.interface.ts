import { Context, Scenes } from "telegraf";
import { SceneContextScene, WizardContextWizard,  WizardSessionData } from "telegraf/typings/scenes";

export interface ISessionContext extends Context {
  weather: {
    city: string,
    isSubsribed: boolean,
  },
  task: {
    id: string;
    title: string;
    text: string;
    reminder?: string;
    user_id: string,
  },
  scene: SceneContextScene<ISessionContext, WizardSessionData>,
  wizard: WizardContextWizard<ISessionContext> & {
    session: WizardSessionData;
  };
  __scenes: WizardSessionData
}


export interface IBotContext extends Context{
  session: ISessionContext;
  scene: SceneContextScene<IBotContext, WizardSessionData>;
  wizard: Scenes.WizardContextWizard<IBotContext>;
}
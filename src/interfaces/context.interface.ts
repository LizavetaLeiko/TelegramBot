import { Context, Scenes } from "telegraf";
import { SceneContextScene, SceneSession, SceneSessionData, WizardContextWizard, WizardSession, WizardSessionData } from "telegraf/typings/scenes";

export interface ISessionContext extends Context {
  weather: Array<{
    weatherCounter: number,
    city: string,
    isSubsribed: boolean,
  }>,
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
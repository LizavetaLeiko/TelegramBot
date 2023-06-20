import { Context, NarrowedContext, Scenes } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import {
  SceneContextScene,
  WizardContextWizard,
  WizardSessionData,
} from 'telegraf/typings/scenes';

export interface ISessionContext extends Context {
  weather: {
    city: string;
    isSubsribed: boolean;
  };
  task: {
    id: string;
    title: string;
    text: string;
    reminder?: string;
    user_id: number;
  };
  scene: SceneContextScene<ISessionContext, WizardSessionData>;
  wizard: WizardContextWizard<ISessionContext> & {
    session: WizardSessionData;
  };
  __scenes: WizardSessionData;
}

export interface IBotContext extends Context {
  session: ISessionContext;
  scene: SceneContextScene<IBotContext, WizardSessionData>;
  wizard: Scenes.WizardContextWizard<IBotContext>;
}

export interface IMsgContext
  extends NarrowedContext<
    IBotContext & { match: RegExpExecArray },
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  > {
  prop?: string;
}

export interface MiddlewareContext extends  IBotContext {
  message: Update.New & Update.NonChannel & Message.TextMessage;
}
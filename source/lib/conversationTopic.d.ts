import { BotContext } from 'botbuilder';
import { Topic } from './topic';
export interface ActiveTopicState {
    key: string;
    state?: any;
}
export interface ConversationTopicState {
    activeTopic?: ActiveTopicState;
}
export declare abstract class ConversationTopic<BotTurnContext extends BotContext, State extends ConversationTopicState, Value = any> extends Topic<BotTurnContext, State, Value> {
    private _subTopics;
    protected readonly subTopics: Map<string, (any?) => Topic<BotTurnContext, any>>;
    private _activeTopic;
    setActiveTopic(subTopicKey: string, ...args: any[]): Topic<BotTurnContext, any, any>;
    readonly activeTopic: Topic<BotTurnContext, any>;
    readonly hasActiveTopic: boolean;
    clearActiveTopic(): void;
}

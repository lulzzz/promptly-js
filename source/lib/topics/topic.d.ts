import { BotContext, Promiseable } from 'botbuilder';
export declare abstract class Topic<BotTurnContext extends BotContext, State, Value = any> {
    constructor(state: State);
    private _state;
    state: State;
    abstract onReceiveActivity(context: BotTurnContext): Promiseable<any>;
    protected _onSuccess?: (context: BotTurnContext, value: Value) => void;
    onSuccess(success: (context: BotTurnContext, value: Value) => void): this;
    protected _onFailure?: (context: BotTurnContext, reason: string) => void;
    onFailure(failure: (context: BotTurnContext, reason: string) => void): this;
}

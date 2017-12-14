import { Bot, ConsoleLogger, MemoryStorage, BotStateManager } from 'botbuilder-core';
import { BotFrameworkAdapter } from 'botbuilder-services';
import * as restify from 'restify';
import { RootTopic } from './topics/rootTopic';
import { LuisRecognizer } from 'botbuilder-ai';
import { ParentTopicState } from './promptly/parentTopic';

// Create server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({ appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD });
server.post('/api/messages', adapter.listen() as any);

export interface ActiveTopicState {
    name: string;
    state?: any;
}

export interface ParentTopicState {
    activeTopic?: ActiveTopicState;
}

declare global {
    export interface ConversationState {
        rootTopic?: ParentTopicState;
    }
}

declare global {
    export interface ConversationState {
        rootTopic?: ParentTopicState;
    }
}

// Initialize bot
const bot = new Bot(adapter)
    .use(new ConsoleLogger())
    .use(new MemoryStorage())
    .use(new BotStateManager())
    //.use(new LuisRecognizer("5e013df5-f1df-40a7-9893-437bfdb1811d", "04e545e56dfd417daa44460a04f20ffd"))
    .onReceive((context) => {
        // State isn't fully initialized until the contact/conversation messages are sent, so have to require
        //  activity type is message.
        if(context.request.type === 'message') {
            // Initialize the root topic state to facilitate the state reference chain to 
            //  context.state.conversation.
            if (!context.state.conversation.rootTopic) {
                context.state.conversation.rootTopic = { activeTopic: undefined };
            }

            const rootTopic = new RootTopic(context.state.conversation.rootTopic);
            return rootTopic.onReceive(context);
        }
    });
import { Message, User } from "discord.js";

export class DiscordHelper {
    public static createMessageId(user: User, message: Message): string {
        return `${message.guildId}_${message.channelId}_${user.id}`;
    }

    public static messageByDankMemer(message: Message): boolean {
        const msg: Message = message as Message;

        if (msg.author.bot && 
            msg.author.id === "270904126974590976" && 
            msg.content.toLowerCase().startsWith("your turn ") &&
            msg.mentions.users.first()) {
            return true;
        }
        
        return false;
    }
}
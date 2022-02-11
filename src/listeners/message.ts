import { Message, Client, User, PartialMessage, GuildMember } from "discord.js";
import { TimeHelper } from "../helpers/TimeHelper";
import { DiscordHelper } from "../helpers/DiscordHelper";
import { IFight } from "../models/IFight";
import { IFighter } from "../models/IFighter";
import { DataBaseHelper } from "../helpers/DataBaseHelper";

export default (client: Client): void => {
    let messageIds: Map<string, Date> = new Map<string, Date>();
    let clearing: boolean = false;

    function clearFights() {
        if (clearing) {
            return;
        }
        clearing = true;
        
        let now = new Date();
        let removeKeys: Array<string> = [];

        messageIds.forEach((value: Date, key: string) => {
            let timeSpan: number = TimeHelper.getSecondsBetween(value, now);
            if (timeSpan > 600) removeKeys.push(key);
        });

        for (let i = 0; i < removeKeys.length; i++) {
            const key = removeKeys[i];
            messageIds.delete(key);
        }

        clearing = false;
    };

    client.on("messageUpdate", async (oldMessage: Message<boolean> | PartialMessage, newMessage:  Message<boolean> | PartialMessage) => {
        if (!oldMessage || !newMessage) {
            return;
        }

        const oldMsg: Message = oldMessage as Message;
        const newMsg: Message = newMessage as Message;

        if (!DiscordHelper.messageByDankMemer(newMsg) || messageIds.has(oldMsg.id)) {
            return;
        }
        
        clearFights();
        messageIds.set(oldMsg.id, oldMsg.createdAt);

        const initiator: User = oldMsg.mentions.users?.first() as User;
        const victim: User = newMsg.mentions.users?.first() as User;
        
        if (initiator.id === victim.id) {
            messageIds.delete(oldMsg.id);
            return;
        }

        const initiatorMember: GuildMember = oldMsg.mentions.members?.first() as GuildMember;
        const victimMember: GuildMember = newMsg.mentions.members?.first() as GuildMember;

        const champRole: string|null = await DataBaseHelper.getChampRole(oldMsg.guildId as string);

        let fighter1: IFighter = {
            user: initiator,
            isChampion: initiatorMember.roles.cache.some(role => role.id === champRole)
        }

        let fighter2: IFighter = {
            user: victim,
            isChampion: victimMember.roles.cache.some(role => role.id === champRole)
        }

        const fight: IFight = { fighter1: fighter1, fighter2: fighter2, initiatedAt: oldMsg.createdAt };
    
        let fighter1Entrance: string|null = await DataBaseHelper.getEntrance(fight.fighter1, newMsg.guildId as string);
        let fighter2Entrance: string|null = await DataBaseHelper.getEntrance(fight.fighter2, newMsg.guildId as string);

        await newMessage.reply(getBothEntranceStrings(fight, fighter1Entrance, fighter2Entrance));
    });

    function getEntranceString(fighter: IFighter, entranceLink: string|null) {
        return `Making their way to the ring \n**<@${fighter.user.id}>**${fighter.isChampion ? ',\nthe current Champion': ''}\nEntrance music: ${entranceLink ? `<${entranceLink}>` : 'none set (use **/addentrance** to add your entrance music)'}`;
    };

    function getBothEntranceStrings(fight: IFight, entranceLink1: string|null, entranceLink2: string|null) {
        const entrance1: string = getEntranceString(fight.fighter1, entranceLink1);
        const entrance2: string = getEntranceString(fight.fighter2, entranceLink2);

        return `${entrance1}\n\n${entrance2}`;
    }
};
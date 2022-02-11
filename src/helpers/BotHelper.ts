import { GuildMember, User } from "discord.js";
import { IFighter } from "src/models/IFighter";
import { DataBaseHelper } from "./DataBaseHelper";
import { YouTubeHelper } from "./YouTubeHelper";

export class BotHelper {
    public static async getFighter(member: GuildMember, champRole: string|null): Promise<IFighter> {
        let fighter: IFighter = {
            user: member.user,
            isChampion: member.roles.cache.some(role => role.id === champRole),
            entranceLink: await DataBaseHelper.getEntrance(member.user, member.guild.id as string),
            entranceVideo: null
        };

        const fighterVideoId: string|null = YouTubeHelper.getVideoIdFromLink(fighter.entranceLink);
        fighter.entranceVideo = await YouTubeHelper.getYoutubeVideo(fighterVideoId);

        return fighter;
    }
}
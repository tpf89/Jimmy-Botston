import { User } from "discord.js";
import { YoutubeVideo } from "youtube.ts";

export interface IFighter {
    user: User;
    isChampion: boolean;
    entranceLink: string|null;
    entranceVideo: YoutubeVideo|null;
}
import Youtube, { YoutubeVideo } from "youtube.ts";
import Credentials from '../Credentials.json';

export class YouTubeHelper {
    private static youTube: Youtube = new Youtube(Credentials.youTube.apiToken);

    public static async getYoutubeVideo(youtubeId: string|null): Promise<YoutubeVideo|null> {
        if (!youtubeId) {
            return null;
        }
        
        try {
            const video = await this.youTube.videos.get(youtubeId);            
            return video;
        }
        catch (ex) {
            return null;
        }
    }

    public static getVideoIdFromLink(link: string | null): string|null {
        if (link === null) {
            return null;
        }

        const url: URL = new URL(link);
        const urlParams = new URLSearchParams(url.searchParams);
        const videoId = urlParams.get('v');

        return videoId;
    }
}
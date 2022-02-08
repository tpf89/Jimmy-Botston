import { Client } from "discord.js";
import { DataBaseHelper } from "../helpers/DataBaseHelper";
import { Commands } from "../Commands";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);
        DataBaseHelper.createDatabase();
        console.log(`${client.user.username} is online`);
    });
}; 
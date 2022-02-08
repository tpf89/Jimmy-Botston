import { BaseCommandInteraction, Client, User } from 'discord.js';
import { DataBaseHelper } from '../helpers/DataBaseHelper';
import { Command } from '../Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

export const RemoveEntrance: Command = {
    name: 'rementrance',
    description: 'Removes an entrance',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'usr',
            description: 'Whose entrance do you want to remove?',
            type: ApplicationCommandOptionTypes.USER,
            required: false,
        }
    ],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        let content = 'Something went wrong, try again or contact skunkner';

        try {
            let user: User = interaction.user;
            let val = interaction.options.get('usr', false);

            if (val) {
                user = val.user as User;
            }

            content = await DataBaseHelper.removeEntrance(user, interaction);
        }
        catch (ex) {
            content = 'Something went wrong, try again or contact skunkner';
        }
       
        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}; 
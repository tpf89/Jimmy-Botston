import { BaseCommandInteraction, Client, Role } from 'discord.js';
import { DataBaseHelper } from '../helpers/DataBaseHelper';
import { Command } from '../Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

export const SetChamp: Command = {
    name: 'setchamp',
    description: 'Sets the champ role',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'role',
            description: 'The server\'s champ role',
            type: ApplicationCommandOptionTypes.ROLE,
            required: true,
        }
    ],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        let content = 'Something went wrong, try again or contact skunkner';

        try {
            let role: Role = interaction.options.get('role', true).role as Role;
            content = await DataBaseHelper.setChampRole(role, interaction);
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
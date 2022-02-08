import { BaseCommandInteraction, Client } from 'discord.js';
import { DataBaseHelper } from '../helpers/DataBaseHelper';
import { Command } from '../Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

export const AddEntrance: Command = {
    name: 'addentrance',
    description: 'Adds an entrance',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'link',
            description: 'YT link',
            type: ApplicationCommandOptionTypes.STRING,
            required: true
        }
    ],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        let content = 'Something went wrong, try again or contact skunkner';

        try {
            const link = interaction.options.get('link', true);
    
            if (!link.value) {
                return;
            }
    
            let ytRegExp: RegExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^'&?\/\s]{11})/gi;
            let isValid: boolean = (link.value as string).match(ytRegExp) !== null;
    
            if (!isValid) {
                content = 'Link has to be a valid YouTube URL, please try again.';
            } else {
                const success: boolean = await DataBaseHelper.addEntrance(interaction, link.value as string);

                if (success)
                {
                    content = 'Your new entrance music has been set.';
                }  
            }
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
import { Interaction, User, Permissions, GuildMember, Role } from "discord.js";
import { IFighter } from "src/models/IFighter";

const { Sequelize, Model, DataTypes } = require('sequelize');

export class DataBaseHelper {
    static sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        // SQLite only
        storage: 'database.sqlite',
    });

    static entrances = this.sequelize.define('entrances', {
        userId: Sequelize.TEXT,
        guildId: Sequelize.TEXT,
        entranceLink: Sequelize.TEXT
    });

    static champRoles = this.sequelize.define('champRoles', {
        guildId: Sequelize.TEXT,
        roleId: Sequelize.TEXT
    });
    
    public static createDatabase(): boolean {
        try {
            this.entrances.sync();
            this.champRoles.sync();
            return true;
        } catch {
            return false;
        }
    }

    public static async addEntrance(interaction: Interaction, entranceLink: string): Promise<boolean> {
        try {
            let entrance = await this.entrances.findOrCreate({ where: { userId: interaction.user.id, guildId: interaction.guildId }});
            let currentEntranceLink = entrance[0].get('entranceLink');

            if (entranceLink !== currentEntranceLink) {
                entrance[0].update({ entranceLink: entranceLink });
            }

            return true;
        } catch (ex) {
            return false;
        }
    }

    public static async getEntrance(fighter: IFighter, guildId: string): Promise<string|null> {
        try {
            let entrance = await this.entrances.findOne({ where: { userId: fighter.user.id, guildId: guildId }});
            let entranceLink = entrance.get('entranceLink');

            return entranceLink;
        } catch (ex) {
            return null;
        }
    }

    public static async removeEntrance(user: User, interaction: Interaction): Promise<string> {
        let content = 'Something went wrong, try again or contact skunkner';
        try {
            const isAllowed = (interaction.member as GuildMember).permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS]) ||
                user.id === interaction.user.id;
            
            if (isAllowed) {
                await this.entrances.destroy({ where: { userId: user.id, guildId: interaction.guildId }});
                content = 'The entranced got removed.';
            } else {
                content = 'You are not allowed to remove other user\'s entrances.';
            }
        } catch (ex) {
            content = 'Something went wrong, try again or contact skunkner';
        }

        return content;
    }

    public static async getChampRole(guildId: string): Promise<string|null> {
        try {
            let champRoleEntry = await this.champRoles.findOne({ where: { guildId: guildId }});
            let roleId = champRoleEntry.get('roleId');

            return roleId;
        } catch (ex) {
            return null;
        }
    }

    public static async setChampRole(role: Role, interaction: Interaction): Promise<string> {
        let content = 'Something went wrong, try again or contact skunkner';

        try {
            const isAllowed = (interaction.member as GuildMember).permissions.has([Permissions.FLAGS.ADMINISTRATOR]);

            if (!isAllowed) {
                content = 'You are not allowed to remove other user\'s entrances.';
                return content;
            }

            let champRoleEntries = await this.champRoles.findOrCreate({ where: { guildId: interaction.guildId }});
            let champRoleEntry = champRoleEntries[0].get('roleName');

            if (champRoleEntry !== role.id) {
                champRoleEntries[0].update({ roleId: role.id  });
            }

            content = 'The champ role has been set.';
        } catch (ex) {
            content = 'Something went wrong, try again or contact skunkner';
        }

        return content;
    }
}
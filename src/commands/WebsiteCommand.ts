import {CommandInteraction} from "discord.js";
import {Discord, Slash, SlashOption} from "discordx";

@Discord()
class WebsiteCommand {
	@Slash("website")
	async onInteract(
		@SlashOption("path", {type: "STRING", required: false}) path: string,
			interaction: CommandInteraction): Promise<void> {
		await interaction.reply(`https://codesupport.dev/${path || ""}`);
	}
}

export default WebsiteCommand;

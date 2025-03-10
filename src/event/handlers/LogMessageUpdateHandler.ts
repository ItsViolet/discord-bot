import {Constants, MessageEmbed, Message, TextChannel, ColorResolvable} from "discord.js";
import EventHandler from "../../abstracts/EventHandler";
import getConfigValue from "../../utils/getConfigValue";
import GenericObject from "../../interfaces/GenericObject";

class LogMessageUpdateHandler extends EventHandler {
	constructor() {
		super(Constants.Events.MESSAGE_UPDATE);
	}

	async handle(oldMessage: Message, newMessage: Message): Promise<void> {
		if (oldMessage.content === newMessage.content) {
			return;
		}

		if (newMessage.content === "") {
			return;
		}

		const embed = new MessageEmbed();

		embed.setTitle("Message Updated");
		embed.setDescription(`Author: ${oldMessage.author}\nChannel: ${oldMessage.channel}`);
		embed.addField("Old Message", oldMessage.content);
		embed.addField("New Message", newMessage.content);
		embed.setColor(getConfigValue<GenericObject<ColorResolvable>>("EMBED_COLOURS").DEFAULT);

		const logsChannel = oldMessage.guild?.channels.cache.find(
			channel => channel.id === getConfigValue<string>("LOG_CHANNEL_ID")
		) as TextChannel;

		await logsChannel?.send({ embeds: [embed] });
	}
}

export default LogMessageUpdateHandler;

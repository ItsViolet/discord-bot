import { createSandbox, SinonSandbox } from "sinon";
import { expect } from "chai";

import CodeblockCommand from "../../src/commands/CodeblockCommand";
import { EMBED_COLOURS } from "../../src/config.json";

describe("CodeblockCommand", () => {
	describe("onInteract()", () => {
		let sandbox: SinonSandbox;
		let command: CodeblockCommand;

		beforeEach(() => {
			sandbox = createSandbox();
			command = new CodeblockCommand();
		});

		it("sends a message to the channel", async () => {
			const replyStub = sandbox.stub().resolves();

			await command.onInteract({
				reply: replyStub
			});

			expect(replyStub.calledOnce).to.be.true;
		});

		it("states how to create a codeblock", async () => {
			const replyStub = sandbox.stub().resolves();

			await command.onInteract({
				reply: replyStub
			});

			// @ts-ignore - firstArg does not live on getCall()
			const embed = replyStub.getCall(0).firstArg.embeds[0];

			expect(replyStub.calledOnce).to.be.true;
			expect(embed.title).to.equal("Codeblock Tutorial");
			expect(embed.description).to.equal("Please use codeblocks when sending code.");
			expect(embed.hexColor).to.equal(EMBED_COLOURS.DEFAULT.toLowerCase());

			expect(embed.fields[0].name).to.equal("Sending lots of code?");
			expect(embed.fields[0].value).to.equal("Consider using a [GitHub Gist](http://gist.github.com).");

			expect(embed.image.url).to.equal("attachment://codeblock-tutorial.png");
		});

		afterEach(() => {
			sandbox.restore();
		});
	});
});

const venom = require("venom-bot");

venom
  .create({
    session: "bot-session",
    multidevice: true, // يدعم الأجهزة المتعددة
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    if (message.body.toLowerCase() === ".ميغو") {
      client.sendText(message.from, "『𝕄𝕖𝕘𝕠 | 𝔹𝕠𝕥』 يعمل بنجاح ✅");
    }
  });
}

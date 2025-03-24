const fs = require("fs");

// تحميل قائمة المستخدمين المسموح لهم من elite.js
const eliteUsers = require("./elite.js");

venom
  .create({
    session: "anime-quiz-bot",
    multidevice: true,
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    
    // ✅ أمر .ميغو1
    if (message.body.toLowerCase() === ".ميغو1") {
      const userNumber = message.sender.id.split("@")[0]; // استخراج رقم المستخدم
    
      if (eliteUsers.includes(userNumber)) {
        // المستخدم مسموح له
        await client.sendImage(
          message.from,
          "path/to/Megumi-Fushiguro-Wallpaper-20.png",
          "megumi.jpg",
          "دي أوامر المالك بس\n『𝕄𝕖𝕘𝕠 | 𝔹𝕠𝕥』"
        );
        await client.sendVoice(message.from, "path/to/orgyzek-glory.mp3");
        await client.react(message.from, message.id, "✅");
      } else {
        // المستخدم غير مسموح له
        await client.sendText(message.from, "❌ ليس لديك صلاحية لاستخدام هذا الأمر.");
        await client.react(message.from, message.id, "❌");
      }
    }
  });
}

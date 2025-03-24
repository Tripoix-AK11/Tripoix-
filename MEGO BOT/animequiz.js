const venom = require("venom-bot");

const animeQuestions = [
  { question: "ما هو اسم بطل أنمي One Piece؟", answer: "لوفي", image: "https://i.imgur.com/1ZQ6z1K.jpg" },
  { question: "في أي سنة تم إصدار أنمي Naruto لأول مرة؟", answer: "1999", image: "https://i.imgur.com/Rt6X0xV.jpg" },
  { question: "ما هو عدد حلقات أنمي Death Note؟", answer: "37", image: "https://i.imgur.com/7GJtFxe.jpg" },
  { question: "من هو مبتكر أنمي Attack on Titan؟", answer: "هاجيمي إيساياما", image: "https://i.imgur.com/qyTt7nK.jpg" }
];

let activeQuestions = {}; // لتخزين الأسئلة النشطة

venom
  .create({
    session: "anime-quiz-bot",
    multidevice: true,
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    if (message.body.toLowerCase() === ".سؤال") {
      try {
        const randomItem = animeQuestions[Math.floor(Math.random() * animeQuestions.length)];

        const sentMessage = await client.sendImage(
          message.from,
          randomItem.image,
          "question.jpg",
          `${randomItem.question}\n\n*QUIZ TIME : 60 SEC.*\nby |『𝕄𝕖𝕘𝕠 | 𝔹𝕠𝕥』`
        );

        activeQuestions[message.from] = {
          answer: randomItem.answer,
          messageId: sentMessage.id.toString(),
          answeredCorrectly: false
        };

        await client.react(message.from, sentMessage.id, "✅");

        setTimeout(async () => {
          if (!activeQuestions[message.from].answeredCorrectly) {
            await client.sendText(message.from, `⏳ انتهى الوقت!\nالإجابة الصحيحة كانت: *${randomItem.answer}*`);
          }
          delete activeQuestions[message.from];
        }, 60000);
        
      } catch (error) {
        console.error("خطأ أثناء تنفيذ الأمر:", error);
        await client.sendText(message.from, "*SOME ERRORS HAPPENED WHILE DOING THE COMMAND* ❌");
        await client.react(message.from, message.id, "❌");
      }
    }

    if (message.quotedMsg && activeQuestions[message.from]) {
      const correctAnswer = activeQuestions[message.from].answer;
      const userAnswer = message.body.trim();

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        await client.sendText(message.from, `إجابة صحيحة ✅\n『𝕄𝕖𝕘𝕠 | 𝔹𝕠𝕥』`);
        activeQuestions[message.from].answeredCorrectly = true;
        delete activeQuestions[message.from];
      }
    }
  });
}

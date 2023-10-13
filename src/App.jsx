import { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function App() {
  const [messages, setMessages] = useState([
    { text: 'Knock Knock!', isUser: false },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  function getChatbotResponse(userMessage) {
    const invalidRes = [
      'stupid',
      'dumbass',
      'sdfsdf',
      'hey',
      'howdy',
      'hmmm',
      '...',
      'you little',
    ];
    const validRes = [
      "who's there",
      "who's there?",
      "what's up?",
      "what's up",
      'hello there',
      'yo',
      'hello',
      'hi',
    ];
    const chatbotResponses = [
      'Hello!',
      'How can I assist you?',
      'Nice to meet you!',
      'Howdy partner!',
      'Hello there👋',
    ];

    const dormant = [
      '.....',
      "I'm sorry I didn't catch that",
      'Say something different😁',
      'Please play along🙄...Knock Knock?',
      'Come again please...',
      'What did you say to me?😕',
    ];

    const jibberish = [
      'ldkjfglkj😂',
      'What did you say to me?',
      'A townhall different....',
    ];

    userMessage = userMessage.toLowerCase();
    for (let i = 0; i < invalidRes.length; i++) {
      if (userMessage.includes(invalidRes[i])) {
        return dormant[Math.floor(Math.random() * dormant.length)];
      } else if (userMessage.includes(validRes[i]))
        return chatbotResponses[
          Math.floor(Math.random() * chatbotResponses.length)
        ];
    }

    return jibberish[Math.floor(Math.random() * jibberish.length)];
  }

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleUserMessageSubmit = async (event) => {
    event.preventDefault();
    if (userMessage.trim() === '') return;

    setMessages([...messages, { text: userMessage, isUser: true }]);
    setUserMessage('');

    await delay(1500);

    const botResponse = getChatbotResponse(userMessage);
    setMessages((prev) => {
      return [...prev, { text: botResponse, isUser: false }];
    });
  };

  return (
    <main className="w-full h-[100svh] bg-[#FFFFFF] flex justify-center items-center">
      <article className="w-[500px] h-[500px]  rounded-xl box-shadow bg-[#F8F8FF] flex flex-col justify-between gap-5 p-6">
        <div
          ref={messagesRef}
          className="bg-[#FFFFFF] rounded-lg w-full h-[400px] max-h-[400px] p-3 overflow-y-auto scrollbar-none flex flex-col gap-2"
        >
          {messages.map((message, index) => (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
              key={index}
              id="messagebox"
              className={`p-2 w-fit min-w-[100px] rounded-lg border-[1px] border-solid border-[#F3F0E8] flex items-center max-w-[150px] ${
                message.isUser
                  ? 'self-end bg-[#ECF3F9]'
                  : 'self-start  bg-[#EEEEFF]'
              }`}
            >
              {/* {message.isUser ? (
                <span className="p-2 rounded-full">
                  <UserIcon className="w-[24px] h-[24[px]" />
                </span>
              ) : (
                <span className="w-[24px] h-[24px] rounded-full overflow-hidden">
                  <img
                    src={BotImg}
                    alt="bot"
                    className="w-full h-full object-cover"
                  />
                </span>
              )} */}
              {message.text}
            </motion.div>
          ))}
        </div>
        <form
          onSubmit={handleUserMessageSubmit}
          className="rounded-full border-[1px] border-solid p-1 pl-4 flex justify-between"
        >
          <input
            type="text"
            value={userMessage}
            onChange={handleUserMessageChange}
            placeholder="Type a message..."
            className="outline-none w-full bg-transparent rounded-xl placeholder:font-alegreya font-alegreya text-[.875rem]"
          />
          <button className="cursor-pointer p-4 bg-[#F3F2ED] rounded-full">
            <PaperAirplaneIcon className="h-5 w-5 text-black" />
          </button>
        </form>
      </article>
    </main>
  );
}

export default App;

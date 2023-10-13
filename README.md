# How to build a very simple chatbot with React js.

This is a simple documentation on the steps to be taken when building a very basic chatbot with React.

--- image ---

I'm very sure you've heard of the all knowing chatGPT, and I've got to be honest when it first came out I swore never to use it and my reason being I believed it'd make me "dumber", well that could be the case if not used wisely, I think...but anyway, I digress.

Ever wondered what it'd be like to build your very own chatGPT, _ahem_, your very own chatbot, well we'll do just that in this little exposition.

_NB: This is a very basic chatbot, but of course, the purpose of this is not to show you all there is to building a chatbot, it's showing you the first step to doing, so go crazy!_

## Okay kids, say "init"!

Of course, our very first step would be initializing our project and for this we would be using the [Vite](https://vitejs.dev/guide/) bunlder, and if you're not using Vite already you should consider doing so, it "negs" CRA in every way. We would also be using [TailwindCSS](https://tailwindcss.com/) and [Framer-Motion](https://www.framer.com/motion/) and [heroicons](https://github.com/tailwindlabs/heroicons) for icons

So you can run the following commands:

```
npm create vite@latest <project-name> -- --template react
cd <project-name>
```

_You can checkout how to get tailwindcss installed [here](https://tailwindcss.com/docs/guides/vite), it doesn't really matter the styling solution you decide to go with._

Now you can install framer motion by running the following:

```
npm i framer-motion
```

Now, we've got everything setup.

## Enough talk, show me the code.

We're now ready to build.

You project structure should be looking like this if all the steps were followed correclty.

--- image ---

First thing we wanna do is build out the interface, and I've pre-built the html structure and styles so you don't have to worry about that so you can `CTRL + C` and `CTRL + V` the code below into your text editor.

```
// App.jsx

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <main className="w-full h-[100svh] bg-[#FFFFFF] flex justify-center items-center">
      <article className="w-[500px] h-[500px]  rounded-xl bg-[#F8F8FF] flex flex-col justify-between gap-5 p-6">
        <div className="bg-[#FFFFFF] rounded-lg w-full h-[400px] max-h-[400px] p-3 overflow-y-auto scrollbar-none flex flex-col gap-2">
          <div>Hello there!</div>
        </div>
        <form className="rounded-full border-[1px] border-solid p-1 pl-4 flex justify-between">
          <input
            type="text"
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
```

Now we start building, but first we need to think about how the chats would be handled, how we identify who sent what, to whom does a message belong, essentially we need a way to identify the sender of each message sent, of course one would be the user and the other would be bot-kun. Well if you think of it this way, each user(ideally and object) has and id of either "bot" or "user", you're very correct, but things could be a lot simpler if we just created and an object that had to be properties, one for the message content and the other could hold a boolean value stating whether or not the sender is a user, we could call it `isUser` and we could keep the object in state, so when the app loads, we want the bot to say something, so we could initializing the object with something, you could update your code with the following:

```
// App.jsx

...

function App() {
  const [messages, setMessages] = useState([
    { text: 'Knock Knock!', isUser: false },
  ]);

...
}
export default App;
```

So in the code, we created an array state value called `messages`, and this array would hold all the messages that are going to be sent.

#### Next we actually want to render the message(s), so we could map through our `messages` and display them.

```
// App.jsx

import { motion } from 'framer-motion';
...

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hello there👋', isUser: false },
  ]);

    ...

    <div className="bg-[#FFFFFF] rounded-lg w-full h-[400px] max-h-[400px] p-3 overflow-y-auto scrollbar-none flex flex-col gap-2">
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
              {message.text}
            </motion.div>
          ))}
    </div>

    ...
}
export default App;
```

In the code, we simply map through the `messages` array to display all the messages that we would be storing there. Don't worry about the `motion.div` and `initial, animate, and transition` attributes, they all come from the framer-motion package so all they're there for is to add little animations.

#### Next we want to be able to send a message to the bot and have it respond.

To do this, we would need to handle a few things, we would need to:

- We'd need to bind our text input to state, to make it a controlled input, so we have access to the value on every change made to the input.
- We'd also need to handle the event in which our user hits enter or sends their message.
- And we'd also want to render their message on screen.

You can update your code with the following:

```
// App.jsx

...

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hello there👋', isUser: false },
  ]);
  const [userMessage, setUserMessage] = useState('');

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  ...

        <input
        type="text"
        placeholder="Type a message..."
        className="outline-none w-full bg-transparent rounded-xl placeholder:font-alegreya font-alegreya text-[.875rem]"
        value={userMessage}
        onChange={handleUserMessageChange}
        />

...
```

In the code we just bound our input to the state value of `userMessage`. That's first issue checked.

Next we would handle the user sending a message being sent.

You could update the code as follows:

```
// App.jsx
...

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleUserMessageSubmit = (event) => {
    event.preventDefault();
    if (userMessage.trim() === '') return;

    setMessages([...messages, { text: userMessage, isUser: true }]);
    setUserMessage('');
  };

...

    <form
      onSubmit={handleUserMessageSubmit}
      className="rounded-full border-[1px] border-solid p-1 pl-4 flex justify-between"
    >

    ...
```

Having done this, we should now be able to get our messages on screen but our bot doesn't seem to respond. Well, let's fix that next.

Update your code accordingly:

```
// App.jsx

...
  const [messages, setMessages] = useState([
    { text: 'Hello there👋', isUser: false },
  ]);
  const [userMessage, setUserMessage] = useState('');

  function getChatbotResponse(userMessage) {
    // Simple chatbot logic (you can make this more advanced)
    const greetings = ['hi', 'hello', 'hey'];
    const chatbotResponses = [
      'Hello!',
      'How can I assist you?',
      'Nice to meet you!',
    ];

    userMessage = userMessage.toLowerCase();
    for (let i = 0; i < greetings.length; i++) {
      if (userMessage.includes(greetings[i])) {
        return chatbotResponses[
          Math.floor(Math.random() * chatbotResponses.length)
        ];
      }
    }

    return "I'm sorry, I don't understand that.";
  }

  ...

   const handleUserMessageSubmit = async (event) => {
    event.preventDefault();
    if (userMessage.trim() === '') return;

    setMessages([...messages, { text: userMessage, isUser: true }]);
    setUserMessage('');

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get bot response
    const botResponse = getChatbotResponse(userMessage);
    setMessages((prev) => {
      return [...prev, { text: botResponse, isUser: false }];
    });
  };
```

In the code, we are declaring a function that handles getting the bot's response, so we call it whenever the user sends a message and generate a response based on that nothing too complex.

And with that, we are do-, wait...We've finally gotten our bot to respond to us, although it's not all that smart, at least we're not the only one in the chatroom, so by all means, go crazy and add more complex logic, give it context of previous messages, do whatever, but for now we need to do just one more thing and that is to, automatically scroll down when a new message is sent and it's surprisingly very easy to do, we just need to keep track of any change made to the `messages` state value and scroll.

Here's the code:

```
// App.jsx
  ...
  const [userMessage, setUserMessage] = useState('');
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  ...

        <div
          ref={messagesRef}
          className="bg-[#FFFFFF] rounded-lg w-full h-[400px] max-h-[400px] p-3 overflow-y-auto scrollbar-none flex flex-col gap-2"
        >

  ...
```

--- image ---

And that's it, we're done with our _very simple_ chatbot. Hack away!.

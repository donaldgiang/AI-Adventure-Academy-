import React from 'react'
   import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════════════════ */
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Nunito', sans-serif; background: #0f0c29; }
  .academy-app { font-family: 'Nunito', sans-serif; min-height: 100vh; }
  .display-font { font-family: 'Fredoka One', cursive; }

  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(168,139,250,0.4)} 50%{box-shadow:0 0 40px rgba(168,139,250,0.8)} }
  @keyframes slide-up { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pop-in { 0%{transform:scale(0.5);opacity:0} 80%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
  @keyframes xp-fly { 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-80px) scale(1.4)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes star-spin { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.2)} 100%{transform:rotate(360deg) scale(1)} }
  @keyframes news-scroll { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }

  .float { animation: float 3s ease-in-out infinite; }
  .slide-up { animation: slide-up 0.5s ease forwards; }
  .pop-in { animation: pop-in 0.4s ease forwards; }
  .xp-fly { animation: xp-fly 1s ease forwards; }
  .star-spin { animation: star-spin 0.6s ease; }

  .shimmer-btn {
    background: linear-gradient(90deg, #a78bfa, #ec4899, #f59e0b, #a78bfa);
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
  }

  .glass {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.15);
  }

  .star-field {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse at 20% 50%, #1a0533 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, #0d1b3e 0%, transparent 50%),
                linear-gradient(135deg, #0f0c29 0%, #141430 50%, #0a1628 100%);
  }

  .world-card:hover { transform: translateY(-4px); transition: transform 0.2s; }
  .lesson-row:hover { transform: translateX(4px); transition: transform 0.2s; }

  .progress-ring { transition: stroke-dashoffset 0.8s ease; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
  ::-webkit-scrollbar-thumb { background: rgba(168,139,250,0.4); border-radius: 3px; }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   WORLD / LESSON DATA
═══════════════════════════════════════════════════════════════════════════ */
const WORLDS = [
  {
    id: 1, emoji: "🌌", name: "What IS AI?", subtitle: "Start your journey",
    gradient: ["#FF6B6B","#FF8E53"], dark: "#7f1d1d",
    lessons: [
      { id:"1-1", icon:"🧠", title:"AI is a Super-Brain Computer", xp:50, type:"learn",
        content:`Imagine a friend who has READ every book, website, and article ever written — billions of pages! They can answer almost any question you throw at them. That friend is basically what AI (Artificial Intelligence) is.\n\nAI like Claude learned from BILLIONS of sentences written by humans. Now it can:\n✨ Answer your questions instantly\n✨ Write stories, poems, and jokes\n✨ Help you design and code apps\n✨ Solve tricky problems step by step\n\nBut here's the wild part — AI doesn't "think" the way YOU do. It's an unbelievably good pattern-matcher. It has learned which words usually come after other words, and it uses those patterns to seem almost magical.\n\nYou + AI = Unstoppable team! 🚀`,
        quiz:{ q:"What did AI like Claude mainly learn from?", opts:["Playing video games","Billions of sentences written by people","Watching movies","Talking to other robots"], a:1 }},
      { id:"1-2", icon:"🚫", title:"AI's Superpowers… and Kryptonite", xp:50, type:"learn",
        content:`Every superhero has a weakness, and AI is no different. Knowing both sides makes YOU the smartest AI user in the room!\n\n🟢 AI is AMAZING at:\n• Explaining anything in simple words\n• Writing, editing, and brainstorming\n• Writing code for apps and games\n• Answering questions from what it learned\n• Translating languages instantly\n\n🔴 AI struggles with:\n• Knowing what happened YESTERDAY (its knowledge has a cutoff date)\n• Doing things in the physical world\n• Being 100% right every time — it can hallucinate!\n• True creativity without your guidance\n\nThe best AI users know when to trust AI and when to double-check. That's called being AI-literate, and you're becoming one right now! 🎓`,
        quiz:{ q:"Which of these is something AI is NOT great at?", opts:["Writing stories","Translating languages","Knowing what happened yesterday","Explaining things simply"], a:2 }},
      { id:"1-3", icon:"📱", title:"AI Apps You Already Use Every Day", xp:75, type:"learn",
        content:`AI is already woven into your daily life — you've been using it without even knowing!\n\n🎵 Spotify & Apple Music — AI studies your listening habits and recommends songs you'll love.\n\n🎮 Video Games — Enemy characters use AI to figure out how to find and chase you!\n\n📸 Phone Camera — Face recognition, portrait mode, night mode? All AI magic!\n\n🔍 Google Search — AI figures out what you ACTUALLY meant, even when you misspell it.\n\n🗣️ Siri, Alexa & Google Assistant — Voice AI that understands natural speech.\n\n🎬 Netflix & YouTube — AI picks what to show you next based on what you've watched.\n\nAnd now you're learning to use Claude — one of the most advanced AI assistants ever built. You're not just a user anymore. You're becoming a CREATOR! 🧙‍♂️`,
        quiz:{ q:"When Netflix picks a show you might like, what technology is it using?", opts:["Magic algorithms","Pure random chance","AI that studies your habits","Your friends' accounts"], a:0 }},
    ]
  },
  {
    id: 2, emoji: "🔮", name: "Mastering Prompts", subtitle: "Talk to AI like a pro",
    gradient: ["#4ECDC4","#44A08D"], dark: "#134e4a",
    lessons: [
      { id:"2-1", icon:"✨", title:"The Secret Language of AI", xp:75, type:"learn",
        content:`A "prompt" is the message you type to an AI. It's how you communicate. But here's the thing — the QUALITY of what you type determines the QUALITY of what you get back.\n\nThink of it like ordering food:\n\n😐 WEAK ORDER: "Give me food"\n🤩 GREAT ORDER: "I'd like the BBQ chicken pizza, medium size, extra cheese, and can you cut it into 8 slices?"\n\nThe same rule applies to AI. Compare these:\n\n😴 WEAK PROMPT: "Write me a story"\n🚀 POWER PROMPT: "Write a 3-paragraph adventure story for a 10-year-old about a girl named Zara who discovers her pet hamster can talk. Make it funny and end with a plot twist."\n\nThe Power Prompt is specific about:\n✅ Length (3 paragraphs)\n✅ Audience (10-year-old)\n✅ Character (Zara + hamster)\n✅ Tone (funny)\n✅ Ending (plot twist)\n\nMore details = better results. Every time.`,
        quiz:{ q:"What makes a prompt more powerful?", opts:["Making it shorter","Using fancy words","Adding specific details and context","Typing in ALL CAPS"], a:2 }},
      { id:"2-2", icon:"🎭", title:"Give AI a Role to Play", xp:100, type:"practice",
        content:`One of the most powerful prompting tricks is telling AI WHO to be. This is called "role prompting" and it completely changes the quality of answers!\n\nCompare:\n😴 "Explain gravity"\n🚀 "You are an enthusiastic science teacher who loves making things fun for 10-year-olds. Explain gravity using the example of a basketball."\n\nSee how the second one gives Claude a CHARACTER to play? It changes everything!\n\nSome roles that work great:\n🎓 "You are a patient tutor who explains things step by step"\n🎮 "You are a game designer who loves making things fun"\n📖 "You are a storyteller who makes everything dramatic and exciting"\n💼 "You are a business coach helping a young entrepreneur"\n🧪 "You are a scientist who explains things with cool experiments"\n\nTry it in the practice box below! Give Claude a role, then ask your question.`,
        challenge:{ weak:"Explain how apps make money", hint:"Give Claude a role first! Try: 'You are a friendly business teacher for kids. Explain...' then ask your question with details." }},
      { id:"2-3", icon:"🔄", title:"The Art of the Follow-Up", xp:75, type:"learn",
        content:`Here's a secret most beginners don't know: you don't have to get it perfect in ONE message!\n\nAI conversations are like playing catch — you throw, they throw back, you throw again. Each round gets better!\n\nPowerful follow-up phrases:\n\n🔧 To improve: "That's good! Now make it funnier and add a plot twist."\n\n📝 To simplify: "Can you explain that again but simpler? I'm 10 years old."\n\n🎯 To get specific: "Change the main character to a girl and set it in space."\n\n⬆️ To expand: "Add a second paragraph about what happens next."\n\n🔍 To question: "Wait, is that actually true? Can you double-check?"\n\n✂️ To shrink: "That's too long. Give me just the 3 most important points."\n\nPro move: At the end of a chat, ask Claude: "What questions could I have asked to get an even better answer?" It will teach you to prompt better! 🎓`,
        quiz:{ q:"What's the best thing to do if Claude's first answer isn't quite right?", opts:["Delete everything and start over","Give up and try Google","Follow up and tell it exactly what to change","Copy it anyway"], a:1 }},
    ]
  },
  {
    id: 3, emoji: "🚀", name: "Build Your First App", subtitle: "Ideas become reality",
    gradient: ["#A78BFA","#7C3AED"], dark: "#2e1065",
    lessons: [
      { id:"3-1", icon:"💡", title:"Every App Starts With a Problem", xp:100, type:"learn",
        content:`Here's a mind-blowing fact: EVERY billion-dollar app started with someone being annoyed about something.\n\n🏠 Airbnb ($75 billion) — Founders couldn't afford a hotel, so they rented air mattresses in their apartment\n🚗 Uber ($72 billion) — Guy couldn't get a taxi on a rainy night in Paris\n📸 Instagram ($1 billion) — People wanted to share photos but they looked bad on phones\n🎵 Spotify ($24 billion) — Music piracy was huge; someone wanted legal, easy music\n\nThe formula is always: PROBLEM → IDEA → APP\n\nTo find YOUR app idea, ask yourself:\n🤔 "What's something that wastes my time?"\n🤔 "What do I wish existed?"\n🤔 "What do my friends always complain about?"\n🤔 "What's something I have to do the hard way?"\n\nYour ideas don't need to be huge — simple apps that solve one problem well can make real money. Let's find yours! 💎`,
        quiz:{ q:"What did Airbnb's founders do that inspired their billion-dollar company?", opts:["Invented flying cars","Rented air mattresses in their apartment","Built a hotel","Created a travel app for adults"], a:1 }},
      { id:"3-2", icon:"📋", title:"The App Blueprint", xp:150, type:"practice",
        content:`Before you build anything, you need a BLUEPRINT. Real engineers use one. Now you will too!\n\n📋 THE APP BLUEPRINT:\n\n1️⃣ THE PROBLEM: What problem does this solve?\n2️⃣ TARGET USER: Who will use it? (Be specific! "Kids age 8-12 who love Minecraft")\n3️⃣ THE SOLUTION: What does your app DO?\n4️⃣ CORE FEATURES: The 3 most important things it can do\n5️⃣ APP NAME: Something catchy and memorable\n6️⃣ HOW IT MAKES MONEY: (We'll learn this in a later world!)\n\nEXAMPLE — Homework Hero:\n• Problem: I forget what homework I have\n• User: Students age 8-14\n• Solution: Track homework with smart reminders\n• Features: Add tasks, set deadlines, streaks for completing homework\n• Name: Homework Hero ⚡\n• Money: Free app, parents pay $1.99/month for reminder alerts\n\nNow use the practice box to describe YOUR app idea to Claude and ask it to help you fill in the blueprint!`,
        challenge:{ weak:"I want to make an app", hint:"Describe your specific idea! What problem does it solve? Who is it for? What does it do? Ask Claude: 'Help me fill in an App Blueprint for my idea: [your idea]'" }},
      { id:"3-3", icon:"🏗️", title:"Tell Claude to Build It!", xp:200, type:"practice",
        content:`This is where things get WILD. You can tell Claude to write actual, working code for your app — even if you don't know how to code!\n\nHere's the magic template:\n\n🔨 THE APP BUILDER PROMPT:\n"Build me a [App Name] app using React. Make it colorful and fun for kids.\n\nFeatures it needs:\n- [Feature 1 — be specific!]\n- [Feature 2]\n- [Feature 3]\n\nDesign: Make it look like [describe the vibe — fun, professional, space-themed, etc.]\nUser: This app is for [who?]\nKeep the code clean and fully working."\n\nREAL EXAMPLE:\n"Build me a Homework Hero app using React. Make it colorful and fun for kids.\n\nFeatures:\n- Input field to add homework with subject name and due date\n- Color-coded list showing all homework (red = due tomorrow, green = not urgent)\n- Tap to mark homework as complete with a confetti animation\n- Streak counter showing how many days in a row I completed all homework\n\nDesign: Space-themed with stars, make it feel exciting not boring\nUser: Students age 8-14\nKeep the code clean and fully working."\n\nPaste Claude's response into Claude.ai as an Artifact and watch your app come to life! 🎉`,
        challenge:{ weak:"Build me an app", hint:"Use the full App Builder Prompt template! Include the app name, 3+ specific features, a design vibe, and who it's for." }},
    ]
  },
  {
    id: 4, emoji: "🎮", name: "Build Games for Money", subtitle: "Turn fun into income",
    gradient: ["#F59E0B","#EF4444"], dark: "#78350f",
    lessons: [
      { id:"4-1", icon:"💰", title:"How Games Actually Make Money", xp:150, type:"learn",
        content:`Did you know kids younger than YOU have made MILLIONS making games? Let's learn the business side of gaming!\n\n💎 THE 6 WAYS GAMES MAKE MONEY:\n\n1️⃣ PAID DOWNLOAD — Players pay once to download ($0.99–$9.99)\nExample: Minecraft was $6.99 when it launched!\n\n2️⃣ FREE + ADS — Free to play, shows ads between levels\nExample: Most mobile games you play for free\n\n3️⃣ IN-APP PURCHASES (IAP) — Free game, but buy special items inside\nExample: Fortnite skins ($8–$20 each!) — Fortnite makes $1 BILLION+ per year this way\n\n4️⃣ SUBSCRIPTIONS — Pay monthly for extra content\nExample: Roblox Premium gives monthly Robux\n\n5️⃣ BATTLE PASSES — Pay for a season of special rewards\nExample: Every major game has one now\n\n6️⃣ SELL ON PLATFORMS — List your game on Steam, App Store, or Google Play\n\nThe BEST strategy for young developers: Start FREE with ads, add one cheap in-app purchase, grow your players, then add more features. 🎯`,
        quiz:{ q:"How does Fortnite make most of its $1 billion+ per year?", opts:["Charging to download","Selling merchandise","In-app purchases like character skins","Monthly subscriptions"], a:2 }},
      { id:"4-2", icon:"🎲", title:"Design a Game That's Hard to Stop Playing", xp:150, type:"learn",
        content:`The most profitable games share a secret formula. Game designers call it the "engagement loop." Here's how it works:\n\n🔄 THE ENGAGEMENT LOOP:\nCHALLENGE → ACTION → REWARD → BIGGER CHALLENGE → repeat!\n\nThis is why you can't put down Candy Crush or Minecraft. They've mastered the loop!\n\n🧲 HOOKS THAT KEEP PLAYERS COMING BACK:\n\n⭐ Daily Login Bonus — "Come back tomorrow for a free reward!"\n🏆 Achievement System — "Collect all 50 badges!"\n👥 Friends & Leaderboards — "Beat your friend's high score!"\n📈 Progression System — Level up, unlock new characters/worlds\n🎰 Surprise Rewards — Random drops keep it exciting (like Pokémon packs!)\n⏰ Limited Time Events — "Only 3 days to get this special item!"\n\n💡 GAME IDEAS AI CAN BUILD FOR YOU:\n• Quiz trivia games about topics kids love\n• Endless runner games (like Temple Run)\n• Card battle games\n• Puzzle games with increasing difficulty\n• Pet simulation games\n• Word games with power-ups\n\nYour job: design the FUN. AI's job: write the code! 🤝`,
        quiz:{ q:"What is the 'engagement loop' that makes games hard to stop playing?", opts:["Buy premium, get rewards, buy more","Challenge → Action → Reward → Bigger Challenge","Log in daily and collect coins","Watch ads to earn game currency"], a:1 }},
      { id:"4-3", icon:"🕹️", title:"Ask Claude to Build Your Game", xp:250, type:"practice",
        content:`Now let's build a REAL game! Here's the ultimate game-building prompt template:\n\n🎮 THE GAME BUILDER PROMPT:\n"Build me a complete [game type] game in React. Here are the details:\n\nGAME CONCEPT: [Describe what happens in 2 sentences]\nPLAYER GOAL: [What does the player try to do?]\nCORE MECHANIC: [The main action — click, type, match, dodge, etc.]\n\nFEATURES:\n- Score counter that increases as you play\n- Lives or health system\n- Increasing difficulty over time\n- Game over screen with final score\n- Start/restart button\n- [Add your own ideas!]\n\nMONETIZATION HOOK: Add a banner that says 'Premium version removes ads!' with a fake upgrade button\nDESIGN: Make it look like [arcade, cute, sci-fi, etc.] with bright colors and animations\nSPECIAL EFFECT: Add a celebration animation when the player scores big\n\nMake it fully playable and fun!"\n\n🏆 EXAMPLE — Word Blaster Game:\n"Build a Word Blaster game in React where letters fall from the top and you must type words before they reach the bottom. Score points per letter. Speed increases every 30 seconds. Game over when 5 letters hit the bottom. Include high score tracking, combo multiplier for fast typing, and celebrate with confetti when setting a new high score. Arcade neon design."\n\nPaste Claude's code into an Artifact and start playing YOUR game! 🎉`,
        challenge:{ weak:"Make me a game", hint:"Use the full Game Builder Prompt! Include: game type, player goal, core mechanic, 4+ features, and a design style. The more specific, the better the game!" }},
      { id:"4-4", icon:"📊", title:"Publish & Earn: Your Game Business Plan", xp:200, type:"learn",
        content:`You've built a game — now let's turn it into a REAL business. Here's the path young developers take:\n\n📍 STEP 1: Test With Friends (Week 1–2)\nShare your game with 10 friends. Watch them play. What confuses them? What makes them laugh? Write it all down. Fix the big problems.\n\n📍 STEP 2: Polish It (Week 2–4)\nAsk Claude to improve the design, add sound effects (described as text prompts), fix bugs, and add a tutorial for new players.\n\n📍 STEP 3: Choose Your Platform\n🌐 Web Games — itch.io is perfect for young developers! Free to list, you keep 90%+ of sales.\n📱 Mobile — Requires a developer account ($25 one-time for Android, $99/year for iPhone)\n🖥️ Desktop — Steam lets you sell games (but needs an adult's account)\n\n📍 STEP 4: Price It Right\nFor your first game: FREE with one in-app purchase ($0.99 to unlock all levels). This gets maximum players!\n\n📍 STEP 5: Get Players\n• Post gameplay videos on YouTube/TikTok\n• Share in gaming communities on Reddit\n• Ask gaming YouTubers to review it\n• Tell your whole school!\n\n💰 REAL KID SUCCESS STORIES:\n• Robert Nay made "Bubble Ball" at age 14 — it hit #1 on the App Store!\n• The creators of Flappy Bird originally made it in 2–3 days\n• Many Roblox game developers under 18 earn thousands monthly\n\nYour first game won't make millions. But it will teach you everything! 🌟`,
        quiz:{ q:"What platform is BEST for a young developer publishing their first web game?", opts:["Steam (requires adult)","itch.io (free and easy)","The App Store only","You can't publish games young"], a:1 }},
    ]
  },
  {
    id: 5, emoji: "🤖", name: "AI Tools of the Future", subtitle: "Stay ahead of the curve",
    gradient: ["#06B6D4","#3B82F6"], dark: "#0c4a6e",
    lessons: [
      { id:"5-1", icon:"🌐", title:"The AI Tools Changing Everything RIGHT NOW", xp:150, type:"live",
        content:`The AI world moves FAST. New tools launch every week that didn't exist when this lesson was written. That's why this lesson asks Claude to tell you what's NEW!\n\nHere's what we know about the major AI tool categories:\n\n🎨 IMAGE AI — Tools like Midjourney, DALL-E, and Adobe Firefly turn your words into stunning artwork. Describe a picture and AI paints it in seconds!\n\n🎵 MUSIC AI — Tools like Suno and Udio create full songs from a text description. "Write me an upbeat pop song about friendship" → full song in 30 seconds!\n\n🎬 VIDEO AI — Tools like Runway and Sora can create short videos from text prompts. The movie industry is being transformed!\n\n💻 CODING AI — GitHub Copilot writes code as you type. Cursor is an AI-powered coding app. Replit lets you build apps with AI help.\n\n🗣️ VOICE AI — ElevenLabs clones voices. AI can now read your story aloud in any voice you choose.\n\nAnd NEW tools are launching every single week. The practice section below will ask Claude to tell you about the LATEST AI tools — because Claude knows things this lesson was written before! 🔮`,
        challenge:{ weak:"What AI tools are new?", hint:"Ask Claude: 'You are a tech journalist writing for kids age 10. List the 5 most exciting new AI tools from the last few months and explain what each one does in simple terms, with an example a kid would love.'" }},
      { id:"5-2", icon:"🧬", title:"AI That Sees, Hears, and Feels", xp:150, type:"learn",
        content:`AI used to only understand text. Now it can see, hear, and understand the world just like you! This is called MULTIMODAL AI.\n\n👁️ VISION AI:\nTake a photo of your homework → AI solves it\nPoint your phone at a plant → AI identifies the species\nShow AI a broken toy → AI tells you how to fix it\nUpload your drawing → AI turns it into a professional illustration\n\n👂 HEARING AI:\nSpeak to AI in any language → it translates instantly\nHum a melody → AI turns it into sheet music\nRecord a lecture → AI creates perfect notes\n\n🤝 AI IN THE REAL WORLD:\nSelf-driving cars use AI vision to navigate\nDoctors use AI to spot diseases in X-rays\nFactories use AI cameras to catch product defects\nFarmers use AI drones to monitor crops\n\n🔮 COMING SOON:\nAI robots that can do physical tasks\nAI glasses that give you information about everything you look at\nAI tutors that watch your face to see if you're confused\n\nYou are growing up in the most exciting time in history. The future you'll live in is being built RIGHT NOW — and you can be one of the builders! 🏗️`,
        quiz:{ q:"What does 'multimodal AI' mean?", opts:["AI that speaks multiple languages","AI that works on multiple devices","AI that can understand text, images, AND audio","AI that has multiple personalities"], a:2 }},
      { id:"5-3", icon:"📡", title:"AI News: What Happened This Week?", xp:100, type:"live",
        content:`AI moves so fast that by the time you read this, there are probably NEW breakthroughs that nobody had heard of before. That's what makes this the most exciting time in history to be growing up!\n\nThis is a special LIVE lesson — you'll ask Claude directly about the most recent AI news. Here's how to read AI news like a pro:\n\n📰 WHAT TO LOOK FOR IN AI NEWS:\n• New AI models being released (like a new version of Claude or ChatGPT)\n• AI being used in a new way nobody thought of before\n• Young people using AI to create or earn money\n• AI tools that are free for students\n• Debates about AI safety and ethics\n\n🤔 QUESTIONS TO ALWAYS ASK ABOUT AI NEWS:\n1. Who benefits from this? Who might be harmed?\n2. Is this real or hype?\n3. How could a kid use this?\n4. What problem does this solve?\n\nUse the practice box to ask Claude about the latest AI news and then analyze it like a pro journalist! This exercise teaches you to be a CRITICAL THINKER — not just an AI user. 🎓`,
        challenge:{ weak:"Tell me AI news", hint:"Ask: 'You are writing an AI news report for curious 10-year-olds. Tell me 3 exciting things that are happening in AI right now in 2025. For each one: explain it simply, say why it matters, and describe how a kid could use it or be affected by it.'" }},
    ]
  },
  {
    id: 6, emoji: "🌟", name: "AI Ethics & Safety", subtitle: "Use power responsibly",
    gradient: ["#10B981","#84CC16"], dark: "#14532d",
    lessons: [
      { id:"6-1", icon:"⚖️", title:"With Great AI Comes Great Responsibility", xp:100, type:"learn",
        content:`You're becoming a powerful AI user. With power comes responsibility — and the smartest creators know the rules of the game.\n\n🚨 THE GOLDEN RULES OF AI USE:\n\n1️⃣ ALWAYS CHECK AI'S FACTS\nAI can be confidently WRONG (called "hallucinating"). Always verify important information from a real source. Never copy AI facts into a school report without checking!\n\n2️⃣ DON'T PRETEND AI'S WORK IS 100% YOURS\nUsing AI to help is fine — pretending AI did zero work when it did most of it is dishonest. Be upfront with teachers: "I used AI to help brainstorm, then wrote it myself."\n\n3️⃣ DON'T USE AI TO HURT PEOPLE\nAI can write mean things. Never use it to bully, trick, or embarrass someone. What you create with AI is YOUR responsibility.\n\n4️⃣ PROTECT PRIVATE INFO\nNever put your full name, address, phone number, or passwords into AI. Treat it like a public space.\n\n5️⃣ THINK FOR YOURSELF\nAI is a tool, not your brain. The goal is to use AI to make YOUR ideas better — not to replace your thinking.\n\nBeing ethical makes you a better creator AND a better person. The world needs AI users with good values! 💚`,
        quiz:{ q:"What should you ALWAYS do with important facts that AI tells you?", opts:["Trust them completely","Ignore them","Verify them from a real source","Copy them immediately"], a:2 }},
      { id:"6-2", icon:"🛡️", title:"Spotting AI Fakes & Misinformation", xp:125, type:"learn",
        content:`AI can create incredibly realistic fake photos, videos, and text. Learning to spot fakes is one of the most important skills of your generation!\n\n🔍 SPOTTING FAKE AI IMAGES:\n• Look at hands — AI often draws too many or weird fingers\n• Check backgrounds — AI images often have blurry or repeating patterns\n• Look at text in the image — AI usually makes it look like gibberish\n• Check if faces look "too perfect" — AI faces often have glassy eyes\n• Reverse image search it on Google Images\n\n🔍 SPOTTING AI-GENERATED TEXT:\n• It often sounds very "professional" with no personality\n• It rarely takes a strong opinion\n• It uses phrases like "it's important to note" and "in conclusion"\n• The details are vague — it talks in generalities\n\n🔍 SPOTTING DEEPFAKE VIDEOS:\n• Look for blurring around the face edges\n• The lighting on the face might not match the background\n• Blinking can look weird or unnatural\n• The mouth movements don't quite sync with sounds\n\nThe best defense? SLOW DOWN before sharing. Ask: "Could this be fake? Does this seem too wild to be true?" If yes — check before you spread it! 🛑`,
        quiz:{ q:"What's a dead giveaway that an AI image might be fake?", opts:["It's too colorful","The hands look weird with extra fingers","The background is blurry everywhere","It has a watermark"], a:1 }},
      { id:"6-3", icon:"🌍", title:"AI and the Future of Jobs", xp:100, type:"learn",
        content:`Here's a big question adults are asking: "Will AI take everyone's jobs?" Let's think about this honestly.\n\n🤔 THE HONEST ANSWER:\nAI WILL change many jobs. But it probably won't make humans useless — instead, it will change WHAT humans do.\n\n📉 JOBS AI MIGHT REPLACE PARTS OF:\n• Data entry and filing\n• Basic customer service chat\n• Simple writing tasks\n• Repetitive manufacturing\n\n📈 JOBS THAT WILL GROW BECAUSE OF AI:\n• AI trainers and prompt engineers\n• AI safety researchers\n• Creative directors who guide AI\n• Tech teachers and explainers\n• Human-centered services (doctors, teachers, counselors)\n• Entrepreneurs who BUILD with AI (that's YOU!)\n\n💡 THE BEST CAREER ADVICE FOR YOUR GENERATION:\nDon't compete WITH AI. Learn to work WITH AI.\n\nThe people who will succeed are those who:\n✅ Know how to direct AI toward great outputs\n✅ Have human creativity and judgment\n✅ Can build things WITH AI\n✅ Understand people's needs and emotions\n\nYou're learning all of these things right now. You're ahead of the curve! 🏆`,
        quiz:{ q:"What's the smartest career approach for the AI generation?", opts:["Avoid learning about AI","Compete against AI","Learn to work WITH AI and direct it","Wait to see what happens"], a:2 }},
    ]
  },
  {
    id: 7, emoji: "👑", name: "Young AI Entrepreneur", subtitle: "Build your AI business",
    gradient: ["#EC4899","#8B5CF6"], dark: "#500724",
    lessons: [
      { id:"7-1", icon:"💼", title:"Kids Who Made Real Money With AI", xp:150, type:"learn",
        content:`These are REAL stories of young people who turned AI and tech skills into income. You can too!\n\n🏆 ROBERT NAY — Age 14\nBuilt "Bubble Ball," a physics puzzle game, during Christmas break. It hit #1 on the App Store beating Angry Birds. Made in 2 weeks. Downloaded 2 million times.\n\n🏆 ROBLOX DEVELOPERS — Various ages (some under 16)\nThousands of developers on Roblox make real money. Top developers earn $50,000–$1,000,000+ per year. They use Roblox Studio (free) and Lua scripting (which AI can help write).\n\n🏆 YOUTUBE TUTORIALS — Ages 12+\nTeen YouTubers who explain tech and AI get millions of views. AI helps them write scripts, generate thumbnails, and edit faster.\n\n🏆 AI ART SELLERS — Various ages\nKids are selling AI-generated artwork on Etsy, Redbubble, and other print-on-demand platforms. Some make $200–$500/month.\n\n🏆 PROMPT SELLERS — Teen entrepreneurs\nSelling "prompt packs" (collections of great AI prompts) on Gumroad and Etsy. A pack of 50 prompts sells for $5–$15.\n\nNOTICE THE PATTERN? They didn't wait until they were adults. They STARTED. What will you start? 🚀`,
        quiz:{ q:"How did 14-year-old Robert Nay make his game 'Bubble Ball'?", opts:["He had a team of 50 engineers","He built it in 2 weeks during Christmas break","He bought another game and renamed it","He hired adult programmers"], a:1 }},
      { id:"7-2", icon:"🛒", title:"5 Ways You Can Earn With AI Right Now", xp:200, type:"learn",
        content:`You don't have to wait to be an adult to start. Here are 5 real income ideas for young AI creators:\n\n💰 IDEA 1: AI GAME DEVELOPER\nBuild games with Claude, publish on itch.io (free!), charge $0.99–$4.99 or take donations. Even 100 players at $0.99 = $99!\n\n💰 IDEA 2: PROMPT PACK CREATOR\nCreate collections of great AI prompts for things people care about: "50 prompts to help write a novel," "30 prompts to design a logo." Sell on Gumroad for $5–$15 each.\n\n💰 IDEA 3: AI ART PRINT STORE\nUse free AI image tools to create cool artwork. Upload to Redbubble or Printify — they print on t-shirts, mugs, and posters and ship them. You earn commission!\n\n💰 IDEA 4: AI TUTOR FOR OTHER KIDS\nYou're becoming an AI expert. Charge $10/hour to teach friends how to use AI for schoolwork. Kids pay other kids — ask your parents to help you set this up.\n\n💰 IDEA 5: YOUTUBE/TIKTOK AI CHANNEL\nFilm yourself using AI to do cool things. Review AI tools. Teach prompts. When you get 1,000 YouTube subscribers, you can monetize. Even without monetization, AI channels are growing FAST.\n\n⚠️ IMPORTANT: Kids under 18 need a parent or guardian to set up payment accounts. Team up with your parents — this could be a family project! 🏠`,
        quiz:{ q:"What do you need to publish paid content and receive money if you're under 18?", opts:["Nothing, anyone can get paid","A parent or guardian to set up payment accounts","A lawyer","At least $1000 to start"], a:1 }},
      { id:"7-3", icon:"🗺️", title:"Your 90-Day AI Creator Roadmap", xp:250, type:"learn",
        content:`Okay, future entrepreneur. Let's make a REAL plan. Here's your 90-day roadmap to becoming an AI creator:\n\n📅 DAYS 1–30: LEARN & EXPERIMENT\n✅ Finish all 7 worlds in this app\n✅ Build 2–3 small apps or games with Claude\n✅ Try 5 different AI tools (Midjourney, Suno, Canva AI, etc.)\n✅ Start a notebook of your ideas\n✅ Pick ONE project you're excited about\n\n📅 DAYS 31–60: BUILD YOUR THING\n✅ Build your chosen game or app with Claude's help\n✅ Test it with 10 friends — watch them use it\n✅ Fix the biggest problems\n✅ Add at least one monetization feature\n✅ Create a simple logo with AI\n\n📅 DAYS 61–90: LAUNCH & SHARE\n✅ Publish on itch.io, Redbubble, or your platform of choice\n✅ Make ONE piece of content about it (YouTube video, TikTok, post)\n✅ Tell everyone you know\n✅ Collect feedback — keep improving\n✅ Set a goal for your NEXT project!\n\n🏆 THE MINDSET THAT MAKES IT WORK:\nDon't wait for perfect. Ship something. Learn. Improve. The kids who actually make things — even small things — are the ones who build up to big things.\n\nYour first project won't be perfect. That's EXACTLY the point. Ready? GO! 🚀`,
        quiz:{ q:"In the 90-day plan, what happens in the FIRST 30 days?", opts:["Launch your product immediately","Learn, experiment, and pick a project","Focus only on making money","Build 10 different apps"], a:1 }},
    ]
  }
];

const BADGES = [
  { id:"first_step", icon:"👟", name:"First Step!", desc:"Complete your first lesson", check: p => p.done.length >= 1 },
  { id:"world1_done", icon:"🌌", name:"AI Explorer", desc:"Complete World 1", check: p => ["1-1","1-2","1-3"].every(id=>p.done.includes(id)) },
  { id:"world2_done", icon:"🔮", name:"Prompt Wizard", desc:"Complete World 2", check: p => ["2-1","2-2","2-3"].every(id=>p.done.includes(id)) },
  { id:"world3_done", icon:"🚀", name:"App Builder", desc:"Complete World 3", check: p => ["3-1","3-2","3-3"].every(id=>p.done.includes(id)) },
  { id:"world4_done", icon:"🎮", name:"Game Dev Jr.", desc:"Complete World 4", check: p => ["4-1","4-2","4-3","4-4"].every(id=>p.done.includes(id)) },
  { id:"world5_done", icon:"🤖", name:"Future Spotter", desc:"Complete World 5", check: p => ["5-1","5-2","5-3"].every(id=>p.done.includes(id)) },
  { id:"world6_done", icon:"🌍", name:"Ethics Champion", desc:"Complete World 6", check: p => ["6-1","6-2","6-3"].every(id=>p.done.includes(id)) },
  { id:"world7_done", icon:"👑", name:"Young Entrepreneur!", desc:"Complete all worlds!", check: p => ["7-1","7-2","7-3"].every(id=>p.done.includes(id)) },
  { id:"xp_500", icon:"⚡", name:"XP Hunter", desc:"Earn 500 XP", check: p => p.xp >= 500 },
  { id:"xp_1000", icon:"💎", name:"XP Master", desc:"Earn 1000 XP", check: p => p.xp >= 1000 },
  { id:"streak_3", icon:"🔥", name:"On Fire!", desc:"Complete 3 lessons in one day", check: p => p.dailyLessons >= 3 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */

function Stars() {
  const stars = Array.from({length:40},(_,i)=>i);
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {stars.map(i=>(
        <div key={i} style={{
          position:"absolute",
          width: Math.random()*3+1+"px",
          height: Math.random()*3+1+"px",
          borderRadius:"50%",
          background:"white",
          left:Math.random()*100+"%",
          top:Math.random()*100+"%",
          opacity:Math.random()*0.7+0.1,
          animation:`float ${Math.random()*4+2}s ease-in-out ${Math.random()*3}s infinite`
        }}/>
      ))}
    </div>
  );
}

function XPBadge({xp}) {
  return (
    <span style={{background:"rgba(245,158,11,0.2)",border:"1px solid rgba(245,158,11,0.5)",color:"#fbbf24",
      fontWeight:800,padding:"3px 10px",borderRadius:999,fontSize:12,display:"inline-flex",gap:4,alignItems:"center"}}>
      ⚡ +{xp} XP
    </span>
  );
}

function ProgressBar({pct, color="#A78BFA", height=10}) {
  return (
    <div style={{background:"rgba(255,255,255,0.1)",borderRadius:999,height,overflow:"hidden",width:"100%"}}>
      <div style={{height:"100%",borderRadius:999,background:color,width:`${Math.min(100,pct)}%`,transition:"width 0.8s ease"}}/>
    </div>
  );
}

function Quiz({quiz, onPass}) {
  const [sel, setSel] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = sel === quiz.a;

  function submit() {
    if (sel === null) return;
    setSubmitted(true);
    if (sel === quiz.a) setTimeout(onPass, 1400);
  }

  return (
    <div style={{marginTop:24,background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:20,padding:20}}>
      <div style={{color:"#93c5fd",fontWeight:800,marginBottom:12,fontSize:15}}>🧩 Quick Check</div>
      <div style={{color:"white",fontWeight:700,marginBottom:14,lineHeight:1.5}}>{quiz.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {quiz.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.06)", border="rgba(255,255,255,0.15)", color="#e2e8f0";
          if(!submitted){ if(sel===i){bg="rgba(99,102,241,0.3)";border="#6366f1";color="white";} }
          else {
            if(i===quiz.a){bg="rgba(16,185,129,0.2)";border="#10b981";color="#6ee7b7";}
            else if(i===sel){bg="rgba(239,68,68,0.15)";border="#ef4444";color="#fca5a5";}
            else{color="#6b7280";}
          }
          return (
            <button key={i} onClick={()=>!submitted&&setSel(i)}
              style={{textAlign:"left",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${border}`,
                background:bg,color,fontWeight:600,fontSize:14,cursor:submitted?"default":"pointer",transition:"all 0.2s"}}>
              {submitted&&i===quiz.a?"✅ ":submitted&&i===sel?"❌ ":""}{opt}
            </button>
          );
        })}
      </div>
      {!submitted && (
        <button onClick={submit} disabled={sel===null}
          style={{marginTop:14,width:"100%",padding:"12px",borderRadius:12,fontWeight:800,fontSize:14,
            background:sel===null?"rgba(255,255,255,0.1)":"linear-gradient(135deg,#3b82f6,#6366f1)",
            color:sel===null?"#6b7280":"white",border:"none",cursor:sel===null?"default":"pointer"}}>
          Check My Answer ✓
        </button>
      )}
      {submitted && (
        <div style={{marginTop:12,textAlign:"center",fontWeight:800,padding:"10px",borderRadius:12,
          background:correct?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.1)",
          color:correct?"#6ee7b7":"#fca5a5"}}>
          {correct ? "🎉 Correct! Awesome work!" : "Almost! The correct answer is highlighted in green."}
        </div>
      )}
    </div>
  );
}

function ClaudePractice({challenge, lessonTitle}) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const taRef = useRef(null);

  async function ask() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`You are an enthusiastic, encouraging AI tutor for a 10-year-old child. 
The child is practicing AI prompting skills in a lesson called "${lessonTitle}".
Be warm, fun, and age-appropriate. Use simple words and emojis occasionally.
If their prompt is vague, gently guide them on how to make it more specific — then answer anyway so they can see the difference.
If their prompt is great and specific, celebrate it enthusiastically and give an excellent answer.
Always end with ONE suggestion for how they could make their next prompt even better.
Keep your response under 250 words.`,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b=>b.text||"").join("") || "Hmm, something went wrong! Try again.";
      setResponse(text);
    } catch {
      setResponse("Oops! Connection issue. Check your internet and try again! 🔄");
    }
    setLoading(false);
  }

  return (
    <div style={{marginTop:24,background:"rgba(168,139,250,0.1)",border:"1px solid rgba(168,139,250,0.3)",borderRadius:20,padding:20}}>
      <div style={{color:"#c4b5fd",fontWeight:800,marginBottom:6,fontSize:15}}>🤖 Practice With Claude!</div>
      <div style={{color:"#a78bfa",fontSize:13,marginBottom:4}}>
        Weak prompt to improve: <em style={{color:"#7c6fcd"}}>"{challenge.weak}"</em>
      </div>
      <div style={{color:"#94a3b8",fontSize:12,marginBottom:12}}>💡 Hint: {challenge.hint}</div>
      <textarea ref={taRef} value={prompt} onChange={e=>setPrompt(e.target.value)}
        placeholder="Write your power prompt here..."
        style={{width:"100%",border:"1.5px solid rgba(168,139,250,0.3)",borderRadius:14,padding:14,
          background:"rgba(255,255,255,0.05)",color:"white",fontSize:13,resize:"vertical",minHeight:90,
          outline:"none",fontFamily:"Nunito, sans-serif"}}/>
      <button onClick={ask} disabled={loading||!prompt.trim()}
        style={{marginTop:10,width:"100%",padding:"13px",borderRadius:14,fontWeight:800,fontSize:14,
          background:loading||!prompt.trim()?"rgba(255,255,255,0.1)":"linear-gradient(135deg,#a78bfa,#7c3aed)",
          color:loading||!prompt.trim()?"#6b7280":"white",border:"none",cursor:loading||!prompt.trim()?"default":"pointer"}}>
        {loading ? "⏳ Claude is thinking..." : "🚀 Send to Claude!"}
      </button>
      {response && (
        <div style={{marginTop:14,background:"rgba(255,255,255,0.06)",borderRadius:14,padding:16,
          border:"1px solid rgba(255,255,255,0.1)"}}>
          <div style={{color:"#a78bfa",fontWeight:800,fontSize:12,marginBottom:8}}>🤖 Claude responds:</div>
          <div style={{color:"#e2e8f0",fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{response}</div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LESSON SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function LessonScreen({lesson, world, onComplete, onBack}) {
  const [phase, setPhase] = useState("read"); // read | quiz | done
  const isLive = lesson.type === "live";
  const hasPractice = !!lesson.challenge;

  function passQuiz() { setPhase("done"); onComplete(lesson.xp); }

  return (
    <div className="academy-app" style={{minHeight:"100vh",background:"#0f0c29",color:"white",padding:"0 0 80px"}}>
      <style>{GLOBAL_STYLE}</style>
      <Stars/>
      <div style={{position:"relative",zIndex:1,maxWidth:680,margin:"0 auto",padding:"20px 16px"}}>
        {/* Top bar */}
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"white",
            width:38,height:38,borderRadius:"50%",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1}}>{world.emoji} {world.name}</div>
            <div style={{fontWeight:800,fontSize:15,lineHeight:1.2}}>{lesson.title}</div>
          </div>
          <XPBadge xp={lesson.xp}/>
        </div>

        {isLive && (
          <div style={{background:"rgba(6,182,212,0.15)",border:"1px solid rgba(6,182,212,0.4)",
            borderRadius:14,padding:"10px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#06b6d4",boxShadow:"0 0 8px #06b6d4",flexShrink:0}}/>
            <div style={{color:"#67e8f9",fontSize:12,fontWeight:700}}>LIVE LESSON — Claude will tell you what's happening RIGHT NOW in AI!</div>
          </div>
        )}

        {/* Main content */}
        <div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:24,padding:24,marginBottom:16}} className="slide-up">
          <div style={{fontSize:52,textAlign:"center",marginBottom:16}}>{lesson.icon}</div>
          <h2 className="display-font" style={{textAlign:"center",fontSize:22,marginBottom:20,
            background:`linear-gradient(135deg,${world.gradient[0]},${world.gradient[1]})`,
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            {lesson.title}
          </h2>
          <div style={{color:"#cbd5e1",lineHeight:1.9,fontSize:14,whiteSpace:"pre-line"}}>{lesson.content}</div>
        </div>

        {/* Practice */}
        {hasPractice && phase !== "done" && (
          <ClaudePractice challenge={lesson.challenge} lessonTitle={lesson.title}/>
        )}

        {/* Quiz or Next */}
        {phase === "read" && (
          <button onClick={() => lesson.quiz ? setPhase("quiz") : (setPhase("done"), onComplete(lesson.xp))}
            className="shimmer-btn"
            style={{width:"100%",marginTop:20,padding:"16px",borderRadius:18,fontWeight:900,
              fontSize:16,border:"none",color:"white",cursor:"pointer"}}>
            {lesson.quiz ? "I'm Ready — Take the Quiz! 🧩" : "Complete This Lesson! ✅"}
          </button>
        )}

        {phase === "quiz" && lesson.quiz && <Quiz quiz={lesson.quiz} onPass={passQuiz}/>}

        {phase === "done" && (
          <div className="pop-in" style={{marginTop:20,background:"rgba(16,185,129,0.15)",
            border:"1px solid rgba(16,185,129,0.4)",borderRadius:24,padding:28,textAlign:"center"}}>
            <div style={{fontSize:56,marginBottom:8}}>🎉</div>
            <div className="display-font" style={{fontSize:24,color:"#6ee7b7",marginBottom:4}}>Lesson Complete!</div>
            <div style={{color:"#a7f3d0",marginBottom:20}}>You earned <strong>+{lesson.xp} XP</strong>!</div>
            <button onClick={onBack}
              style={{padding:"14px 32px",borderRadius:16,background:"linear-gradient(135deg,#10b981,#059669)",
                color:"white",fontWeight:800,border:"none",fontSize:15,cursor:"pointer"}}>
              Back to Map 🗺️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WORLD MAP SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function WorldMapScreen({profile, onSelectLesson, onBack}) {
  const allLessons = WORLDS.flatMap(w=>w.lessons);
  const totalDone = profile.done.length;
  const totalLessons = allLessons.length;

  return (
    <div className="academy-app" style={{minHeight:"100vh",background:"#0f0c29",color:"white",paddingBottom:80}}>
      <style>{GLOBAL_STYLE}</style>
      <Stars/>
      <div style={{position:"relative",zIndex:1,maxWidth:720,margin:"0 auto",padding:"20px 16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"white",
            width:38,height:38,borderRadius:"50%",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
          <div>
            <div className="display-font" style={{fontSize:22}}>🗺️ Learning Map</div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:12}}>{totalDone}/{totalLessons} lessons complete</div>
          </div>
        </div>

        <div style={{marginBottom:28}}>
          <ProgressBar pct={(totalDone/totalLessons)*100} color="linear-gradient(90deg,#a78bfa,#ec4899)" height={12}/>
        </div>

        {WORLDS.map((world, wi) => {
          const done = world.lessons.filter(l=>profile.done.includes(l.id)).length;
          const worldUnlocked = wi === 0 || profile.done.includes(WORLDS[wi-1].lessons[WORLDS[wi-1].lessons.length-1].id);
          return (
            <div key={world.id} className="world-card" style={{marginBottom:20,borderRadius:24,overflow:"hidden",
              border:"1px solid rgba(255,255,255,0.1)",opacity:worldUnlocked?1:0.5}}>
              {/* World header */}
              <div style={{background:`linear-gradient(135deg,${world.gradient[0]},${world.gradient[1]})`,padding:"16px 20px",
                display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,opacity:0.85,textTransform:"uppercase",letterSpacing:1}}>
                    {worldUnlocked ? `World ${world.id}` : `🔒 World ${world.id}`}
                  </div>
                  <div className="display-font" style={{fontSize:20,marginTop:2}}>{world.emoji} {world.name}</div>
                  <div style={{fontSize:12,opacity:0.85}}>{world.subtitle}</div>
                </div>
                <div style={{textAlign:"center",background:"rgba(0,0,0,0.2)",borderRadius:16,padding:"8px 16px"}}>
                  <div style={{fontWeight:900,fontSize:20}}>{done}/{world.lessons.length}</div>
                  <div style={{fontSize:10,opacity:0.8}}>done</div>
                </div>
              </div>
              {/* Lessons */}
              <div style={{background:"rgba(255,255,255,0.03)",padding:14,display:"flex",flexDirection:"column",gap:8}}>
                {world.lessons.map((lesson, li) => {
                  const isDone = profile.done.includes(lesson.id);
                  const prevDone = li === 0 || profile.done.includes(world.lessons[li-1].id);
                  const unlocked = worldUnlocked && prevDone;
                  return (
                    <button key={lesson.id} className="lesson-row"
                      onClick={() => unlocked && onSelectLesson(lesson, world)}
                      style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:16,
                        border:`1.5px solid ${isDone?"rgba(16,185,129,0.4)":unlocked?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.05)"}`,
                        background:isDone?"rgba(16,185,129,0.1)":unlocked?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.02)",
                        color:"white",cursor:unlocked?"pointer":"default",textAlign:"left",width:"100%"}}>
                      <span style={{fontSize:22,flexShrink:0}}>{isDone?"✅":unlocked?lesson.icon:"🔒"}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:13,color:isDone?"#6ee7b7":unlocked?"white":"#6b7280"}}>{lesson.title}</div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2}}>
                          {lesson.type==="live"?"🔴 Live AI content":lesson.type==="practice"?"🎯 Practice":"📖 Reading + Quiz"}
                        </div>
                      </div>
                      <XPBadge xp={lesson.xp}/>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOME SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function HomeScreen({profile, onGoMap, onReset}) {
  const allLessons = WORLDS.flatMap(w=>w.lessons);
  const totalXP = allLessons.reduce((s,l)=>s+l.xp,0);
  const level = Math.max(1, Math.floor(profile.xp / 250) + 1);
  const levelXP = profile.xp % 250;
  const earnedBadges = BADGES.filter(b=>b.check(profile));

  // Next incomplete lesson
  const nextLesson = allLessons.find(l=>!profile.done.includes(l.id));
  const nextWorld = nextLesson ? WORLDS.find(w=>w.lessons.some(l=>l.id===nextLesson.id)) : null;

  return (
    <div className="academy-app" style={{minHeight:"100vh",background:"#0f0c29",color:"white",paddingBottom:80}}>
      <style>{GLOBAL_STYLE}</style>
      <Stars/>
      <div style={{position:"relative",zIndex:1,maxWidth:680,margin:"0 auto",padding:"20px 16px"}}>
        {/* Hero */}
        <div style={{textAlign:"center",paddingTop:16,paddingBottom:28}}>
          <div className="float" style={{fontSize:64,marginBottom:8}}>🚀</div>
          <div className="display-font" style={{fontSize:32,background:"linear-gradient(135deg,#a78bfa,#ec4899,#f59e0b)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1}}>
            AI Adventure Academy
          </div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginTop:6}}>
            Hey {profile.name}! Ready to build the future? 👋
          </div>
        </div>

        {/* Level card */}
        <div style={{background:"linear-gradient(135deg,rgba(167,139,250,0.2),rgba(124,58,237,0.2))",
          border:"1px solid rgba(167,139,250,0.4)",borderRadius:24,padding:22,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{fontWeight:900,fontSize:26}}>Level {level} 🧙‍♂️</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:12}}>{250-levelXP} XP to Level {level+1}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontWeight:900,fontSize:28,color:"#fbbf24"}}>⚡ {profile.xp}</div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>Total XP</div>
            </div>
          </div>
          <ProgressBar pct={(levelXP/250)*100} color="linear-gradient(90deg,#a78bfa,#7c3aed)" height={10}/>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
          {[
            {icon:"📚",val:profile.done.length,label:"Lessons"},
            {icon:"🏅",val:earnedBadges.length,label:"Badges"},
            {icon:"🌍",val:WORLDS.filter(w=>w.lessons.every(l=>profile.done.includes(l.id))).length,label:"Worlds Done"},
          ].map(s=>(
            <div key={s.label} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:18,padding:"16px 8px",textAlign:"center"}}>
              <div style={{fontSize:26}}>{s.icon}</div>
              <div style={{fontWeight:900,fontSize:22,marginTop:4}}>{s.val}</div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={onGoMap} className="shimmer-btn"
          style={{width:"100%",padding:"18px",borderRadius:20,fontWeight:900,fontSize:17,
            border:"none",color:"white",cursor:"pointer",marginBottom:12,boxShadow:"0 8px 32px rgba(167,139,250,0.4)"}}>
          {nextLesson ? `Continue Learning → ${nextLesson.icon} ${nextLesson.title}` : "🏆 All Worlds Complete! View Map"}
        </button>
        {nextWorld && (
          <div style={{textAlign:"center",color:"rgba(255,255,255,0.35)",fontSize:12,marginBottom:20}}>
            Up next in {nextWorld.emoji} {nextWorld.name}
          </div>
        )}

        {/* Badges */}
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:24,padding:20,marginBottom:16}}>
          <div className="display-font" style={{fontSize:18,marginBottom:14}}>🏅 My Badges</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {BADGES.map(b=>{
              const earned = b.check(profile);
              return (
                <div key={b.id} style={{textAlign:"center",padding:"10px 6px",borderRadius:14,
                  background:earned?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.03)",
                  border:`1.5px solid ${earned?"rgba(245,158,11,0.5)":"rgba(255,255,255,0.06)"}`,
                  opacity:earned?1:0.4,transition:"all 0.3s"}}>
                  <div style={{fontSize:22}}>{b.icon}</div>
                  <div style={{fontSize:9,fontWeight:700,color:earned?"#fbbf24":"#6b7280",marginTop:4,lineHeight:1.2}}>{b.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overall progress */}
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:24,padding:20,marginBottom:24}}>
          <div className="display-font" style={{fontSize:18,marginBottom:14}}>📊 Overall Progress</div>
          {WORLDS.map(w=>{
            const done = w.lessons.filter(l=>profile.done.includes(l.id)).length;
            const pct = (done/w.lessons.length)*100;
            return (
              <div key={w.id} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:600}}>{w.emoji} {w.name}</span>
                  <span style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>{done}/{w.lessons.length}</span>
                </div>
                <ProgressBar pct={pct} color={`linear-gradient(90deg,${w.gradient[0]},${w.gradient[1]})`} height={7}/>
              </div>
            );
          })}
        </div>

        <button onClick={()=>{if(window.confirm("Reset all progress? This cannot be undone."))onReset();}}
          style={{width:"100%",padding:"10px",background:"none",border:"none",color:"rgba(255,255,255,0.2)",
            fontSize:12,cursor:"pointer",textDecoration:"underline"}}>
          Reset Progress
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAME SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function NameScreen({onSet}) {
  const [name, setName] = useState("");
  return (
    <div className="academy-app" style={{minHeight:"100vh",background:"#0f0c29",display:"flex",
      alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{GLOBAL_STYLE}</style>
      <Stars/>
      <div style={{position:"relative",zIndex:1,background:"rgba(255,255,255,0.07)",
        backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.15)",
        borderRadius:32,padding:40,maxWidth:400,width:"100%",textAlign:"center"}} className="slide-up">
        <div className="float" style={{fontSize:72,marginBottom:12}}>🚀</div>
        <div className="display-font" style={{fontSize:30,background:"linear-gradient(135deg,#a78bfa,#ec4899,#f59e0b)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:8,lineHeight:1.2}}>
          AI Adventure Academy
        </div>
        <div style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:28,lineHeight:1.6}}>
          Learn to use AI, build apps, design games, and earn money with technology! 🎮💰
        </div>
        <input value={name} onChange={e=>setName(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&name.trim()&&onSet(name.trim())}
          placeholder="What's your name, future creator?"
          style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1.5px solid rgba(167,139,250,0.4)",
            borderRadius:16,padding:"14px 18px",color:"white",fontSize:15,textAlign:"center",
            outline:"none",fontFamily:"Nunito,sans-serif",marginBottom:14}}/>
        <button onClick={()=>name.trim()&&onSet(name.trim())} disabled={!name.trim()}
          className={name.trim()?"shimmer-btn":""}
          style={{width:"100%",padding:"16px",borderRadius:16,fontWeight:900,fontSize:16,
            background:name.trim()?"":"rgba(255,255,255,0.1)",
            color:name.trim()?"white":"#6b7280",border:"none",cursor:name.trim()?"pointer":"default"}}>
          Start My Adventure! 🚀
        </button>
        <div style={{marginTop:20,color:"rgba(255,255,255,0.25)",fontSize:11}}>
          7 worlds • 22 lessons • Live AI practice • Badge collection
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [profile, setProfile] = useState(() => {
    try { const s = localStorage.getItem("aaa_v2"); return s ? JSON.parse(s) : null; } catch { return null; }
  });
  const [screen, setScreen] = useState("home"); // home | map | lesson
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeWorld, setActiveWorld] = useState(null);
  const [xpPop, setXpPop] = useState(null);

  useEffect(() => {
    if (profile) { try { localStorage.setItem("aaa_v2", JSON.stringify(profile)); } catch {} }
  }, [profile]);

  function handleSetName(name) {
    const p = { name, xp: 0, done: [], dailyLessons: 0 };
    setProfile(p);
  }

  function handleComplete(xp) {
    setProfile(p => {
      const alreadyDone = p.done.includes(activeLesson.id);
      return {
        ...p,
        xp: alreadyDone ? p.xp : p.xp + xp,
        done: alreadyDone ? p.done : [...p.done, activeLesson.id],
        dailyLessons: alreadyDone ? p.dailyLessons : (p.dailyLessons || 0) + 1,
      };
    });
    if (!profile?.done?.includes(activeLesson?.id)) {
      setXpPop(xp);
      setTimeout(() => setXpPop(null), 2500);
    }
  }

  function selectLesson(lesson, world) {
    setActiveLesson(lesson);
    setActiveWorld(world);
    setScreen("lesson");
  }

  if (!profile) return <NameScreen onSet={handleSetName}/>;
  if (screen === "lesson" && activeLesson && activeWorld) {
    return (
      <>
        {xpPop && (
          <div className="xp-fly" style={{position:"fixed",top:30,left:"50%",transform:"translateX(-50%)",
            zIndex:9999,background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"white",
            fontWeight:900,fontSize:20,padding:"12px 28px",borderRadius:999,
            boxShadow:"0 8px 30px rgba(245,158,11,0.6)"}}>
            ⚡ +{xpPop} XP!
          </div>
        )}
        <LessonScreen lesson={activeLesson} world={activeWorld} onComplete={handleComplete}
          onBack={()=>setScreen("map")}/>
      </>
    );
  }
  if (screen === "map") {
    return <WorldMapScreen profile={profile} onSelectLesson={selectLesson} onBack={()=>setScreen("home")}/>;
  }
  return (
    <>
      {xpPop && (
        <div className="xp-fly" style={{position:"fixed",top:30,left:"50%",transform:"translateX(-50%)",
          zIndex:9999,background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"white",
          fontWeight:900,fontSize:20,padding:"12px 28px",borderRadius:999,
          boxShadow:"0 8px 30px rgba(245,158,11,0.6)"}}>
          ⚡ +{xpPop} XP!
        </div>
      )}
      <HomeScreen profile={profile} onGoMap={()=>setScreen("map")} onReset={()=>{
        setProfile(null);
        try{localStorage.removeItem("aaa_v2");}catch{}
      }}/>
    </>
  );
}

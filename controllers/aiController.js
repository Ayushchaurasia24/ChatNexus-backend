export const getSuggestions = async (req, res) => {
  try {
    const { text, lastMessage } = req.body;

    const predictions = generatePredictions(text || "");
    const replies = generateReplies(lastMessage || "");

    res.json({ predictions, replies });
  } catch (error) {
    console.error("[getSuggestions]", error.message);
    res.status(500).json({ predictions: [], replies: [] });
  }
};

// 🧠 Helper: pick random items
const pickRandom = (arr, count = 3) => {
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
};

// 🔥 SMART PREDICTIONS (LIKE AI)
const generatePredictions = (text) => {
  if (!text) {
    return pickRandom([
      "Okay",
      "Sounds good",
      "Let’s do it",
      "Sure",
      "Alright then",
    ]);
  }

  const lower = text.toLowerCase();

  if (lower.includes("meet")) {
    return pickRandom([
      "5 pm",
      "tomorrow evening",
      "the office",
      "this weekend",
      "after lunch",
    ]);
  }

  if (lower.includes("call")) {
    return pickRandom([
      "you later",
      "in 10 minutes",
      "tomorrow morning",
      "after work",
      "once I'm free",
    ]);
  }

  if (lower.includes("let")) {
    return pickRandom([
      "me know",
      "us plan something",
      "us catch up",
      "us finalize it",
      "us discuss later",
    ]);
  }

  if (lower.includes("where")) {
    return pickRandom([
      "are you now?",
      "should we meet?",
      "is the location?",
      "exactly?",
      "do you want to go?",
    ]);
  }

  return pickRandom([
    "Okay",
    "Sounds good",
    "Let’s do it",
    "That works",
    "Cool",
    "Got it",
  ]);
};

// 🔥 SMART REPLIES (CONTEXT AWARE)
const generateReplies = (msg) => {
  if (!msg) {
    return pickRandom([
      "Yes",
      "No",
      "Maybe later",
      "Sounds good",
      "Sure",
    ]);
  }

  const lower = msg.toLowerCase();

  if (lower.includes("meeting")) {
    return pickRandom([
      "Yes, I’ll be there",
      "Running late, joining soon",
      "Can we reschedule?",
      "I’ll join in a bit",
      "On my way",
    ]);
  }

  if (lower.includes("where")) {
    return pickRandom([
      "At the office",
      "On the way",
      "Will share location",
      "Near your place",
      "Let me check",
    ]);
  }

  if (lower.includes("coming")) {
    return pickRandom([
      "Yes, almost there",
      "Running a bit late",
      "On my way",
      "Will be there soon",
      "Give me 5 mins",
    ]);
  }

  if (lower.includes("busy")) {
    return pickRandom([
      "A bit busy right now",
      "Will text you later",
      "Let’s talk later",
      "Give me some time",
      "Currently tied up",
    ]);
  }

  return pickRandom([
    "Yes",
    "No",
    "Sounds good",
    "Alright",
    "Okay",
    "Let’s do it",
  ]);
};
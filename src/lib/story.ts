// The epic tale of Josiah and Graham's quest for pizza

export interface Choice {
  id: string;
  text: string;
  nextScene: string;
  consequence: string;
  chaosLevel: number; // -2 to +2
}

export interface Scene {
  id: string;
  title: string;
  narration: string;
  dialogue?: {
    speaker: 'josiah' | 'graham' | 'both' | 'narrator' | 'other';
    text: string;
    speakerName?: string;
  }[];
  choices?: Choice[];
  ending?: {
    type: 'catastrophic' | 'mildly_successful' | 'heroic' | 'bizarre';
    title: string;
    description: string;
    emoji: string;
  };
  background: 'apartment' | 'street' | 'pizza_shop' | 'alley' | 'rooftop' | 'sewer' | 'parade' | 'hospital' | 'news_studio';
  mood: 'normal' | 'tense' | 'chaotic' | 'triumphant' | 'disaster';
}

export const storyData: Record<string, Scene> = {
  // OPENING
  start: {
    id: 'start',
    title: 'A Simple Craving',
    narration: 'It was a perfectly ordinary Tuesday evening. Josiah and Graham sat on their lumpy couch, surrounded by empty chip bags and the remnants of questionable life choices.',
    dialogue: [
      { speaker: 'josiah', text: "Graham. Graham. GRAHAM." },
      { speaker: 'graham', text: "What? I'm literally right here, dude." },
      { speaker: 'josiah', text: "I'm hungry." },
      { speaker: 'graham', text: "Hi Hungry, I'm—" },
      { speaker: 'josiah', text: "Don't." },
      { speaker: 'graham', text: "...also hungry." },
      { speaker: 'both', text: "PIZZA." },
    ],
    choices: [
      {
        id: 'order_online',
        text: '📱 Order pizza online like normal humans',
        nextScene: 'online_order',
        consequence: 'Chose the sensible option',
        chaosLevel: -1,
      },
      {
        id: 'walk_there',
        text: '🚶 Walk to Tony\'s Pizza (it\'s only 3 blocks)',
        nextScene: 'the_walk',
        consequence: 'Decided to go outside',
        chaosLevel: 0,
      },
      {
        id: 'make_pizza',
        text: '👨‍🍳 Attempt to make their own pizza',
        nextScene: 'diy_disaster',
        consequence: 'Overestimated their cooking abilities',
        chaosLevel: 1,
      },
    ],
    background: 'apartment',
    mood: 'normal',
  },

  // BRANCH 1: Online Order
  online_order: {
    id: 'online_order',
    title: 'Technical Difficulties',
    narration: 'Josiah pulls out his phone, which has a cracked screen and 3% battery.',
    dialogue: [
      { speaker: 'josiah', text: "Okay, opening the app... why is everything so small?" },
      { speaker: 'graham', text: "That's the weather app, dude." },
      { speaker: 'josiah', text: "No wonder it keeps asking about humidity preferences." },
      { speaker: 'narrator', text: 'After 10 minutes of squinting, they finally reach the pizza ordering screen.' },
      { speaker: 'graham', text: "Ooh, get the Super Meat Explosion!" },
      { speaker: 'josiah', text: "I'm clicking it... I'm clicking it... why isn't it—" },
      { speaker: 'narrator', text: 'The phone dies.' },
      { speaker: 'both', text: "NOOOOO!" },
    ],
    choices: [
      {
        id: 'use_graham_phone',
        text: "📱 Use Graham's phone (flip phone from 2006)",
        nextScene: 'flip_phone',
        consequence: "Discovered Graham still uses a flip phone",
        chaosLevel: 1,
      },
      {
        id: 'find_charger',
        text: '🔌 Search for a charger in the apartment',
        nextScene: 'charger_hunt',
        consequence: 'Began the great charger expedition',
        chaosLevel: 0,
      },
    ],
    background: 'apartment',
    mood: 'normal',
  },

  flip_phone: {
    id: 'flip_phone',
    title: 'A Relic of the Past',
    narration: "Graham proudly produces a Nokia flip phone held together with rubber bands and hope.",
    dialogue: [
      { speaker: 'josiah', text: "Graham. What is that." },
      { speaker: 'graham', text: "My phone! It's reliable. I've only had to replace the batteries twice this week." },
      { speaker: 'josiah', text: "Does it even have internet?" },
      { speaker: 'graham', text: "It has Snake!" },
      { speaker: 'narrator', text: "They attempt to call Tony's Pizza. The number has been disconnected." },
      { speaker: 'graham', text: "Maybe they moved?" },
      { speaker: 'josiah', text: "Or maybe your phone just... doesn't work." },
    ],
    choices: [
      {
        id: 'walk_anyway',
        text: "🚶 Just walk there already",
        nextScene: 'the_walk',
        consequence: 'Finally decided to use their legs',
        chaosLevel: 0,
      },
      {
        id: 'knock_neighbor',
        text: "🚪 Ask the neighbor to use their phone",
        nextScene: 'neighbor_encounter',
        consequence: 'Involved an innocent bystander',
        chaosLevel: 1,
      },
    ],
    background: 'apartment',
    mood: 'normal',
  },

  neighbor_encounter: {
    id: 'neighbor_encounter',
    title: 'Meet Mrs. Henderson',
    narration: "They knock on their neighbor's door. Mrs. Henderson, a 78-year-old woman with three cats and strong opinions, answers.",
    dialogue: [
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "Oh! The boys from 4B! Are you here about the noise complaint?" },
      { speaker: 'graham', text: "What noise complaint?" },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "The one I'm about to file if you keep playing that racket at midnight." },
      { speaker: 'josiah', text: "That was... a documentary about whales." },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "Well, the whales need to keep it down. What do you want?" },
      { speaker: 'graham', text: "Can we borrow your phone to order pizza?" },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "Pizza? At THIS hour? It's almost 6 PM! You'll ruin your dinner!" },
    ],
    choices: [
      {
        id: 'charm_henderson',
        text: "😊 Try to charm Mrs. Henderson",
        nextScene: 'henderson_charmed',
        consequence: 'Attempted elderly diplomacy',
        chaosLevel: -1,
      },
      {
        id: 'sneak_phone',
        text: "🤫 Distract her while Graham grabs the phone",
        nextScene: 'henderson_heist',
        consequence: 'Committed light burglary',
        chaosLevel: 2,
      },
    ],
    background: 'apartment',
    mood: 'normal',
  },

  henderson_charmed: {
    id: 'henderson_charmed',
    title: "Mrs. Henderson's Mission",
    narration: "Against all odds, Josiah's awkward compliment about her cat calendar works.",
    dialogue: [
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "Oh, you like Mr. Whiskers? He's Miss July, August, AND September!" },
      { speaker: 'josiah', text: "He's... very photogenic?" },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "You know what? I'll order you that pizza. BUT! You have to do me a favor first." },
      { speaker: 'graham', text: "Anything, Mrs. H!" },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "My other cat, Princess Fluffington, escaped. Find her, and pizza is on me." },
      { speaker: 'narrator', text: "The boys exchange glances. A free pizza? They'd wrestle a bear for less." },
    ],
    choices: [
      {
        id: 'search_building',
        text: "🏢 Search the building for Princess Fluffington",
        nextScene: 'cat_search_building',
        consequence: 'Accepted the cat-finding quest',
        chaosLevel: 1,
      },
      {
        id: 'search_outside',
        text: "🌳 Check outside - cats love outdoors, right?",
        nextScene: 'cat_search_outside',
        consequence: 'Took the search to the streets',
        chaosLevel: 1,
      },
    ],
    background: 'apartment',
    mood: 'normal',
  },

  henderson_heist: {
    id: 'henderson_heist',
    title: 'The Worst Plan',
    narration: "Graham whispers 'I got this' which historically means disaster is imminent.",
    dialogue: [
      { speaker: 'graham', text: "Mrs. Henderson! Is that... a SPIDER behind you?!" },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "WHAT?! WHERE?!" },
      { speaker: 'narrator', text: "She spins around. Josiah lunges for the phone on the side table. He grabs it. It's a TV remote." },
      { speaker: 'josiah', text: "Graham, this isn't a phone!" },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "THIEVES! CAT BURGLARS! Oh, the IRONY!" },
      { speaker: 'narrator', text: "Mrs. Henderson produces a can of pepper spray with alarming speed." },
    ],
    choices: [
      {
        id: 'run_away',
        text: "🏃 RUN!",
        nextScene: 'pepper_spray_chase',
        consequence: 'Fled from a senior citizen',
        chaosLevel: 2,
      },
      {
        id: 'apologize_profusely',
        text: "🙏 Drop everything and apologize",
        nextScene: 'apology_accepted',
        consequence: 'Showed genuine remorse',
        chaosLevel: 0,
      },
    ],
    background: 'apartment',
    mood: 'chaotic',
  },

  pepper_spray_chase: {
    id: 'pepper_spray_chase',
    title: 'Tactical Retreat',
    narration: "They sprint down the hallway as Mrs. Henderson pursues them with surprising athleticism.",
    dialogue: [
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "I DO CROSSFIT, YOU PUNKS!" },
      { speaker: 'graham', text: "WHY IS SHE SO FAST?!" },
      { speaker: 'josiah', text: "LESS TALKING, MORE RUNNING!" },
      { speaker: 'narrator', text: "They burst through the fire exit and onto the street, eyes watering, dignity in tatters." },
    ],
    choices: [
      {
        id: 'hide_alley',
        text: "🗑️ Hide in the alley",
        nextScene: 'alley_discovery',
        consequence: 'Took refuge among the garbage',
        chaosLevel: 1,
      },
      {
        id: 'keep_running',
        text: "🏃 Keep running toward Tony's Pizza",
        nextScene: 'running_to_tonys',
        consequence: 'Turned fleeing into productivity',
        chaosLevel: 0,
      },
    ],
    background: 'street',
    mood: 'chaotic',
  },

  apology_accepted: {
    id: 'apology_accepted',
    title: 'Redemption Arc',
    narration: "Josiah drops to his knees in the most dramatic apology ever witnessed.",
    dialogue: [
      { speaker: 'josiah', text: "Mrs. Henderson, we are so, SO sorry. We just really wanted pizza and made terrible choices." },
      { speaker: 'graham', text: "It's true. We're idiots. Well-meaning idiots, but idiots." },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "..." },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "You know what? I respect honesty. And desperation. Reminds me of my late husband, Gerald." },
      { speaker: 'josiah', text: "Was Gerald... also a pizza enthusiast?" },
      { speaker: 'other', speakerName: 'Mrs. Henderson', text: "Gerald was a FOOL. But a lovable one. Fine. I'll order your pizza. But you're carrying my groceries for a month." },
      { speaker: 'both', text: "DEAL!" },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Grocery Coalition',
      description: "Josiah and Graham got their pizza AND a new friend in Mrs. Henderson. They now carry her groceries every Saturday, and she's taught them how to make a mean casserole. Sometimes the best adventures end with community service.",
      emoji: '🛒🍕👵',
    },
    background: 'apartment',
    mood: 'triumphant',
  },

  // BRANCH 2: Walking there
  the_walk: {
    id: 'the_walk',
    title: 'Into the Wild',
    narration: "Three blocks. How hard could it be? The answer, as always when Josiah and Graham are involved, is: very.",
    dialogue: [
      { speaker: 'josiah', text: "Okay, Tony's is on Maple Street. We go left, then right, then..." },
      { speaker: 'graham', text: "Dude, I've lived here for four years. I know where Tony's is." },
      { speaker: 'josiah', text: "You got lost in our apartment last week." },
      { speaker: 'graham', text: "The bathroom moved! I'm telling you, it MOVED." },
      { speaker: 'narrator', text: "They step outside. The sun is setting. A light breeze carries the distant smell of... is that smoke?" },
    ],
    choices: [
      {
        id: 'investigate_smoke',
        text: "🔥 Investigate the smoke smell",
        nextScene: 'smoke_investigation',
        consequence: 'Let curiosity win over hunger',
        chaosLevel: 1,
      },
      {
        id: 'ignore_continue',
        text: "🍕 Ignore it, focus on pizza",
        nextScene: 'street_encounter',
        consequence: 'Prioritized stomach over safety',
        chaosLevel: 0,
      },
      {
        id: 'take_shortcut',
        text: "⚡ Take the 'shortcut' through the alley",
        nextScene: 'alley_shortcut',
        consequence: "Trusted Graham's sense of direction",
        chaosLevel: 2,
      },
    ],
    background: 'street',
    mood: 'normal',
  },

  smoke_investigation: {
    id: 'smoke_investigation',
    title: 'Where There\'s Smoke...',
    narration: "They follow the smoke to find a food truck on fire. Not, like, 'popular' on fire. Actually on fire.",
    dialogue: [
      { speaker: 'graham', text: "Oh no! That's the Taco Tornado truck!" },
      { speaker: 'josiah', text: "Should we... do something?" },
      { speaker: 'other', speakerName: 'Taco Guy', text: "MY TACOS! MY BEAUTIFUL TACOS!" },
      { speaker: 'graham', text: "Quick! We need to help!" },
      { speaker: 'josiah', text: "How?! Neither of us knows how to fight fires!" },
      { speaker: 'graham', text: "I saw a documentary once!" },
      { speaker: 'josiah', text: "About WHALES, Graham. That was about WHALES." },
    ],
    choices: [
      {
        id: 'call_911',
        text: "📞 Call 911 (with Graham's flip phone)",
        nextScene: 'fire_heroes',
        consequence: 'Did the responsible thing',
        chaosLevel: -1,
      },
      {
        id: 'improvise',
        text: "🧯 Look for something to put out the fire",
        nextScene: 'fire_improvise',
        consequence: 'Attempted amateur firefighting',
        chaosLevel: 2,
      },
    ],
    background: 'street',
    mood: 'chaotic',
  },

  fire_heroes: {
    id: 'fire_heroes',
    title: 'Accidental Heroes',
    narration: "Graham's flip phone, against all odds, connects to 911.",
    dialogue: [
      { speaker: 'graham', text: "Hello? There's a fire! The Taco Tornado on 5th Street!" },
      { speaker: 'narrator', text: "The fire department arrives in record time. The taco guy is saved. Local news shows up." },
      { speaker: 'other', speakerName: 'Reporter', text: "We're here with the two heroes who called in the fire. Sir, what made you act so quickly?" },
      { speaker: 'josiah', text: "We were just trying to get pizza, honestly." },
      { speaker: 'other', speakerName: 'Reporter', text: "Such humble heroes! What are your names?" },
      { speaker: 'graham', text: "I'm Graham, and this is my best friend Josiah. We just... like tacos too, you know?" },
      { speaker: 'other', speakerName: 'Taco Guy', text: "FREE TACOS FOR LIFE for these guys! Once I rebuild!" },
    ],
    ending: {
      type: 'heroic',
      title: 'The Accidental Legends',
      description: "Josiah and Graham became local celebrities. The mayor gave them a key to the city (it doesn't open anything). They never got pizza that night, but they got something better: free tacos for life and a story to tell at every party forever. Sometimes heroes are made, not born. And sometimes they just really wanted pizza.",
      emoji: '🦸‍♂️🌮🏆',
    },
    background: 'street',
    mood: 'triumphant',
  },

  fire_improvise: {
    id: 'fire_improvise',
    title: 'Creative Problem Solving',
    narration: "Josiah spots a nearby construction site with a porta-potty.",
    dialogue: [
      { speaker: 'josiah', text: "Graham! The porta-potty! It's full of... liquid!" },
      { speaker: 'graham', text: "Josiah, no. That's not—" },
      { speaker: 'josiah', text: "WE HAVE NO CHOICE!" },
      { speaker: 'narrator', text: "What happens next is best left undescribed. The fire goes out. So does the will to live of everyone within a three-block radius." },
      { speaker: 'other', speakerName: 'Taco Guy', text: "...I can never serve food again." },
      { speaker: 'graham', text: "But the fire's out!" },
      { speaker: 'other', speakerName: 'Taco Guy', text: "AT WHAT COST?!" },
    ],
    ending: {
      type: 'catastrophic',
      title: 'The Biohazard Boys',
      description: "The area was quarantined for 48 hours. Josiah and Graham were banned from that neighborhood PERMANENTLY. They did eventually get pizza, but they had to order from three towns over under fake names. The Taco Tornado guy moved to Alaska and doesn't talk about 'The Incident.' Some victories aren't worth winning.",
      emoji: '☢️🚽😱',
    },
    background: 'street',
    mood: 'disaster',
  },

  street_encounter: {
    id: 'street_encounter',
    title: 'A Fork in the Road',
    narration: "Halfway to Tony's, they encounter a parade blocking the street. A PARADE. On a TUESDAY.",
    dialogue: [
      { speaker: 'josiah', text: "What... is happening?" },
      { speaker: 'graham', text: "It's the Annual Ferret Appreciation Parade!" },
      { speaker: 'josiah', text: "The WHAT?" },
      { speaker: 'graham', text: "I signed us up to volunteer last year when I was sleepy. I thought it said 'Ferrari.'" },
      { speaker: 'narrator', text: "A parade organizer spots Graham and waves frantically." },
      { speaker: 'other', speakerName: 'Parade Lady', text: "GRAHAM! You came! We need you on the ferret float NOW!" },
    ],
    choices: [
      {
        id: 'join_parade',
        text: "🎭 Join the ferret parade (free food after!)",
        nextScene: 'ferret_float',
        consequence: 'Embraced the ferret lifestyle',
        chaosLevel: 1,
      },
      {
        id: 'sneak_around',
        text: "🤫 Sneak around the parade",
        nextScene: 'parade_sneak',
        consequence: 'Attempted parade evasion',
        chaosLevel: 1,
      },
    ],
    background: 'parade',
    mood: 'normal',
  },

  ferret_float: {
    id: 'ferret_float',
    title: 'Ferret Fiesta',
    narration: "Before they can protest, Josiah and Graham are dressed in ferret costumes and placed on a float covered in tube-shaped tunnels.",
    dialogue: [
      { speaker: 'josiah', text: "I can't see anything in this costume!" },
      { speaker: 'graham', text: "Just wave! Wave at the people!" },
      { speaker: 'narrator', text: "Graham waves. Enthusiastically. His arm catches a low-hanging banner. The banner catches a lamppost. The lamppost begins to tip." },
      { speaker: 'both', text: "UH OH." },
      { speaker: 'narrator', text: "The lamppost falls into a fountain. The fountain shorts out. All the lights on the block go dark." },
      { speaker: 'other', speakerName: 'Parade Lady', text: "THE FERRETS HAVE CAUSED A BLACKOUT!" },
    ],
    choices: [
      {
        id: 'embrace_chaos',
        text: "🎉 Own it - yell 'THE FERRETS RISE!'",
        nextScene: 'ferret_revolution',
        consequence: 'Started a bizarre movement',
        chaosLevel: 2,
      },
      {
        id: 'flee_parade',
        text: "🏃 Ditch the costumes and run to Tony's",
        nextScene: 'running_to_tonys',
        consequence: 'Escaped the ferret incident',
        chaosLevel: 0,
      },
    ],
    background: 'parade',
    mood: 'chaotic',
  },

  ferret_revolution: {
    id: 'ferret_revolution',
    title: 'Viva La Ferret',
    narration: "Something snaps in Graham's brain. He climbs atop the float.",
    dialogue: [
      { speaker: 'graham', text: "THE FERRETS RISE! NO MORE SHALL WE BE FORGOTTEN! FERRETS ARE PEOPLE TOO!" },
      { speaker: 'josiah', text: "Graham, ferrets are NOT people—" },
      { speaker: 'graham', text: "METAPHORICALLY, JOSIAH!" },
      { speaker: 'narrator', text: "The crowd, confused but entertained, starts chanting along." },
      { speaker: 'narrator', text: "'FER-RET! FER-RET! FER-RET!'" },
      { speaker: 'narrator', text: "Someone starts a hashtag. It trends. Within an hour, #FerretRevolution has 50,000 tweets." },
      { speaker: 'other', speakerName: 'News Anchor', text: "Breaking: Two men in ferret costumes have apparently started a movement. More at 11." },
    ],
    ending: {
      type: 'bizarre',
      title: 'Ferret Influencers',
      description: "Josiah and Graham accidentally became the faces of the ferret rights movement. They were invited onto talk shows, given a podcast deal, and became minor celebrities. They never did get that pizza, but they got something weirder: fame, fortune, and a lot of ferret-themed fan mail. Graham maintains to this day that ferrets ARE people. Josiah just wanted pepperoni.",
      emoji: '🐿️📱✨',
    },
    background: 'parade',
    mood: 'triumphant',
  },

  parade_sneak: {
    id: 'parade_sneak',
    title: 'Mission: Infiltration',
    narration: "They attempt to sneak through an alley behind the parade route.",
    dialogue: [
      { speaker: 'josiah', text: "Okay, if we're quiet, no one will notice—" },
      { speaker: 'narrator', text: "Graham steps on a cat's tail. The cat SCREAMS. A chain reaction of startled ferrets begins." },
      { speaker: 'graham', text: "I'M SORRY, CAT!" },
      { speaker: 'narrator', text: "Ferrets are now loose everywhere. It's pandemonium. Someone yells 'FERRET STAMPEDE!'" },
    ],
    choices: [
      {
        id: 'catch_ferrets',
        text: "🐿️ Help catch the loose ferrets",
        nextScene: 'ferret_wrangling',
        consequence: 'Became impromptu ferret wranglers',
        chaosLevel: 1,
      },
      {
        id: 'use_distraction',
        text: "🏃 Use the chaos as cover to escape to Tony's",
        nextScene: 'running_to_tonys',
        consequence: 'Exploited ferret chaos for pizza',
        chaosLevel: 0,
      },
    ],
    background: 'alley',
    mood: 'chaotic',
  },

  ferret_wrangling: {
    id: 'ferret_wrangling',
    title: 'The Great Ferret Roundup',
    narration: "Armed with nothing but determination and some loose french fries from Graham's pocket, they attempt to corral the ferrets.",
    dialogue: [
      { speaker: 'graham', text: "Here ferret, ferret, ferret... good ferret..." },
      { speaker: 'narrator', text: "A ferret latches onto Graham's leg." },
      { speaker: 'graham', text: "OW! NOT GOOD FERRET! BAD FERRET!" },
      { speaker: 'josiah', text: "Use the fries! They're attracted to the fries!" },
      { speaker: 'narrator', text: "Two hours later, all 47 ferrets are recovered. Josiah and Graham are exhausted, covered in tiny scratches, but victorious." },
      { speaker: 'other', speakerName: 'Parade Lady', text: "You saved the parade! Take these complimentary tickets to Tony's Pizza!" },
      { speaker: 'both', text: "WAIT, TONY'S IS A SPONSOR?!" },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Ferret Whisperers',
      description: "Josiah and Graham got their pizza, plus free refills for a year, as thanks for saving the Ferret Appreciation Parade. They're now banned from owning ferrets ('for the ferrets' safety,' according to the parade committee), but they're okay with that. Some heroes work in the shadows. Some work in ferret scratch ointment.",
      emoji: '🐿️🍕🏅',
    },
    background: 'parade',
    mood: 'triumphant',
  },

  alley_shortcut: {
    id: 'alley_shortcut',
    title: 'Graham\'s "Shortcut"',
    narration: "Graham leads them confidently into an alley that definitely doesn't go toward Tony's.",
    dialogue: [
      { speaker: 'graham', text: "Trust me, this saves like... ten minutes." },
      { speaker: 'josiah', text: "Graham, the sun is setting in front of us. Tony's is BEHIND us." },
      { speaker: 'graham', text: "It's a... scenic shortcut." },
      { speaker: 'narrator', text: "The alley opens into what can only be described as 'someone's attempt at a secret garden that failed spectacularly.'" },
      { speaker: 'josiah', text: "Is that a... shopping cart full of mannequin heads?" },
      { speaker: 'graham', text: "Art! It's probably art." },
    ],
    choices: [
      {
        id: 'explore_garden',
        text: "🌿 Explore the weird garden",
        nextScene: 'secret_garden',
        consequence: 'Entered the realm of weird',
        chaosLevel: 2,
      },
      {
        id: 'turn_back',
        text: "↩️ Turn back, this is too weird",
        nextScene: 'street_encounter',
        consequence: 'Chose sanity over adventure',
        chaosLevel: 0,
      },
    ],
    background: 'alley',
    mood: 'tense',
  },

  secret_garden: {
    id: 'secret_garden',
    title: 'The Garden of Questionable Decisions',
    narration: "They venture deeper into the garden. Christmas lights hang from dead trees. Lawn flamingos watch with judgmental plastic eyes.",
    dialogue: [
      { speaker: 'josiah', text: "I feel like we shouldn't be here." },
      { speaker: 'graham', text: "I feel like we should steal a flamingo." },
      { speaker: 'josiah', text: "What? No! Graham, focus!" },
      { speaker: 'other', speakerName: 'Strange Voice', text: "WELCOME, TRAVELERS." },
      { speaker: 'narrator', text: "An old man emerges from behind a pile of VHS tapes. He's wearing a bathrobe and a crown made of bottle caps." },
      { speaker: 'other', speakerName: 'Garden King', text: "I am King Leonard, ruler of the Forgotten Garden. What brings you to my kingdom?" },
    ],
    choices: [
      {
        id: 'befriend_leonard',
        text: "👑 Play along with King Leonard",
        nextScene: 'leonard_quest',
        consequence: 'Acknowledged royalty',
        chaosLevel: 1,
      },
      {
        id: 'ask_directions',
        text: "📍 Ask for directions to Tony's Pizza",
        nextScene: 'leonard_directions',
        consequence: 'Sought guidance from the king',
        chaosLevel: 0,
      },
    ],
    background: 'alley',
    mood: 'tense',
  },

  leonard_quest: {
    id: 'leonard_quest',
    title: "The King's Request",
    narration: "King Leonard strokes his imaginary beard thoughtfully.",
    dialogue: [
      { speaker: 'other', speakerName: 'King Leonard', text: "Ah, loyal subjects! I have a quest for you. Bring me the Golden Spatula from Tony's Pizza, and I shall reward you handsomely!" },
      { speaker: 'josiah', text: "The... golden spatula?" },
      { speaker: 'other', speakerName: 'King Leonard', text: "Tony won it in the '97 Pizza Olympics. It's been on his wall for decades. RETRIEVE IT!" },
      { speaker: 'graham', text: "What's the reward?" },
      { speaker: 'other', speakerName: 'King Leonard', text: "This coupon for 20% off at Tony's. It expired in 2003, but Tony still honors it. He owes me." },
      { speaker: 'josiah', text: "...Why does Tony owe you?" },
      { speaker: 'other', speakerName: 'King Leonard', text: "That's between me and Tony." },
    ],
    choices: [
      {
        id: 'accept_quest',
        text: "⚔️ Accept the quest for the Golden Spatula",
        nextScene: 'spatula_heist',
        consequence: 'Pledged allegiance to a weird king',
        chaosLevel: 2,
      },
      {
        id: 'politely_decline',
        text: "🙏 Politely decline and ask for directions instead",
        nextScene: 'leonard_directions',
        consequence: 'Respected royalty but stayed focused',
        chaosLevel: 0,
      },
    ],
    background: 'alley',
    mood: 'tense',
  },

  leonard_directions: {
    id: 'leonard_directions',
    title: 'Royal Navigation',
    narration: "King Leonard looks slightly disappointed but understanding.",
    dialogue: [
      { speaker: 'other', speakerName: 'King Leonard', text: "Tony's, you say? Ah yes. Go through the back of my kingdom, climb the fire escape to the roof, and Tony's is right across the street." },
      { speaker: 'graham', text: "That seems unnecessarily complicated." },
      { speaker: 'other', speakerName: 'King Leonard', text: "The normal way is blocked by the ferret parade." },
      { speaker: 'josiah', text: "The WHAT parade?" },
      { speaker: 'other', speakerName: 'King Leonard', text: "You heard me. Now go, before the ferrets find you. They know no loyalty." },
    ],
    choices: [
      {
        id: 'take_rooftop',
        text: "🏗️ Take the rooftop route",
        nextScene: 'rooftop_adventure',
        consequence: 'Followed royal advice',
        chaosLevel: 1,
      },
      {
        id: 'brave_parade',
        text: "🎭 Brave the ferret parade",
        nextScene: 'street_encounter',
        consequence: 'Faced the ferrets head-on',
        chaosLevel: 1,
      },
    ],
    background: 'alley',
    mood: 'normal',
  },

  spatula_heist: {
    id: 'spatula_heist',
    title: 'The Heist',
    narration: "They arrive at Tony's with a plan: distract Tony while the other grabs the Golden Spatula.",
    dialogue: [
      { speaker: 'graham', text: "I'll distract him. I'll pretend to choke." },
      { speaker: 'josiah', text: "That's terrible. Do it." },
      { speaker: 'narrator', text: "Graham fake-chokes so convincingly that three other customers perform the Heimlich on him simultaneously." },
      { speaker: 'graham', text: "ACK— I'M— OKAY— STOP— MY RIBS—" },
      { speaker: 'narrator', text: "Josiah grabs the spatula. Alarms go off. Actual alarms. Tony installed security alarms specifically for the spatula." },
      { speaker: 'other', speakerName: 'Tony', text: "LEONARD SENT YOU, DIDN'T HE?! THAT RIVALRY ENDED IN '97!" },
    ],
    ending: {
      type: 'catastrophic',
      title: 'The Pizza Wars',
      description: "Josiah and Graham were arrested for attempted spatula theft. It turns out King Leonard and Tony have been feuding since the '97 Pizza Olympics, where Leonard accused Tony of bribing the judges. They spent the night in jail but were released when Leonard bailed them out. They never got pizza that night, but they did get a wild story and a lifetime ban from Tony's. Worth it? Debatable.",
      emoji: '🚔🍕👑',
    },
    background: 'pizza_shop',
    mood: 'disaster',
  },

  rooftop_adventure: {
    id: 'rooftop_adventure',
    title: 'Rooftop Runners',
    narration: "They climb the fire escape and emerge onto a rooftop with a stunning view of the city... and Tony's Pizza, just one building away.",
    dialogue: [
      { speaker: 'josiah', text: "We're so close! I can SMELL the pizza!" },
      { speaker: 'graham', text: "There's a gap between buildings. We'll have to jump." },
      { speaker: 'josiah', text: "It's like... six feet." },
      { speaker: 'graham', text: "I've jumped further! Probably!" },
      { speaker: 'narrator', text: "The gap is actually four feet. But below it is a dumpster. A VERY full dumpster." },
    ],
    choices: [
      {
        id: 'make_jump',
        text: "🦘 Make the jump!",
        nextScene: 'the_leap',
        consequence: 'Trusted in gravity',
        chaosLevel: 1,
      },
      {
        id: 'find_other_way',
        text: "🪜 Look for another way across",
        nextScene: 'plank_bridge',
        consequence: 'Sought engineering solutions',
        chaosLevel: 1,
      },
    ],
    background: 'rooftop',
    mood: 'tense',
  },

  the_leap: {
    id: 'the_leap',
    title: 'Leap of Faith',
    narration: "Josiah goes first. He makes it! Barely. His shoe falls off into the dumpster below.",
    dialogue: [
      { speaker: 'josiah', text: "I made it! One shoe down, but I made it! Your turn, Graham!" },
      { speaker: 'graham', text: "Okay. Okay. I can do this. I'm basically an athlete." },
      { speaker: 'narrator', text: "Graham is not basically an athlete. He jumps. Time slows down. He's going to make it... he's going to make it..." },
      { speaker: 'narrator', text: "He makes it! His fingers catch the ledge!" },
      { speaker: 'graham', text: "HELP! MY GRIP IS SLIPPING!" },
      { speaker: 'josiah', text: "GIVE ME YOUR HAND!" },
      { speaker: 'narrator', text: "Josiah pulls Graham up. They collapse on the rooftop, panting, one shoe between them, but alive." },
    ],
    choices: [
      {
        id: 'celebrate',
        text: "🎉 Celebrate, then go get pizza",
        nextScene: 'victory_pizza',
        consequence: 'Earned that pizza',
        chaosLevel: 0,
      },
    ],
    background: 'rooftop',
    mood: 'tense',
  },

  plank_bridge: {
    id: 'plank_bridge',
    title: 'Engineering 101',
    narration: "They find a wooden plank that MIGHT reach across the gap.",
    dialogue: [
      { speaker: 'graham', text: "It's definitely long enough." },
      { speaker: 'josiah', text: "It's bending in the middle." },
      { speaker: 'graham', text: "Adds character!" },
      { speaker: 'narrator', text: "Josiah goes first, crawling across the plank. It creaks ominously but holds." },
      { speaker: 'narrator', text: "Graham follows. The plank starts to crack." },
      { speaker: 'graham', text: "SHOULD I GO FASTER OR SLOWER?!" },
      { speaker: 'josiah', text: "YES!" },
      { speaker: 'narrator', text: "Graham army-crawls at maximum speed. The plank snaps just as he reaches the other side, sending it tumbling into the alley below." },
      { speaker: 'both', text: "WE'RE ALIVE!" },
    ],
    choices: [
      {
        id: 'celebrate_plank',
        text: "🎉 Celebrate survival and get pizza",
        nextScene: 'victory_pizza',
        consequence: 'Survived questionable engineering',
        chaosLevel: 0,
      },
    ],
    background: 'rooftop',
    mood: 'tense',
  },

  victory_pizza: {
    id: 'victory_pizza',
    title: "Tony's at Last",
    narration: "They climb down from the roof (via a much safer fire escape) and enter Tony's Pizza. The smell of cheese and victory fills their nostrils.",
    dialogue: [
      { speaker: 'other', speakerName: 'Tony', text: "Welcome to Tony's! What can I— why is one of you missing a shoe?" },
      { speaker: 'josiah', text: "Long story. Large pepperoni, please." },
      { speaker: 'graham', text: "And breadsticks!" },
      { speaker: 'other', speakerName: 'Tony', text: "Coming right up. You two look like you've been through something." },
      { speaker: 'josiah', text: "Tony, you have no idea." },
      { speaker: 'narrator', text: "They sit in a booth, exhausted but triumphant. The pizza arrives, golden and perfect. It tastes like everything they've been through was worth it." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'Quest Complete',
      description: "Josiah and Graham got their pizza. It took rooftop parkour, a fire escape, and one lost shoe, but they did it. They ate in satisfied silence, too tired to talk, too happy to care. Sometimes the journey makes the destination sweeter. And sometimes, pizza just tastes better after you've earned it.",
      emoji: '🍕🏆👟',
    },
    background: 'pizza_shop',
    mood: 'triumphant',
  },

  // BRANCH 3: DIY Disaster
  diy_disaster: {
    id: 'diy_disaster',
    title: 'Chef Josiah and Sous Chef Graham',
    narration: "They survey their kitchen. It's seen better days. And cleaner days. Many, many cleaner days.",
    dialogue: [
      { speaker: 'josiah', text: "Okay, pizza. How hard can it be? Dough, sauce, cheese." },
      { speaker: 'graham', text: "We have... bread. And ketchup. And... is this cheese?" },
      { speaker: 'josiah', text: "That's been in there since we moved in." },
      { speaker: 'graham', text: "So it's aged! That's fancy!" },
      { speaker: 'narrator', text: "The 'cheese' makes a noise that cheese should not make when Graham touches it." },
      { speaker: 'both', text: "We need to go shopping." },
    ],
    choices: [
      {
        id: 'quick_store',
        text: "🏪 Quick trip to the corner store",
        nextScene: 'corner_store',
        consequence: 'Sought professional ingredients',
        chaosLevel: 0,
      },
      {
        id: 'improvise_ingredients',
        text: "🧪 Improvise with what we have",
        nextScene: 'kitchen_chaos',
        consequence: 'Embraced culinary chaos',
        chaosLevel: 2,
      },
    ],
    background: 'apartment',
    mood: 'normal',
  },

  corner_store: {
    id: 'corner_store',
    title: 'The Corner Store Expedition',
    narration: "The corner store is run by Mr. Park, who has seen Josiah and Graham make many questionable purchases.",
    dialogue: [
      { speaker: 'other', speakerName: 'Mr. Park', text: "Ah, the usual? Energy drinks and regret?" },
      { speaker: 'graham', text: "Not today, Mr. Park! We're making PIZZA." },
      { speaker: 'other', speakerName: 'Mr. Park', text: "...Should I call the fire department now or later?" },
      { speaker: 'josiah', text: "Your lack of faith is hurtful but understandable." },
      { speaker: 'narrator', text: "They gather supplies: pre-made dough, tomato sauce, mozzarella, and—" },
      { speaker: 'graham', text: "Gummy bears!" },
      { speaker: 'josiah', text: "No." },
      { speaker: 'graham', text: "For MORALE, Josiah." },
    ],
    choices: [
      {
        id: 'proper_ingredients',
        text: "🍅 Stick to proper pizza ingredients",
        nextScene: 'cooking_montage',
        consequence: 'Exercised restraint',
        chaosLevel: -1,
      },
      {
        id: 'experimental',
        text: "🧪 Get weird with toppings",
        nextScene: 'weird_toppings',
        consequence: 'Chose culinary adventure',
        chaosLevel: 1,
      },
    ],
    background: 'street',
    mood: 'normal',
  },

  cooking_montage: {
    id: 'cooking_montage',
    title: 'The Cooking Montage',
    narration: "Back in the apartment, an epic cooking montage begins. If this were a movie, inspirational music would be playing.",
    dialogue: [
      { speaker: 'narrator', text: "Graham rolls the dough. Flour goes everywhere. The cat from downstairs appears at the window, judging." },
      { speaker: 'narrator', text: "Josiah spreads the sauce. It's mostly on the dough. Mostly." },
      { speaker: 'narrator', text: "The cheese goes on. It's uneven but enthusiastic." },
      { speaker: 'graham', text: "Into the oven!" },
      { speaker: 'josiah', text: "What temperature?" },
      { speaker: 'graham', text: "ALL of it. Maximum heat equals maximum pizza." },
      { speaker: 'josiah', text: "That's not how— you know what, sure." },
    ],
    choices: [
      {
        id: 'high_heat',
        text: "🔥 Maximum heat! Go big or go home!",
        nextScene: 'oven_fire',
        consequence: 'Trusted Graham\'s heat theory',
        chaosLevel: 2,
      },
      {
        id: 'normal_heat',
        text: "📖 Actually look up the proper temperature",
        nextScene: 'pizza_success',
        consequence: 'Used common sense',
        chaosLevel: -1,
      },
    ],
    background: 'apartment',
    mood: 'normal',
  },

  oven_fire: {
    id: 'oven_fire',
    title: 'The Inferno',
    narration: "The oven protests the maximum heat setting. The pizza protests existence. Smoke fills the kitchen.",
    dialogue: [
      { speaker: 'josiah', text: "Is... is it supposed to glow like that?" },
      { speaker: 'graham', text: "I think that's just... enthusiasm?" },
      { speaker: 'narrator', text: "The smoke alarm begins its song of despair. The cat at the window has fled. Wise cat." },
      { speaker: 'josiah', text: "OPEN THE WINDOW!" },
      { speaker: 'graham', text: "WHICH WINDOW?!" },
      { speaker: 'josiah', text: "ALL OF THEM!" },
      { speaker: 'narrator', text: "They frantically open every window. The smoke alarm neighbors' smoke alarms. It's a symphony of failure." },
    ],
    choices: [
      {
        id: 'call_fire_dept',
        text: "🚒 Call the fire department",
        nextScene: 'fire_dept_arrival',
        consequence: 'Admitted defeat',
        chaosLevel: 1,
      },
      {
        id: 'handle_it',
        text: "🧯 Handle it yourselves",
        nextScene: 'diy_firefighting',
        consequence: 'Doubled down on DIY',
        chaosLevel: 2,
      },
    ],
    background: 'apartment',
    mood: 'chaotic',
  },

  fire_dept_arrival: {
    id: 'fire_dept_arrival',
    title: 'The Professionals',
    narration: "The fire department arrives. This is the third time this year for this apartment.",
    dialogue: [
      { speaker: 'other', speakerName: 'Firefighter Jen', text: "Unit 4B. Why am I not surprised." },
      { speaker: 'josiah', text: "Jen! Good to see you again!" },
      { speaker: 'other', speakerName: 'Firefighter Jen', text: "I wish I could say the same. What was it this time?" },
      { speaker: 'graham', text: "Pizza." },
      { speaker: 'other', speakerName: 'Firefighter Jen', text: "Of course. At least last month's 'indoor fireworks' had some creativity." },
      { speaker: 'narrator', text: "The fire is contained. The pizza is a carbon disk. Their dignity is ash." },
      { speaker: 'other', speakerName: 'Firefighter Jen', text: "I'm ordering you pizza. From PROFESSIONALS. Consider it a public safety measure." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Fire Department Fund',
      description: "Firefighter Jen ordered them pizza out of pity and a genuine concern for public safety. Josiah and Graham now donate monthly to the fire department and have been banned from using their oven without supervision. They got their pizza, plus a valuable lesson about heat settings. The pizza was delicious. The shame was lasting.",
      emoji: '🚒🍕💸',
    },
    background: 'apartment',
    mood: 'normal',
  },

  diy_firefighting: {
    id: 'diy_firefighting',
    title: 'Amateur Hour',
    narration: "Graham grabs the nearest liquid and throws it on the oven. The nearest liquid is olive oil.",
    dialogue: [
      { speaker: 'josiah', text: "GRAHAM, NO!" },
      { speaker: 'graham', text: "WHAT?!" },
      { speaker: 'narrator', text: "The flames triple in size. The oven has achieved sentience and chosen violence." },
      { speaker: 'josiah', text: "OIL MAKES FIRE WORSE!" },
      { speaker: 'graham', text: "SINCE WHEN?!" },
      { speaker: 'josiah', text: "SINCE ALWAYS!" },
      { speaker: 'narrator', text: "They grab the actual fire extinguisher. The fire is defeated, but so is the oven, the pizza, and most of their kitchen wall." },
    ],
    ending: {
      type: 'catastrophic',
      title: 'The Kitchen Renovation',
      description: "Their landlord was... displeased. Josiah and Graham spent the next three months living off microwave meals while the kitchen was repaired. They were charged for damages. They didn't get pizza that night, or for many nights after. But they learned a valuable lesson about oil and fire. Graham maintains to this day that no one ever taught him that. No one believes him.",
      emoji: '🔥😱🏚️',
    },
    background: 'apartment',
    mood: 'disaster',
  },

  pizza_success: {
    id: 'pizza_success',
    title: 'Against All Odds',
    narration: "They Google the correct temperature. 425°F. They set it correctly. They wait.",
    dialogue: [
      { speaker: 'graham', text: "This is boring. Where's the excitement? The danger?" },
      { speaker: 'josiah', text: "Graham, we've had enough excitement. Let's just... have normal pizza." },
      { speaker: 'narrator', text: "The timer dings. They open the oven. Golden, bubbly, perfect. It's... actually good?" },
      { speaker: 'graham', text: "Josiah. We made pizza." },
      { speaker: 'josiah', text: "We made pizza." },
      { speaker: 'both', text: "WE MADE PIZZA!" },
      { speaker: 'narrator', text: "It's not the best pizza they've ever had. But it's THEIR pizza. And that makes it special." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Home Cooks',
      description: "Josiah and Graham made pizza. Actual, edible, pretty-decent pizza. They high-fived so hard that Josiah's hand hurt for a week, but it was worth it. They've since expanded to making pasta and once attempted a soufflé (we don't talk about the soufflé). Sometimes the best adventures are the ones that end with a sense of accomplishment and minimal property damage.",
      emoji: '👨‍🍳🍕🎉',
    },
    background: 'apartment',
    mood: 'triumphant',
  },

  weird_toppings: {
    id: 'weird_toppings',
    title: 'Culinary Crimes',
    narration: "They return home with: mozzarella, sauce, dough, gummy bears, hot Cheetos, pickles, and something labeled 'mystery meat' that was on sale.",
    dialogue: [
      { speaker: 'josiah', text: "We're going to regret this." },
      { speaker: 'graham', text: "We're going to REVOLUTIONIZE pizza." },
      { speaker: 'narrator', text: "The pizza is assembled. It looks like modern art. The kind people pretend to understand." },
      { speaker: 'graham', text: "It's beautiful." },
      { speaker: 'josiah', text: "It's concerning." },
      { speaker: 'narrator', text: "Into the oven it goes. The smell that emerges is... indescribable. Not bad. Not good. Just... new." },
    ],
    choices: [
      {
        id: 'taste_test',
        text: "😋 Taste test it",
        nextScene: 'weird_pizza_taste',
        consequence: 'Bravely consumed the abomination',
        chaosLevel: 1,
      },
      {
        id: 'chicken_out',
        text: "🐔 Chicken out and order real pizza",
        nextScene: 'shame_order',
        consequence: 'Chose safety over science',
        chaosLevel: 0,
      },
    ],
    background: 'apartment',
    mood: 'tense',
  },

  weird_pizza_taste: {
    id: 'weird_pizza_taste',
    title: 'The Tasting',
    narration: "They each take a slice. Eye contact is made. Silent agreements are formed.",
    dialogue: [
      { speaker: 'both', text: "On three. One... two... THREE." },
      { speaker: 'narrator', text: "They bite. They chew. They process." },
      { speaker: 'josiah', text: "It's..." },
      { speaker: 'graham', text: "It's..." },
      { speaker: 'josiah', text: "Not... terrible?" },
      { speaker: 'graham', text: "The gummy bears melt into a sweet glaze!" },
      { speaker: 'josiah', text: "The hot Cheetos add crunch!" },
      { speaker: 'graham', text: "The mystery meat is still a mystery, but a DELICIOUS mystery!" },
      { speaker: 'narrator', text: "Against all logic, culinary law, and basic human decency, the pizza is... kind of good? In a weird way?" },
    ],
    ending: {
      type: 'bizarre',
      title: 'The Franken-Pizza',
      description: "Josiah and Graham had discovered something. Something terrible. Something wonderful. They posted their creation online. It went viral. Food bloggers called it 'an abomination' and 'strangely addictive.' They were invited onto a cooking show, where they traumatized a celebrity chef. Their 'Chaos Pizza' is now sold at three locations. Gordon Ramsay has called it 'the worst thing I've ever seen' and 'I can't stop eating it.' Success comes in many forms. Theirs just happened to include gummy bears.",
      emoji: '🍕🐻🔥',
    },
    background: 'apartment',
    mood: 'triumphant',
  },

  shame_order: {
    id: 'shame_order',
    title: 'The Shame Order',
    narration: "They look at their creation. Their creation looks back. A mutual understanding is reached.",
    dialogue: [
      { speaker: 'josiah', text: "I'll order from Tony's." },
      { speaker: 'graham', text: "Yeah." },
      { speaker: 'josiah', text: "We never speak of this." },
      { speaker: 'graham', text: "Speak of what?" },
      { speaker: 'josiah', text: "Exactly." },
      { speaker: 'narrator', text: "The weird pizza is quietly disposed of. The cat at the window watches. The cat judges. The cat has seen things." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Surrender',
      description: "They ordered pizza like normal people. It arrived in 30 minutes, hot and normal and predictable. They ate it in silence, trying to forget what they'd created. Some experiments are not meant for this world. Some pizzas are not meant to exist. Josiah and Graham learned their limits that day. The weird pizza haunts their dreams occasionally, but they've made peace with it. Mostly.",
      emoji: '🍕😔📦',
    },
    background: 'apartment',
    mood: 'normal',
  },

  kitchen_chaos: {
    id: 'kitchen_chaos',
    title: 'The Improvisation',
    narration: "They stare at their available ingredients: bread, ketchup, old cheese, a can of beans, and a single hot dog.",
    dialogue: [
      { speaker: 'graham', text: "We can work with this!" },
      { speaker: 'josiah', text: "Can we, Graham? Can we really?" },
      { speaker: 'graham', text: "Bread is like dough! Ketchup is tomato! The cheese is... aged!" },
      { speaker: 'narrator', text: "The 'pizza' is assembled. It looks like a cry for help expressed through food." },
      { speaker: 'josiah', text: "I can't put this in my body." },
      { speaker: 'graham', text: "Our ancestors survived on worse!" },
      { speaker: 'josiah', text: "Our ancestors didn't have DELIVERY APPS, GRAHAM." },
    ],
    ending: {
      type: 'catastrophic',
      title: 'The Sadness Sandwich',
      description: "They ate it. Not because it was good, but because they'd committed. The 'pizza' tasted like regret and expired dairy. They immediately ordered real pizza after. The delivery person saw their creation and offered them a hug. They accepted. Sometimes the journey teaches us that some paths should never be taken. This was one of those paths.",
      emoji: '😢🍞💀',
    },
    background: 'apartment',
    mood: 'disaster',
  },

  // Additional transitional scenes
  charger_hunt: {
    id: 'charger_hunt',
    title: 'The Charger Expedition',
    narration: "The apartment becomes an archaeological dig site as they search for a charger.",
    dialogue: [
      { speaker: 'josiah', text: "Found one! Oh wait, it's micro-USB." },
      { speaker: 'graham', text: "Here's one! No, this is for a Fitbit from 2015." },
      { speaker: 'josiah', text: "Why do we have SEVEN different types of chargers and NONE that work?!" },
      { speaker: 'graham', text: "WAIT! I found it! A lightning cable!" },
      { speaker: 'narrator', text: "It's frayed and held together by electrical tape. A small spark flies as Josiah plugs in his phone." },
      { speaker: 'josiah', text: "...It's working. It's working! We have 2%!" },
      { speaker: 'graham', text: "ORDER THE PIZZA! NOW!" },
    ],
    choices: [
      {
        id: 'rush_order',
        text: "⚡ Rush to order before it dies again",
        nextScene: 'speed_order',
        consequence: 'Raced against entropy',
        chaosLevel: 1,
      },
      {
        id: 'wait_charge',
        text: "🔋 Wait for it to charge more first",
        nextScene: 'the_walk',
        consequence: 'The phone died while waiting',
        chaosLevel: 0,
      },
    ],
    background: 'apartment',
    mood: 'tense',
  },

  speed_order: {
    id: 'speed_order',
    title: 'Speed Run',
    narration: "Josiah's fingers have never moved faster. The app loads. The menu appears. He selects pepperoni.",
    dialogue: [
      { speaker: 'josiah', text: "LARGE PEPPERONI. BREADSTICKS. CHECKOUT!" },
      { speaker: 'graham', text: "THE BATTERY IS AT 1%!" },
      { speaker: 'josiah', text: "PAYMENT... CONFIRM... YES... YES..." },
      { speaker: 'narrator', text: "The screen flickers. The loading circle spins. ORDER CONFIRMED appears for one glorious second before the phone dies forever." },
      { speaker: 'both', text: "DID IT GO THROUGH?!" },
      { speaker: 'narrator', text: "They wait in tense silence. Five minutes. Ten minutes. Fifteen." },
      { speaker: 'narrator', text: "The doorbell rings." },
      { speaker: 'both', text: "YES!" },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Buzzer Beater',
      description: "The pizza arrived. Against all odds, despite dead phones, sketchy chargers, and the universe's apparent hatred of their hunger, the pizza arrived. It was slightly cold (they'd taken too long celebrating), but it was THEIR pizza. Victory tastes like lukewarm pepperoni and the defeat of entropy.",
      emoji: '🍕📱🎉',
    },
    background: 'apartment',
    mood: 'triumphant',
  },

  alley_discovery: {
    id: 'alley_discovery',
    title: 'Alley Allies',
    narration: "They hide behind a dumpster, catching their breath, when they notice they're not alone.",
    dialogue: [
      { speaker: 'narrator', text: "A group of stray cats stares at them. Not just any cats. Organized cats. Cats with purpose." },
      { speaker: 'josiah', text: "Graham. Why are these cats looking at us like that?" },
      { speaker: 'graham', text: "Maybe they want to be friends?" },
      { speaker: 'narrator', text: "The lead cat meows. It's oddly musical. Almost... communicative?" },
      { speaker: 'other', speakerName: 'Lead Cat', text: "*Meow. Meow meow. Mrrrow.*" },
      { speaker: 'graham', text: "I think she's asking if we're cool." },
      { speaker: 'josiah', text: "Graham, you don't speak cat." },
      { speaker: 'graham', text: "I took a BuzzFeed quiz once." },
    ],
    choices: [
      {
        id: 'follow_cats',
        text: "🐱 Follow the mysteriously organized cats",
        nextScene: 'cat_kingdom',
        consequence: 'Trusted in felines',
        chaosLevel: 2,
      },
      {
        id: 'continue_tony',
        text: "🍕 Thank the cats and continue to Tony's",
        nextScene: 'running_to_tonys',
        consequence: 'Maintained human priorities',
        chaosLevel: 0,
      },
    ],
    background: 'alley',
    mood: 'tense',
  },

  cat_kingdom: {
    id: 'cat_kingdom',
    title: 'The Underground',
    narration: "The cats lead them through a series of alleys to a hidden courtyard filled with cats, cat furniture, and inexplicably, pizza boxes.",
    dialogue: [
      { speaker: 'josiah', text: "Is this... a cat kingdom?" },
      { speaker: 'graham', text: "It's BEAUTIFUL." },
      { speaker: 'narrator', text: "An elderly man emerges from a small shed. He's wearing cat-themed everything." },
      { speaker: 'other', speakerName: 'Cat Man', text: "Welcome, travelers. I am Gary. I see the cats have brought you to The Sanctuary." },
      { speaker: 'josiah', text: "The cats... brought us?" },
      { speaker: 'other', speakerName: 'Cat Man (Gary)', text: "They bring all who need sanctuary. Also anyone carrying food. You don't have food, do you?" },
      { speaker: 'graham', text: "We're actually LOOKING for food. Pizza specifically." },
      { speaker: 'other', speakerName: 'Cat Man (Gary)', text: "Ah! Then you need Tony! He donates his leftover pizzas to the cats. There's a fresh batch coming in 10 minutes!" },
    ],
    ending: {
      type: 'bizarre',
      title: 'The Cat Sanctuary',
      description: "Josiah and Graham discovered a secret cat sanctuary run by Gary, a retired accountant who dedicated his life to feline welfare. They got free pizza, made 47 new cat friends, and now volunteer every weekend. Gary says they have 'the energy of cats,' which is apparently a compliment. They never did explain to Mrs. Henderson why they were covered in cat hair when they came home.",
      emoji: '🐱🍕👑',
    },
    background: 'alley',
    mood: 'triumphant',
  },

  running_to_tonys: {
    id: 'running_to_tonys',
    title: 'The Final Stretch',
    narration: "After everything, Tony's Pizza is finally in sight. The neon sign glows like a beacon of hope and carbohydrates.",
    dialogue: [
      { speaker: 'josiah', text: "There it is, Graham. We made it." },
      { speaker: 'graham', text: "I never doubted us for a second." },
      { speaker: 'josiah', text: "You doubted us literally five minutes ago." },
      { speaker: 'graham', text: "That was five minutes ago. I've grown." },
      { speaker: 'narrator', text: "They enter Tony's. The warm embrace of pizza smell surrounds them. It's been quite a journey." },
    ],
    choices: [
      {
        id: 'order_normal',
        text: "🍕 Order a nice, normal pizza",
        nextScene: 'victory_pizza',
        consequence: 'Chose peace',
        chaosLevel: 0,
      },
      {
        id: 'tell_story',
        text: "📖 Tell Tony about your adventure",
        nextScene: 'story_time',
        consequence: 'Shared the journey',
        chaosLevel: 0,
      },
    ],
    background: 'pizza_shop',
    mood: 'triumphant',
  },

  story_time: {
    id: 'story_time',
    title: 'Story Time at Tony\'s',
    narration: "Tony listens to their tale with the patience of a man who has heard many tales.",
    dialogue: [
      { speaker: 'other', speakerName: 'Tony', text: "So let me get this straight. You encountered pepper spray, cats, possibly a fire, and definitely some ferrets, all to get pizza?" },
      { speaker: 'both', text: "Yes." },
      { speaker: 'other', speakerName: 'Tony', text: "That's the most dedicated pizza pursuit I've heard since the '97 Pizza Olympics." },
      { speaker: 'graham', text: "Wait, the Pizza Olympics are real?!" },
      { speaker: 'other', speakerName: 'Tony', text: "Of course they're real! I won gold in the sauce toss!" },
      { speaker: 'narrator', text: "Tony points to a Golden Spatula on the wall." },
      { speaker: 'other', speakerName: 'Tony', text: "Tell you what. For that kind of dedication, this one's on the house." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Pizza Pilgrims',
      description: "Josiah and Graham got free pizza and a new friend in Tony. They're now regulars at Tony's, where their adventure has become legend. Tony tells new customers about 'the boys who crossed the city for pizza.' The details get more exaggerated each time. Last week's version involved a helicopter and a bear. They don't correct him. Legends are meant to grow.",
      emoji: '🍕📚🌟',
    },
    background: 'pizza_shop',
    mood: 'triumphant',
  },

  cat_search_building: {
    id: 'cat_search_building',
    title: 'Building Search Party',
    narration: "They start searching the building floor by floor. Princess Fluffington could be anywhere.",
    dialogue: [
      { speaker: 'graham', text: "Here, kitty kitty! Princess Fluffy... uh..." },
      { speaker: 'josiah', text: "Fluffington." },
      { speaker: 'graham', text: "Princess Fluffington! Your queen demands your return!" },
      { speaker: 'narrator', text: "A meow echoes from the basement. They exchange glances." },
      { speaker: 'josiah', text: "The basement? Really?" },
      { speaker: 'graham', text: "Cats love basements! Probably!" },
    ],
    choices: [
      {
        id: 'brave_basement',
        text: "⬇️ Venture into the spooky basement",
        nextScene: 'basement_adventure',
        consequence: 'Descended into darkness for a cat',
        chaosLevel: 1,
      },
      {
        id: 'lure_cat',
        text: "🐟 Get tuna from their apartment to lure her out",
        nextScene: 'tuna_strategy',
        consequence: 'Used their brain for once',
        chaosLevel: 0,
      },
    ],
    background: 'apartment',
    mood: 'tense',
  },

  basement_adventure: {
    id: 'basement_adventure',
    title: 'Into the Depths',
    narration: "The basement is everything a basement should be: dark, dusty, and full of ominous noises.",
    dialogue: [
      { speaker: 'josiah', text: "I can't see anything." },
      { speaker: 'graham', text: "Use your phone flashlight!" },
      { speaker: 'josiah', text: "My phone is DEAD, Graham." },
      { speaker: 'graham', text: "Right. Flip phone it is." },
      { speaker: 'narrator', text: "Graham's flip phone produces a glow roughly equivalent to a tired firefly." },
      { speaker: 'josiah', text: "This is useless." },
      { speaker: 'narrator', text: "A majestic white cat appears in the dim light. Princess Fluffington, looking entirely unbothered by the chaos she's caused." },
      { speaker: 'graham', text: "THERE SHE IS! Come here, Princess!" },
      { speaker: 'narrator', text: "Princess Fluffington considers Graham. Then bolts deeper into the basement." },
    ],
    choices: [
      {
        id: 'chase_princess',
        text: "🏃 Chase after her!",
        nextScene: 'cat_chase',
        consequence: 'Engaged in feline pursuit',
        chaosLevel: 2,
      },
      {
        id: 'be_patient',
        text: "🧘 Wait patiently and let her come to you",
        nextScene: 'patient_approach',
        consequence: 'Respected cat psychology',
        chaosLevel: 0,
      },
    ],
    background: 'apartment',
    mood: 'tense',
  },

  cat_chase: {
    id: 'cat_chase',
    title: 'The Chase',
    narration: "What follows is the most embarrassing pursuit in human history.",
    dialogue: [
      { speaker: 'narrator', text: "Graham trips over a box. Josiah crashes into Graham. Princess Fluffington watches from atop a shelf." },
      { speaker: 'josiah', text: "She's MOCKING us!" },
      { speaker: 'graham', text: "Cats can't mock!" },
      { speaker: 'josiah', text: "Tell that to her SMUG FACE!" },
      { speaker: 'narrator', text: "After twenty minutes of chaos, they corner Princess Fluffington near the boiler." },
      { speaker: 'graham', text: "We got her! Grab her gently!" },
      { speaker: 'narrator', text: "Josiah reaches out. Princess Fluffington allows herself to be picked up, as if she'd planned this all along. She probably did." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Cat Whisperers',
      description: "Princess Fluffington was returned to Mrs. Henderson, who was so grateful she ordered them two large pizzas, garlic knots, and a tiramisu. She also gave them a framed photo of Princess Fluffington 'as a token of friendship.' It hangs in their apartment now. Neither of them is sure why they kept it, but it feels right.",
      emoji: '🐱🍕👵',
    },
    background: 'apartment',
    mood: 'triumphant',
  },

  patient_approach: {
    id: 'patient_approach',
    title: 'The Wait',
    narration: "They sit down in the darkness and wait. Graham starts humming. It's oddly soothing.",
    dialogue: [
      { speaker: 'graham', text: "My grandma always said cats come to you when they're ready." },
      { speaker: 'josiah', text: "Your grandma had cats?" },
      { speaker: 'graham', text: "No, she was allergic. But she had opinions." },
      { speaker: 'narrator', text: "Minutes pass. Princess Fluffington slowly approaches. She sniffs Graham's hand. Then, miraculously, climbs into his lap." },
      { speaker: 'graham', text: "I'm a cat whisperer!" },
      { speaker: 'josiah', text: "You sat still for once in your life. That's the real miracle." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Gentle Touch',
      description: "Princess Fluffington was returned with zero drama. Mrs. Henderson was so impressed by their patience that she made them her emergency cat-sitters. They get paid in pizza money and cat wisdom. Graham has since developed a 'cat aura' that makes all neighborhood cats trust him. Scientists can't explain it. Josiah doesn't try to.",
      emoji: '🐱😌🍕',
    },
    background: 'apartment',
    mood: 'triumphant',
  },

  tuna_strategy: {
    id: 'tuna_strategy',
    title: 'The Bait',
    narration: "Back in their apartment, they locate a can of tuna that's only slightly past its expiration date.",
    dialogue: [
      { speaker: 'josiah', text: "Is this tuna still good?" },
      { speaker: 'graham', text: "It's for a cat. Cats eat garbage." },
      { speaker: 'josiah', text: "That's... actually fair." },
      { speaker: 'narrator', text: "They return to the hallway with the tuna. Within seconds, Princess Fluffington materializes like she was summoned from another dimension." },
      { speaker: 'graham', text: "She just... appeared?" },
      { speaker: 'josiah', text: "Cats are basically magic. Grab her!" },
      { speaker: 'narrator', text: "Princess Fluffington is acquired. Mission accomplished." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Strategists',
      description: "Using the advanced tactic of 'cats like food,' they captured Princess Fluffington in under five minutes. Mrs. Henderson ordered them the fanciest pizza Tony's offers: The Supreme Deluxe Meat Lovers with Extra Everything. They ate like kings. Sometimes the simplest solutions are the best. Also, always keep tuna on hand.",
      emoji: '🐟🐱🍕',
    },
    background: 'apartment',
    mood: 'triumphant',
  },

  cat_search_outside: {
    id: 'cat_search_outside',
    title: 'The Great Outdoors',
    narration: "They head outside to search. The sun is setting. The air smells like adventure and car exhaust.",
    dialogue: [
      { speaker: 'graham', text: "If I were a cat, where would I go?" },
      { speaker: 'josiah', text: "Somewhere warm? With food?" },
      { speaker: 'graham', text: "So... Tony's Pizza?" },
      { speaker: 'josiah', text: "We're not going to Tony's to search for a cat, Graham." },
      { speaker: 'narrator', text: "A white flash catches their eye. Princess Fluffington, sitting on a windowsill across the street, cleaning her paw with supreme indifference." },
      { speaker: 'graham', text: "THERE!" },
    ],
    choices: [
      {
        id: 'approach_slowly',
        text: "🚶 Approach slowly and carefully",
        nextScene: 'careful_approach',
        consequence: 'Demonstrated feline respect',
        chaosLevel: 0,
      },
      {
        id: 'run_and_grab',
        text: "🏃 Run and grab her!",
        nextScene: 'street_chase',
        consequence: 'Chose chaos',
        chaosLevel: 2,
      },
    ],
    background: 'street',
    mood: 'normal',
  },

  careful_approach: {
    id: 'careful_approach',
    title: 'The Stalking',
    narration: "They approach with all the stealth of two people who have never successfully approached anything stealthily.",
    dialogue: [
      { speaker: 'josiah', text: "*whispering* Easy... easy... good kitty..." },
      { speaker: 'graham', text: "*loudly* IS THIS CLOSE ENOUGH?" },
      { speaker: 'josiah', text: "*hissing* WHY ARE YOU YELLING?" },
      { speaker: 'narrator', text: "Somehow, Princess Fluffington allows them to approach. She looks at them with what can only be described as resigned acceptance." },
      { speaker: 'narrator', text: "Graham carefully picks her up. She doesn't resist. She does sigh." },
      { speaker: 'graham', text: "I think she's just tired of running." },
      { speaker: 'josiah', text: "Aren't we all, Graham. Aren't we all." },
    ],
    ending: {
      type: 'mildly_successful',
      title: 'The Gentle Retrieval',
      description: "Princess Fluffington was returned with minimal fuss. Mrs. Henderson kept her word and ordered them the finest pizza in the land. They ate it on her plastic-covered couch while looking at photos of her late husband Gerald. It was weirdly nice. Sometimes the best adventures end with elderly company and pizza.",
      emoji: '🐱👵🍕',
    },
    background: 'street',
    mood: 'triumphant',
  },

  street_chase: {
    id: 'street_chase',
    title: 'The Street Chase',
    narration: "They run toward Princess Fluffington. She runs away. Thus begins the worst decision of the day.",
    dialogue: [
      { speaker: 'josiah', text: "WHY WOULD YOU RUN AT A CAT?!" },
      { speaker: 'graham', text: "I PANICKED!" },
      { speaker: 'narrator', text: "Princess Fluffington leads them on a chase through traffic, around food carts, and directly into the ferret parade." },
      { speaker: 'other', speakerName: 'Parade Lady', text: "INTRUDERS! FERRETS, DEFEND THE FLOAT!" },
      { speaker: 'graham', text: "NOT THE FERRETS!" },
      { speaker: 'narrator', text: "Chaos ensues. Ferrets scatter. Cats yowl. Somewhere, Mrs. Henderson sneezes, sensing her cat is in danger." },
    ],
    ending: {
      type: 'catastrophic',
      title: 'The Multi-Species Incident',
      description: "The ferret parade, the cat search, and a hot dog cart collided in what police reports would later call 'The Incident.' Princess Fluffington was eventually caught by a firefighter. Josiah and Graham were banned from three city blocks. They did NOT get pizza that night. Mrs. Henderson still brings it up whenever she sees them. It's been four months.",
      emoji: '🐱🐿️🚔',
    },
    background: 'parade',
    mood: 'disaster',
  },
};

export function getScene(sceneId: string): Scene | undefined {
  return storyData[sceneId];
}

export function getAllEndingTypes(): string[] {
  return ['catastrophic', 'mildly_successful', 'heroic', 'bizarre'];
}

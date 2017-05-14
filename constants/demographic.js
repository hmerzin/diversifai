var ETHNICITIES = {
  HISPANIC: "hispanic, latino, or spanish origin",
  BLACK: "black or african american",
  NHPI: "native hawaiian or pacific islander",
  MENA: "middle eastern or north african",
  WHITE: "white",
  OTHER: "other",
  AIAN: "american indian or alaska native",
  ASIAN: "asian"
}
var AGE_RANGE = {
  "0-4": "baby",
  "80+": "old",
  "30-34": "mature",
  "35-39": "mature",
  "25-29": "mature",
  "10-14": "child",
  "40-44": "mature",
  "5-9": "child",
  "50-54": "old",
  "55-59": "old",
  "70-74": "old",
  "75-79": "old",
  "65-69": "old",
  "15-19": "child",
  "60-64": "old",
  "20-24": "young",
  "45-49": "mature"
}

module.exports = {
  ethnicities: [
    {
      title: ETHNICITIES.HISPANIC,
      tone: ["🏼", "🏽", "🏾"],
      emojis: ["🤚","🤙","✍️","👐","👏","🤘","✌️"]
    },
    {
      title: ETHNICITIES.BLACK,
      tone: ["🏿", "🏿", "🏿", "🏾"],
      emojis: ["🤚","🤙","✍️","👐","👏","🤘","✌️"]
    },
    {
      title: ETHNICITIES.NHPI,
      tone: ["🏽"],
      emojis: ["🤚","🤙","✍️","👐","👏","🤘","✌️"]
    },
    {
      title: ETHNICITIES.MENA,
      tone: ["🏿", "🏾", "🏾", "🏾"],
      emojis: ["🤚","🤙","✍️","👐","👏","🤘","✌️"]
    },
    {
      title: ETHNICITIES.WHITE,
      tone: ["🏻"],
      emojis: ["🤚","🤙","✍️","👐","👏","🤘","✌️"]
    },
    {
      title: ETHNICITIES.OTHER,
      tone: [""],
      emojis: ["🤚","🤙","✍️","👐","👏","🤘","✌️"]
    },
    {
      title: ETHNICITIES.AIAN,
      tone: ["🏾"],
      emojis: ["🤚","🤙","✍️","👐","👏","🤘","✌️"]
    },
    {
      title: ETHNICITIES.ASIAN,
      tone: ["🏻","🏼","🏽"],
      emojis: ["🤚","🤙","✍️","👐","👏","🤘","✌️"]
    },
  ],
  ages: [
    {
      title: AGE_RANGE.BABY,
      emojis: ["👶"]
    },
    {
      title: AGE_RANGE.CHILD,
      emojis: ["👦", "👧"]
    },
    {
      title: AGE_RANGE.MATURE,
      emojis: ["👷‍♀️", "👷", "👨‍", "👩"]
    },
    {
      title: AGE_RANGE.OLD,
      emojis: ["👵", "👴"]
    }
  ]
}

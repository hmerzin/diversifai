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
  BABY: "baby",
  OLD: "old",
  MATURE: "mature",
  CHILD: "child"
}
var GENDER = {
  FEMININE: 'feminine',
  MASCULINE: 'masculine'
}

module.exports = {
  ethnicities: [
    {
      title: ETHNICITIES.HISPANIC,
      tone: ["🏼", "🏽", "🏾"],
      emojis: ["👐","👏","🤘"]
    },
    {
      title: ETHNICITIES.BLACK,
      tone: ["🏿", "🏿", "🏿", "🏾"],
      emojis: ["👐","👏","🤘"]
    },
    {
      title: ETHNICITIES.NHPI,
      tone: ["🏽"],
      emojis: ["👐","👏","🤘"]
    },
    {
      title: ETHNICITIES.MENA,
      tone: ["🏿", "🏾", "🏾", "🏾"],
      emojis: ["👐","👏","🤘"]
    },
    {
      title: ETHNICITIES.WHITE,
      tone: ["🏻"],
      emojis: ["👐","👏","🤘"]
    },
    {
      title: ETHNICITIES.OTHER,
      tone: [""],
      emojis: ["👐","👏","🤘"]
    },
    {
      title: ETHNICITIES.AIAN,
      tone: ["🏾"],
      emojis: ["👐","👏","🤘"]
    },
    {
      title: ETHNICITIES.ASIAN,
      tone: ["🏻","🏼","🏽"],
      emojis: ["👐","👏","🤘"]
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
  ],
  gender: [
    {
      title: GENDER.FEMININE,
      emojis: ["♀"]
    },
    {
      title: GENDER.MASCULINE,
      emojis: ["♂"]
    }
  ]
}
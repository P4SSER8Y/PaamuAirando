import { createI18n } from "vue-i18n";

const messages = {
  cn: {
    wtf: {
      title: "棕了个榈岛"
    },
    card: {
      base: {
        free: "免费",
        canoeHouse: "捕鱼小屋",
        logger: "伐木小屋",
        quarry: "采石场",
        market: "市场",
        tradeHouse: "交易所",
        toolMaker: "工坊",
        housing: "房子",
        temple: "寺庙",
      },
    },
  },
  en: {
    wtf: {
      title: "Pallllm Islllland"
    },
    card: {
      base: {
        free: "Free",
        canoeHouse: "Canoe House",
        logger: "Logger",
        quarry: "Quarry",
        market: "Market",
        tradeHouse: "Trade House",
        toolMaker: "Tool Maker",
        housing: "Housing",
        temple: "Temple",
      },
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "cn",
  messages,
});

export default i18n;

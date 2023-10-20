import { AssetCandidates } from "./asset";

export enum CardType {
  Unknown,
  Basic,
  Round,
  Feet,
}

export enum CardStatus {
  FrontUp,
  FrontDown,
  BackUp,
  BackDown,
  Length,
}

export enum CardAssetStatus {
  Idle,
  Stored,
}

export enum CardActionType {
  Pay,
  Rotate,
  Flip,
  Length,
}

export class CardAction {
  type: CardActionType;
  cost: AssetCandidates;

  constructor(type: CardActionType, cost: AssetCandidates) {
    this.type = type;
    this.cost = cost.copy();
  }

  copy(): CardAction {
    return new CardAction(this.type, this.cost.copy());
  }

  toString(): string {
    return `${CardActionType[this.type]}: ${this.cost}`;
  }
}

export class Card {
  id: string;
  name: string;
  cardType: CardType;
  cardStatus: CardStatus;
  paidStatus: boolean;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.cardType = CardType.Unknown;
    this.cardStatus = CardStatus.FrontUp;
    this.paidStatus = false;
  }
}

export class BasicCard extends Card {
  assetsStatus: CardAssetStatus;
  actions: Array<Array<CardAction>>;
  levels: Array<number>;
  stars: Array<number>;
  assets: Array<AssetCandidates>;

  constructor(id: string, name: string) {
    super(id, name);
    this.cardType = CardType.Basic;
    this.assetsStatus = CardAssetStatus.Idle;
    this.actions = new Array(CardStatus.Length);
    for (let i = 0; i < CardStatus.Length; i++) {
      this.actions[i] = new Array(CardActionType.Length).fill(null);
    }
    this.levels = new Array(CardStatus.Length);
    this.stars = new Array(CardStatus.Length);
    this.assets = new Array(CardStatus.Length);
  }

  register(
    status: CardStatus,
    level: number,
    star: number,
    actions: Array<CardAction>,
    assets: AssetCandidates
  ) {
    this.levels[status] = level;
    this.stars[status] = star;
    this.assets[status] = assets.copy();
    let t: CardAction[] = new Array(CardActionType.Length);
    for (let item of actions) {
      t[item.type] = item.copy();
    }
    this.actions[status] = t;
  }

  toString(): string {
    return `${this.id}-${CardStatus[this.cardStatus]}-${
      CardAssetStatus[this.assetsStatus]
    }`;
  }

  cardInfo(): string {
    let str: string[] = [];
    str.push(`===== ${this.id} =====`);
    for (let idx = 0; idx < CardStatus.Length; idx++) {
      if (this.levels[idx] === undefined) continue;
      str.push(
        `${CardStatus[idx]} (level: ${this.levels[idx]}, stars: ${
          this.stars[idx]
        }) => ${this.assets[idx]?.toString()}`
      );
      for (let item of this.actions[idx].filter((x) => x)) {
        str.push(`    ${item.toString()}`);
      }
    }
    str.push(`===== ${this.id} =====`);
    return str.join("\n");
  }

  getAssets(status: CardStatus): AssetCandidates | undefined {
    return this.assets[status];
  }

  getLevel(status: CardStatus): number {
    return this.levels[status] ?? 0;
  }

  getStar(status: CardStatus): number {
    return this.stars[status] ?? 0;
  }

  move(type: CardActionType): boolean {
    const MAP_NEXT_FLIP = new Map([
      [CardStatus.FrontUp, CardStatus.BackUp],
      [CardStatus.FrontDown, CardStatus.BackDown],
      [CardStatus.BackUp, CardStatus.FrontUp],
      [CardStatus.BackDown, CardStatus.FrontDown],
    ]);
    const MAP_NEXT_ROTATE = new Map([
      [CardStatus.FrontUp, CardStatus.FrontDown],
      [CardStatus.FrontDown, CardStatus.FrontUp],
      [CardStatus.BackUp, CardStatus.BackDown],
      [CardStatus.BackDown, CardStatus.BackUp],
    ]);
    if (this.actions[this.cardStatus][type]) {
      switch (type) {
        case CardActionType.Pay:
          this.paidStatus = !this.paidStatus;
          break;
        case CardActionType.Flip:
          if (MAP_NEXT_FLIP.get(this.cardStatus))
          {
            this.cardStatus = MAP_NEXT_FLIP.get(this.cardStatus);
          }
          else 
          {
            return false;
          }
          break;
        case CardActionType.Rotate:
          if (MAP_NEXT_ROTATE.get(this.cardStatus))
          {
            this.cardStatus = MAP_NEXT_ROTATE.get(this.cardStatus);
          }
          else 
          {
            return false;
          }
          break;
        default:
          return false;
          break;
      }
      return true;
    } else {
      return false;
    }
  }
}

export class RoundCard extends Card {
  protected round: number;
  constructor() {
    super("", "Round");
    this.round = 0;
  }

  toString(): string {
    return `Round ${this.round}`;
  }

  move(_type: any | null) {
    this.round++;
  }
}

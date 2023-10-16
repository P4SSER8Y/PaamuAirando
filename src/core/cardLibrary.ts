import { Assets, AssetType, AssetCandidates} from "./asset";
import { Card, CardAction, CardActionType, CardStatus } from "./card";

export enum CardType {
    Basic,
    Feet,
};

export function cardFactory(type: CardType, id: number): Card | null
{
    switch (type) {
        case CardType.Basic:
            return basicCardFactory(id);
        default:
            return null;
    }
}

function basicCardFactory(id: number): Card | null {
    let stone = new Assets(new Map([[AssetType.Stone, 1]]));
    let stone2 = stone.repeat(2);
    let log = new Assets(new Map([[AssetType.Log, 1]]));
    let log2 = log.repeat(2);
    let fish = new Assets(new Map([[AssetType.Fish, 1]]));
    let fish2 = fish.repeat(2);
    let card: Card | null = null;
    switch (id) {
        case 1: case 2: case 3:
            card = new Card(`${id}`, `Canoe House`);
            card.register(CardStatus.FrontUp, 0, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([fish])),
                new CardAction(CardActionType.Flip, new AssetCandidates([fish])),
            ], new AssetCandidates([fish]));
            card.register(CardStatus.FrontDown, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Flip, new AssetCandidates([fish.plus(log)])),
            ], new AssetCandidates([fish.plus(fish)]));
            card.register(CardStatus.BackUp, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([fish.plus(log)])),
            ], new AssetCandidates([fish.plus(log)]));
            card.register(CardStatus.BackDown, 2, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
            ], new AssetCandidates([fish2.plus(log)]));
            break;

        case 4: case 5: case 6:
            card = new Card(`${id}`, `Logger`);
            card.register(CardStatus.FrontUp, 0, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([fish.plus(log)])),
            ], new AssetCandidates([log]));
            card.register(CardStatus.FrontDown, 1, 1, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Flip, new AssetCandidates([stone.plus(log)])),
            ], new AssetCandidates([fish.plus(fish)]));
            card.register(CardStatus.BackUp, 3, 5, [], new AssetCandidates([]));
            card.register(CardStatus.BackDown, 2, 2, [
                new CardAction(CardActionType.Rotate, new AssetCandidates([log2.plus(stone2).plus(fish2)])),
            ], new AssetCandidates([]));
            break;

        case 7: case 8: case 9:
            card = new Card(`${id}`, `Quarry`);
            card.register(CardStatus.FrontUp, 0, 0, [
                new CardAction(CardActionType.Rotate, new AssetCandidates([log2])),
                new CardAction(CardActionType.Flip, new AssetCandidates([fish2])),
            ], new AssetCandidates([]));
            card.register(CardStatus.FrontDown, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Flip, new AssetCandidates([log2.plus(fish)])),
            ], new AssetCandidates([stone]));
            card.register(CardStatus.BackUp, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([fish2.plus(log)])),
            ], new AssetCandidates([]));
            card.register(CardStatus.BackDown, 2, 2, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
            ], new AssetCandidates([stone2]));
            break;

        case 10:
            card = new Card(`${id}`, `Market`);
            card.register(CardStatus.FrontUp, 0, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([log, fish])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([log2])),
                new CardAction(CardActionType.Flip, new AssetCandidates([fish2])),
            ], new AssetCandidates([stone]));
            card.register(CardStatus.FrontDown, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([log])),
                new CardAction(CardActionType.Flip, new AssetCandidates([log.plus(stone)])),
            ], new AssetCandidates([fish.plus(stone)]));
            card.register(CardStatus.BackUp, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([fish])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([fish.plus(stone)])),
            ], new AssetCandidates([log.plus(stone)]));
            card.register(CardStatus.BackDown, 2, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([log, fish, stone])),
            ], new AssetCandidates([log.plus(fish).plus(stone)]));
            break;

        case 11:
            card = new Card(`${id}`, `Trade House`);
            card.register(CardStatus.FrontUp, 0, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([log2, fish2])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([fish])),
                new CardAction(CardActionType.Flip, new AssetCandidates([log])),
            ], new AssetCandidates([log.plus(fish)]));
            card.register(CardStatus.FrontDown, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([fish2, stone2])),
                new CardAction(CardActionType.Flip, new AssetCandidates([log.plus(fish)])),
            ], new AssetCandidates([log.plus(log2)]));
            card.register(CardStatus.BackUp, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([log2, stone2])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([log.plus(fish)])),
            ], new AssetCandidates([fish.plus(fish2)]));
            card.register(CardStatus.BackDown, 2, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([log2, fish2])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([stone])),
                new CardAction(CardActionType.Flip, new AssetCandidates([stone])),
            ], new AssetCandidates([stone.plus(stone2)]));
            break;

        case 12:
            card = new Card(`${id}`, `Tool Maker`);
            card.register(CardStatus.FrontUp, 0, 0, [
                new CardAction(CardActionType.Rotate, new AssetCandidates([log.plus(fish).plus(stone2)])),
                new CardAction(CardActionType.Flip, new AssetCandidates([log.plus(fish)])),
            ], new AssetCandidates([]));
            card.register(CardStatus.FrontDown, 3, 4, [], new AssetCandidates([]));
            card.register(CardStatus.BackUp, 1, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Rotate, new AssetCandidates([log.plus(fish).plus(stone)])),
            ], new AssetCandidates([log.plus(fish)]));
            card.register(CardStatus.BackDown, 2, 0, [
                new CardAction(CardActionType.Pay, new AssetCandidates([])),
                new CardAction(CardActionType.Flip, new AssetCandidates([log2.plus(fish2).plus(stone2)])),
            ], new AssetCandidates([log.plus(fish).plus(stone)]));
            break;

        case 13: case 14:
            card = new Card(`${id}`, `Housing`);
            card.register(CardStatus.FrontUp, 0, 0, [
                new CardAction(CardActionType.Rotate, new AssetCandidates([log.plus(fish)])),
            ], new AssetCandidates([]));
            card.register(CardStatus.FrontDown, 1, 1, [
                new CardAction(CardActionType.Flip, new AssetCandidates([log.plus(fish).plus(stone)])),
            ], new AssetCandidates([]));
            card.register(CardStatus.BackUp, 3, 6, [
            ], new AssetCandidates([]));
            card.register(CardStatus.BackDown, 2, 3, [
                new CardAction(CardActionType.Rotate, new AssetCandidates([log2.plus(fish2).plus(stone2)])),
            ], new AssetCandidates([]));
            break;

        case 15: case 16:
            card = new Card(`${id}`, `Temple`);
            card.register(CardStatus.FrontUp, 0, 0, [
                new CardAction(CardActionType.Rotate, new AssetCandidates([log.plus(fish).plus(stone2)])),
            ], new AssetCandidates([]));
            card.register(CardStatus.FrontDown, 1, 3, [
                new CardAction(CardActionType.Flip, new AssetCandidates([log2.plus(fish2).plus(stone2).plus(stone)])),
            ], new AssetCandidates([]));
            card.register(CardStatus.BackUp, 3, 10, [
            ], new AssetCandidates([]));
            card.register(CardStatus.BackDown, 2, 6, [
                new CardAction(CardActionType.Rotate, new AssetCandidates([log2.plus(log).plus(fish).plus(fish2).plus(stone2).plus(stone2)])),
            ], new AssetCandidates([]));
            break;
    }
    return card;
}

export function featCardFactory(): Card | null {
    let card: Card | null = null;
    return card;
}

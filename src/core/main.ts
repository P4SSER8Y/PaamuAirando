import { cardFactory, CardType } from "./cardLibrary";
import { RoundCard } from "./card";
import { Assets, AssetType } from "./asset";

for (let idx = 1; idx <= 16; idx++) {
    console.log(cardFactory(CardType.Basic, idx)?.cardInfo())
}
console.log(new RoundCard().cardInfo());

let a = new Assets(new Map([]));
let b = new Assets(new Map([[AssetType.Fish, 1]]));

console.log(a.toString());
console.log(b.toString());
console.log(a.plus(a).toString());
console.log(b.plus(a).toString());
console.log(a.plus(b).toString());
console.log(b.plus(b).toString());
console.log(a.in(b))
console.log(b.in(a))

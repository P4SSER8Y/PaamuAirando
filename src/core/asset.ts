export enum AssetType {
  Log,
  Fish,
  Stone,
  Length,
}

export class Assets {
  assets: AssetType[];

  constructor(assets: Map<AssetType, number>) {
    this.assets = new Array(AssetType.Length).fill(0);
    for (let i = 0; i < AssetType.Length; i++) {
      this.assets[i] = assets.get(i) ?? 0;
    }
  }

  copy(): Assets {
    let t = new Assets(new Map([]));
    t.assets = Array.from(this.assets);
    return t;
  }

  toString(): string {
    let t: string[] = [];
    for (let item = 0; item < AssetType.Length; item++) {
      t.push(`${AssetType[item]}(${this.assets[item]})`);
    }
    return "<" + t.join(",") + ">";
  }

  in(other: Assets): boolean {
    for (let item = 0; item < AssetType.Length; item++) {
      if (this.assets[item] > other.assets[item]) {
        return false;
      }
    }
    return true;
  }

  eq(other: Assets): boolean {
    return this.in(other) && other.in(this);
  }

  plus(other: Assets): Assets {
    let t = new Assets(new Map([]));
    for (let item = 0; item < AssetType.Length; item++)
    {
        t.assets[item] = this.assets[item] + other.assets[item];
    }
    return t;
  }

  repeat(times: number): Assets {
    let t = this.copy();
    for (let i = 0; i < AssetType.Length; i++) {
        t.assets[i] *= times;
    }
    return t;
  }
}

export class AssetCandidates {
  group: Assets[];

  constructor(group: Assets[]) {
    this.group = [];
    for (let item of group) {
      let flag = true;
      for (let t of this.group) {
        if (t.eq(item)) {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.group.push(item.copy());
      }
    }
  }

  copy(): AssetCandidates {
    let t: Assets[] = [];
    for (let item of this.group) {
      t.push(item.copy());
    }
    return new AssetCandidates(t);
  }

  toString(): string {
    let t: string[] = [];
    for (let item of this.group) {
      t.push(item.toString());
    }
    return t.join(" | ");
  }

  plus(other: AssetCandidates): AssetCandidates {
    if (this.group.length == 0) {
      return other.copy();
    } else if (other.group.length == 0) {
      return this.copy();
    } else {
      let t: Assets[] = [];
      for (let a of this.group) {
        for (let b of other.group) {
          t.push(a.plus(b));
        }
      }
      return new AssetCandidates(t);
    }
  }
}

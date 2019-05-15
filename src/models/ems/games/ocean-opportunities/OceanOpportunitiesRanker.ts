import IMatchRanker from "../../../IMatchRanker";
import IPostableObject from "../../../IPostableObject";
import OceanOpportunitiesRank from "./OceanOpportunitiesRank";

class OceanOpportunitiesRanker implements IMatchRanker {
  private static _instance: OceanOpportunitiesRanker;

  public static getInstance(): OceanOpportunitiesRanker {
    if (typeof OceanOpportunitiesRanker._instance === "undefined") {
      OceanOpportunitiesRanker._instance = new OceanOpportunitiesRanker();
    }
    return OceanOpportunitiesRanker._instance;
  }

  private constructor() {}

  public execute(matchJSON: any[]): IPostableObject[] {
    const rankingData = Array.from(this.prepare(matchJSON).values());
    const sortedRanks: OceanOpportunitiesRank[] = this.sort(rankingData, 0, rankingData.length - 1);
    for (let i = 0; i < sortedRanks.length; i++) {
      sortedRanks[i].rank = (i + 1);
    }
    return sortedRanks;
  }

  public prepare(matchJSON: any[]): Map<number, OceanOpportunitiesRank> {
    const rankingsMap: Map<number, OceanOpportunitiesRank> = new Map<number, OceanOpportunitiesRank>();
    for (const match of matchJSON) {
      const redWin = match.red_score > match.blue_score;
      const tie = match.red_score === match.blue_score;
      const participants = match.participants.split(",");
      for (let i = 0; i < participants.length; i++) {
        if (typeof rankingsMap.get(parseInt(participants[i])) === "undefined") {
          const ranking: OceanOpportunitiesRank = new OceanOpportunitiesRank();
          const eventKey = match.match_key.substring(0, match.match_key.length - 4);
          ranking.teamKey = parseInt(participants[i]);
          ranking.rankKey = eventKey + "R" + ranking.teamKey;
          rankingsMap.set(parseInt(participants[i]), ranking);
        }
        const isSurrogate: boolean = JSON.parse("[" + match.surrogates + "]")[i] === 1;
        const cardStatus: number = JSON.parse("[" + match.cards + "]")[i];
        const isDisqualified: boolean = JSON.parse("[" + match.disqualifieds + "]")[i] === 1;
        const ranking = rankingsMap.get(parseInt(participants[i])) as OceanOpportunitiesRank;
        if (!isSurrogate && cardStatus <= 1 && !isDisqualified && match.red_score >= 0 && match.blue_score >= 0) {
          const redTeam = i < (participants.length / 2);

          const rp = redTeam && redWin ? 2 : tie ? 1 : !redTeam && !redWin ? 2 : 0;
          const points = redTeam ? match.red_score : match.blue_score;
          ranking.rankingPoints += rp + match.coopertition_bonus;
          ranking.totalPoints += points;
          ranking.coopertitionPoints += match.coopertition_bonus;
          if (redTeam && redWin) {
            ranking.wins++;
          } else if (!redTeam && !redWin) {
            ranking.wins++;
          } else if (match.red_score === match.blue_score) {
            ranking.ties++;
          } else {
            ranking.losses++;
          }
        }

        if (match.red_score >= 0 && match.blue_score >= 0) {
          ranking.played++;
        }
      }
    }
    return rankingsMap;
  }

  public sort(items: OceanOpportunitiesRank[], left: number, right: number): OceanOpportunitiesRank[] {
    let pivot, partitionIndex;

    if (left < right) {
      pivot = right;
      partitionIndex = this.partition(items, pivot, left, right);

      this.sort(items, left, partitionIndex - 1);
      this.sort(items, partitionIndex + 1, right);
    }

    return items;
  }

  private partition(items: OceanOpportunitiesRank[], pivot: number, left: number, right: number): number {
    const pivotValue = items[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
      // -1 means items[i] < pivotValue, 1 means items[i] > pivotValue
      if (this.shouldSwap(items[i], pivotValue) === 1) {
        this.swap(items, i, partitionIndex);
        partitionIndex++;
      }
    }
    this.swap(items, right, partitionIndex);
    return partitionIndex;
  }

  private shouldSwap(rank1: OceanOpportunitiesRank, rank2: OceanOpportunitiesRank) {
    if (rank2.rankingPoints === null) {
      return 1;
    }

    if (rank2.totalPoints === null) {
      return 1;
    }

    if (rank2.coopertitionPoints === null) {
      return 1;
    }

    if (rank1.rankingPoints < rank2.rankingPoints) {
      return -1;
    } else {
      if (rank1.rankingPoints > rank2.rankingPoints) {
        return 1;
      } else {
        if (rank1.totalPoints < rank2.totalPoints) {
          return -1;
        } else {
          if (rank1.totalPoints > rank2.totalPoints) {
            return 1;
          } else {
            if (rank1.coopertitionPoints < rank2.coopertitionPoints) {
              return -1;
            } else {
              if (rank1.coopertitionPoints > rank2.coopertitionPoints) {
                return 1;
              } else {
                if (rank1.played < rank2.played) {
                  return -1;
                } else {
                  return 1;
                }
              }
            }
          }
        }
      }
    }
  }

  private swap(items: OceanOpportunitiesRank[], index1: number, index2: number) {
    const temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
  }
}

export default OceanOpportunitiesRanker.getInstance();
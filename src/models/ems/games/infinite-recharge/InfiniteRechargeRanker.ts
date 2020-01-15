import IMatchRanker from "../../../IMatchRanker";
import IPostableObject from "../../../IPostableObject";
import InfiniteRechargeRank from "./InfiniteRechargeRank";
import InfiniteRechargeMatchDetails from "./InfiniteRechargeMatchDetails";

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
    const sortedRanks: InfiniteRechargeRank[] = this.sort(rankingData, 0, rankingData.length - 1);
    for (let i = 0; i < sortedRanks.length; i++) {
      sortedRanks[i].rank = (i + 1);
    }
    return sortedRanks;
  }

  public prepare(matchJSON: any[]): Map<number, InfiniteRechargeRank> {
    const rankingsMap: Map<number, InfiniteRechargeRank> = new Map<number, InfiniteRechargeRank>();
    for (const match of matchJSON) {
      const redWin = match.red_score > match.blue_score;
      const tie = match.red_score === match.blue_score;
      const participants = match.participants.split(",");
      for (let i = 0; i < participants.length; i++) {
        if (typeof rankingsMap.get(parseInt(participants[i])) === "undefined") {
          const ranking: InfiniteRechargeRank = new InfiniteRechargeRank();
          const eventKey = match.match_key.substring(0, match.match_key.length - 4);
          ranking.teamKey = parseInt(participants[i]);
          ranking.rankKey = eventKey + "R" + ranking.teamKey;
          rankingsMap.set(parseInt(participants[i]), ranking);
        }
        const isSurrogate: boolean = JSON.parse("[" + match.surrogates + "]")[i] === 1;
        const cardStatus: number = JSON.parse("[" + match.cards + "]")[i];
        const isDisqualified: boolean = JSON.parse("[" + match.disqualifieds + "]")[i] === 1;
        const ranking = rankingsMap.get(parseInt(participants[i])) as InfiniteRechargeRank;
        if (!isSurrogate && cardStatus <= 1 && !isDisqualified && match.red_score >= 0 && match.blue_score >= 0) { // TODO - Implement the cleaner 'result' way
          const redTeam = i < (participants.length / 2);
          const details: InfiniteRechargeMatchDetails = new InfiniteRechargeMatchDetails().fromJSON(match);
          const outcomeRp = redTeam && redWin ? 2 : tie ? 1 : !redTeam && !redWin ? 2 : 0;
          const redEnergizedRp = (details.redStageOneCells >= 9 && details.redStageTwoCells >= 20 && details.redStageThreeCells >= 20 && details.redRotationControl && details.redPositionControl && details.redStage === 3) ? 1 : 0;
          const redOperationalRp = (details.getRedEndScore() >= 65 && details.redEndEqualized) ? 1 : 0;
          const blueEnergizedRp = (details.blueStageOneCells >= 9 && details.blueStageTwoCells >= 20 && details.blueStageThreeCells >= 20 && details.blueRotationControl && details.bluePositionControl && details.blueStage === 3) ? 1 : 0;
          const blueOperationalRp = (details.getBlueEndScore() >= 65 && details.blueEndEqualized) ? 1 : 0;
          ranking.rankingPoints += outcomeRp;
          if (redTeam) {
            ranking.rankingPoints += redEnergizedRp + redOperationalRp;
            ranking.autoPoints += details.getRedAutoScore();
            ranking.telePoints += details.getRedTeleScore();
            ranking.endPoints += details.getRedEndScore();
          }

          if (!redTeam) {
            ranking.rankingPoints += blueEnergizedRp + blueOperationalRp;
            ranking.autoPoints += details.getBlueAutoScore();
            ranking.telePoints += details.getBlueTeleScore();
            ranking.endPoints += details.getBlueEndScore();
          }

          if (match.red_score === match.blue_score) {
            ranking.ties++;
          } else if (redTeam && redWin) {
            ranking.wins++;
          }else if (!redTeam && !redWin) {
            ranking.wins++;
          } else {
            ranking.losses++;
          }
        }

        if (match.red_score >= 0 && match.blue_score >= 0) {
          ranking.played++;
          ranking.rankingScore = (ranking.rankingPoints / ranking.played);
        }
      }
    }
    return rankingsMap;
  }

  public sort(items: InfiniteRechargeRank[], left: number, right: number): InfiniteRechargeRank[] {
    let pivot, partitionIndex;

    if (left < right) {
      pivot = right;
      partitionIndex = this.partition(items, pivot, left, right);

      this.sort(items, left, partitionIndex - 1);
      this.sort(items, partitionIndex + 1, right);
    }

    return items;
  }

  private partition(items: InfiniteRechargeRank[], pivot: number, left: number, right: number): number {
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

  private shouldSwap(rank1: InfiniteRechargeRank, rank2: InfiniteRechargeRank) {
    if (rank2.rankingScore === null) {
      return 1;
    }

    if (rank2.autoPoints === null) {
      return 1;
    }

    if (rank2.endPoints === null) {
      return 1;
    }

    if (rank2.telePoints === null) {
      return 1;
    }

    if (rank1.rankingScore < rank2.rankingScore) {
      return -1;
    } else {
      if (rank1.rankingScore > rank2.rankingScore) {
        return 1;
      } else {
        if (rank1.autoPoints < rank2.autoPoints) {
          return -1;
        } else {
          if (rank1.autoPoints > rank2.autoPoints) {
            return 1;
          } else {
            if (rank1.endPoints < rank2.endPoints) {
              return -1;
            } else {
              if (rank1.endPoints > rank2.endPoints) {
                return 1;
              } else {
                if (rank1.telePoints < rank2.telePoints) {
                  return -1;
                } else {
                  if (rank1.telePoints > rank2.telePoints) {
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
    }
  }

  private swap(items: InfiniteRechargeRank[], index1: number, index2: number) {
    const temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
  }
}

export default OceanOpportunitiesRanker.getInstance();
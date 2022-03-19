import {EventType} from "../../Types";
import {
  EnergyImpactRanking,
  InfiniteRechargeRank,
  OceanOpportunitiesRank,
  RapidReactRank,
  RoverRuckusRank
} from "./index";
import Ranking from "./Ranking";

export function getRankingByEventType(eventType?: EventType): Ranking {
  switch (eventType) {
    case "fgc_2018":
      return new EnergyImpactRanking();
    case "fgc_2019":
      return new OceanOpportunitiesRank();
    case "ftc_1819":
      return new RoverRuckusRank();
    case "frc_20":
      return new InfiniteRechargeRank();
    case "frc_22":
      return new RapidReactRank();
    default:
      return new Ranking();
  }
}

export function getRankingBySeasonKey(seasonKey: string): Ranking {
  switch (seasonKey) {
    case "2018":
      return new EnergyImpactRanking();
    case "2019":
      return new OceanOpportunitiesRank();
    case "1819":
      return new RoverRuckusRank();
    case "20":
      return new InfiniteRechargeRank();
    case "22":
      return new RapidReactRank();
    default:
      return new Ranking();
  }
}
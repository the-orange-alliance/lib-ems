const EMS = require("../");

let ranking = new EMS.InfiniteRechargeRank();
console.log(ranking);
// EMS.EMSProvider.initialize("192.168.1.200", 8008);
// EMS.EMSProvider.getRankings("fgc_2019").then((rankings) => {
//   for (const ranking of rankings.sort((a, b) => a.teamKey - b.teamKey)) {
//     console.log(ranking.wins);
//   }
// });
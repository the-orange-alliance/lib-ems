const EMS = require("../");
EMS.FGCProvider.initialize("127.0.0.1", 8088);
EMS.FGCProvider.getRankingTeams("2019-FGC-DUB", "fgc_2019").then((res) => {
  console.log(res);
});
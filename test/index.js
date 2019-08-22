const EMS = require("../");
EMS.FGCProvider.initialize("127.0.0.1", 8088);
EMS.FGCProvider.getHighestScoringMatch("2019", "quals", false).then((res) => {
  console.log(res.participants.map((p) => p.team));
});
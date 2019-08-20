const EMS = require("../");
EMS.FGCProvider.initialize("127.0.0.1", 8088);
EMS.FGCProvider.getCompleteTeam(1, "2019").then((res) => {
  console.log(res);
});
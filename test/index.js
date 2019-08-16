const EMS = require("../");
EMS.FGCProvider.initialize("127.0.0.1", 8088);
EMS.FGCProvider.getCompleteMatch("2019-FGC-DUB-Q001").then((res) => {
  console.log(res);
});
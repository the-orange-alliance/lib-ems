const EMSProvider = require("../").EMSProvider;

EMSProvider.initialize("192.168.1.104", 8008);
EMSProvider.getRankingTeams("fgc_2019").then(function(res) {
  for (var i = 0; i < res.length; i++) {
    console.log(res[i]);
  }
}).catch(function() {
  console.log("error");
});
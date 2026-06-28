const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Servers after:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.h82zmxb.mongodb.net",
  (err, records) => {
    console.log("ERR:", err);
    console.log("RECORDS:", records);
  }
);
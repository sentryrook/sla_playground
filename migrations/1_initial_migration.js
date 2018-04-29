var Migrations = artifacts.require("./Migrations.sol");
var SlaManager = artifacts.require("./SlaManager.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SlaManager);
};

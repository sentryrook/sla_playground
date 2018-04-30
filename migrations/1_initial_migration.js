var Migrations = artifacts.require("./Migrations.sol");
var SlaManager = artifacts.require("./SlaManager.sol");
var EventBasedSLA = artifacts.require("./EventBasedSLA.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SlaManager);
  deployer.deploy(EventBasedSLA,5);
};

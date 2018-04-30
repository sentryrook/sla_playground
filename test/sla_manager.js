var SlaManager = artifacts.require("./SlaManager.sol");

contract('slaManager', function(accounts) {
  var sla_manager;
  it("should assert true", function() {
    return SlaManager.deployed().then(function(instance){
      sla_manager = instance;
      return sla_manager.registerName("SLA001-good",accounts[5],1);
    }).then(function(result){
      console.log(result);
      return sla_manager.getContractInfo.call("SLA001-good");
    }).then(function(result){
      console.log("getContractInfo: ", result);
      var address = result[0];
      var version = result[1].toNumber();
      console.log("address: ",address);
      console.log("version: ",version);
      assert.equal(address, accounts[5], "address is same as address 5");
      assert.equal(version, 1, "version should be 1");
      return sla_manager.registerName("SLA001-good",accounts[6],2);
    }).then(function(result){
      console.log(result);
      return sla_manager.getContractInfo.call("SLA001-good");
    }).then(function(result){
      console.log("getContractInfo: ", result);
      var address = result[0];
      var version = result[1].toNumber();
      console.log("address: ",address);
      console.log("version: ",version);
      assert.equal(address, accounts[6], "address is same as address 6");
      assert.equal(version, 2, "version should be 2");
    });
  });
  it("should assert true", function() {
      return sla_manager.registerName("SLA002-good",accounts[5],1).then(function(instance){
    }).then(function(result){
      console.log(result);
      return sla_manager.getContractInfo.call("SLA002-good");
    }).then(function(result){
      console.log("getContractInfo: ", result);
      var address = result[0];
      var version = result[1].toNumber();
      console.log("address: ",address);
      console.log("version: ",version);
      assert.equal(address, accounts[5], "address is same as address 5");
      assert.equal(version, 1, "version should be 1");
      sla_manager.removeContract("SLA002-good");
      return sla_manager.getContractInfo.call("SLA002-good");
    }).then(function(result){
      console.log("getContractInfo: ", result);
      var address = result[0];
      var version = result[1].toNumber();
      console.log("address: ",address);
      console.log("version: ",version);
      assert.equal(address, 0x0, "address is empty");
      assert.equal(version, 0, "version should be 0");
    });
  });
});

var SlaManager = artifacts.require("./SlaManager.sol");

contract('slaManager', function(accounts) {
  it("should assert true", function(done) {
    var sla_manager = SlaManager.deployed();
    assert.isTrue(true);
    done();
  });
});

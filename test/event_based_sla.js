var EventBasedSLA = artifacts.require("./EventBasedSLA.sol");

contract('EventBasedSLA', function(accounts) {
  var event_based_sla;
  it("should assert true", function() {
    return EventBasedSLA.deployed().then(function(instance){
      event_based_sla = instance;
      console.log("contract address: ", event_based_sla.address);
      assert.isTrue(true);
      return event_based_sla.GetEventCount.call();
    }).then(function(result){
      console.log(result);
      var count = result.toNumber();
      assert.equal(count, 5, "should be 5 events");
    });
  });
  it("should return events list", function() {
    event_based_sla.RecordEvent(1,1)
    event_based_sla.RecordEvent(2,2)
    event_based_sla.RecordEvent(3,13)
    event_based_sla.RecordEvent(4,15)
    return event_based_sla.RecordEvent(5,19).then(function(result){
      return event_based_sla.GetEventCount.call();
    }).then(function(result){
      console.log(result);
      var count = result.toNumber();
      assert.equal(count, 5, "should be 5 events");
      return event_based_sla.GetEventByID.call(1);
    }).then(function(result){
      console.log("E: ",web3.toAscii(result[0]));
      console.log("T: ",result[1].toNumber());
      return event_based_sla.GetEventByID.call(2);
    }).then(function(result){
      console.log("E: ",web3.toAscii(result[0]));
      console.log("T: ",result[1].toNumber());
      return event_based_sla.GetEventByID.call(3);
    }).then(function(result){
      console.log("E: ",web3.toAscii(result[0]));
      console.log("T: ",result[1].toNumber());
      return event_based_sla.GetEventByID.call(4);
    }).then(function(result){
      console.log("E: ",web3.toAscii(result[0]));
      console.log("T: ",result[1].toNumber());
      return event_based_sla.GetEventByID.call(5);
    }).then(function(result){
      console.log("E: ",web3.toAscii(result[0]));
      console.log("T: ",result[1].toNumber());
    });
  });
  it("should have a score of zero", function() {
    event_based_sla.RecordEvent(1,1)
    event_based_sla.RecordEvent(2,2)
    event_based_sla.RecordEvent(3,13)
    event_based_sla.RecordEvent(4,15)
    return event_based_sla.RecordEvent(5,19).then(function(result){
      return event_based_sla.GetEventCount.call();
    }).then(function(result){
      console.log(result);
      var count = result.toNumber();
      assert.equal(count, 5, "should be 5 events");
      return event_based_sla.GetSLAScore.call();
    }).then(function(result){
      score = result.toNumber();
      console.log("Score: ",score);
      assert.equal(score, 0, "score should be 0");
    });
  });
  it("should have a score of one", function() {
    return event_based_sla.RecordEvent(3,0).then(function(result){
      return event_based_sla.GetEventCount.call();
    }).then(function(result){
      console.log(result);
      var count = result.toNumber();
      assert.equal(count, 5, "should be 5 events");
      return event_based_sla.GetSLAScore.call();
    }).then(function(result){
      score = result.toNumber();
      console.log("Score: ",score);
      assert.equal(score, 1, "score should be 1");
    });
  });
  it("should have a score of one", function() {
    event_based_sla.RecordEvent(3,0)
    event_based_sla.RecordEvent(4,0)
    return event_based_sla.RecordEvent(5,0).then(function(result){
      return event_based_sla.GetEventCount.call();
    }).then(function(result){
      console.log(result);
      var count = result.toNumber();
      assert.equal(count, 5, "should be 5 events");
      return event_based_sla.GetSLAScore.call();
    }).then(function(result){
      score = result.toNumber();
      console.log("Score: ",score);
      assert.equal(score, 0, "score should be 0");
    });
  });
});

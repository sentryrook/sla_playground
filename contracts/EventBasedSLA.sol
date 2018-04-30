pragma solidity ^0.4.4;


contract EventBasedSLA {

  event Deposit(
    address indexed _from,
    uint _value
  );

  struct ContractEvent {
    bytes32   name;
    uint16    eventTime;
  }
   
  ContractEvent[] namedEvent;

  function() public payable {
    // Do nothing at this time....
    Deposit(msg.sender, msg.value);
  }

  function EventBasedSLA(uint numEvents) public {
    // constructor
    bytes32 _bytes = "Event";
    for(uint counter = 0; counter < numEvents; counter++) {
      ContractEvent memory newEvent;
      newEvent.name = _bytes;
      newEvent.eventTime = 0;
      namedEvent.push(newEvent);
    }
  }

  function GetEventCount() public view returns(uint){
    return namedEvent.length;
  }

  function RecordEvent(uint eventID, uint16 eventTime) public {
    require(eventID <= namedEvent.length);
    require(eventID > 0);
    namedEvent[eventID-1].eventTime = eventTime;
  }

  function GetEventByID(uint eventID) public view returns(bytes32,uint16){
    require(eventID <= namedEvent.length);
    require(eventID > 0);
    return(namedEvent[eventID-1].name,namedEvent[eventID-1].eventTime);
  }

  function GetSLAScore() public view returns(uint) {
    uint score = 0;
    if(DetectMissingEvents()) {
      score++;
    }
    return score;
  }

  function DetectMissingEvents() internal view returns(bool) {
    uint maxCounter = namedEvent.length - 1;
    for(uint counter = maxCounter; counter > 0; counter--){
      if(namedEvent[counter].eventTime > 0){
        if(namedEvent[counter-1].eventTime == 0) {
          return(true);
        }
      }
    }
    return(false);
  }

  //Given [event] occurs when [condition] then [incentive]
  //Given [event] occurs when [condition] then [disincentive]

  //Given event1 occurs when true then add 0
  //Given event2 occurs when event1 does not exist then sub 1
  //Given event2 occurs when event2.time - event1.time < 5 then add 1
  //Given event2 occurs when event2.time - event1.time > 10 then sub 1
  //Given event3 occurs when event3.time - event1.time > 20 then sub 2
  
}

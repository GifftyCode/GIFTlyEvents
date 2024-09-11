// SPDX-License-Identifier: MIT

pragma solidity >= 0.5.0 < 0.9.0;

contract EventsOrg {
    struct Event {
        address organizer;
        string eventName;
        uint date;
        uint ticketPrice;
        uint ticketCount;
        uint ticketRemaining;
    }

    mapping(uint => Event) public events; // Mapping each event Id to details of each event(Struct)
    mapping (address => mapping (uint => uint)) public tickets; // maps an address (attendee) to another mapping that associates a uint event ID with a uint ticket count.

    uint public nextId; // keep track of the next available unique ID for creating new events


    function createEvent(string calldata _eventName, uint _date, uint _ticketPrice, uint _ticketCount) external {
        require(block.timestamp < _date, 'You cannot create an event for past date');
        require(_ticketCount > 0, 'Ticket count must be greater than zero');
        // the organizer is the msg.sender who is the person calling the function.
        // During event creation time, the number of remaining ticket is the same as the ticketCount since no one has gotten the ticket yet reason why we passed the ticketCount twice
        events[nextId] = Event(msg.sender, _eventName, _date, _ticketPrice, _ticketCount, _ticketCount); 
        nextId++;
    }
}
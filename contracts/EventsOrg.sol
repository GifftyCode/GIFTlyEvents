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
}
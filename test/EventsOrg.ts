import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("EventsOrg", function () {
  
  async function deployEventsOrg() {

    const [owner, otherAccount, otherAccount1] = await hre.ethers.getSigners();

    const Events = await hre.ethers.getContractFactory("EventsOrg");
    const eventsAddr = await Events.deploy();

    return { eventsAddr, owner, otherAccount, otherAccount1};
  }

  describe("Deployment", function () {
    it("Should set the nextid to zero upon deployment", async function () {
      const {eventsAddr } = await loadFixture(deployEventsOrg);

      expect(await eventsAddr.nextId()).to.be.equal(0);
      
    });
  });

  describe("create Event", function(){
    it("Should check that tickect count must be > 0", async function () {
      const {eventsAddr, otherAccount} = await loadFixture(deployEventsOrg);

      const _eventName = "GifftyBabe" ;
      const _date = 1734084719;
      const _ticketPrice = hre.ethers.parseUnits("1", 18)
      const _ticketCount = 0;

      await expect (eventsAddr.createEvent(_eventName, _date, _ticketPrice, _ticketCount)).to.be.revertedWith("Ticket count must be greater than zero");
    });

    it("Should check that current date is < event date", async function () {
      const {eventsAddr, otherAccount} = await loadFixture(deployEventsOrg);

      const _eventName = "GifftyBabe" ;
      const _date = 1724084719;
      const _ticketPrice = hre.ethers.parseUnits("1", 18)
      const _ticketCount = 300;
      
      // // Get the current block's timestamp
      // const blockNumber = await hre.ethers.provider.getBlockNumber();
      // const currentBlock = await hre.ethers.provider.getBlock(blockNumber);
      // const currentTimestamp = currentBlock?.timestamp;

      //console.log(currentTimestamp);

      await expect (eventsAddr.createEvent(_eventName, _date, _ticketPrice, _ticketCount)).to.be.revertedWith("You cannot create an event for past date");
    });

    it("Should check if nextId is increamented", async function () {
      const {eventsAddr, otherAccount} = await loadFixture(deployEventsOrg);

      const _eventName = "GifftyBabe" ;
      const _date = 1734084719;
      const _ticketPrice = hre.ethers.parseUnits("1", 18)
      const _ticketCount = 300;
      
      await eventsAddr.createEvent(_eventName, _date, _ticketPrice, _ticketCount);

      expect (await eventsAddr.nextId()).to.be.equal(1);
    });
  });

  describe("Buy ticket", function())
});

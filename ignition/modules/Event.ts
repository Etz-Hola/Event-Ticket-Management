import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";
  
  
  describe("EventContract", () => {
      async function deployEventContractFixture() {
          const [owner, address1, address2] = await hre.ethers.getSigners();
  
          const eventContract = await hre.ethers.getContractFactory("EventContract");
          const _event = await eventContract.deploy();
  
          return { _event, owner, address1, address2 };
      }
  
      describe("Deployment", () => {
          it("should deploy the Event Contract", async () => {
              const { _event, owner } = await loadFixture(deployEventContractFixture);
  
              expect(await _event.event_count()).to.equal(0);
          });
      });
  
      describe("Create Event", () => {
          it("should create event", async () => {
              const { _event, owner } = await loadFixture(deployEventContractFixture);
              const latestTime = await time.latest();
              await _event.createEvent("pool party", "Matured minds only", latestTime+30, latestTime + 86400, 1, 1, 20);
              const _event_count = await _event.event_count();
              const _eventInstance = await _event.events(_event_count);
              console.log(_eventInstance)
              expect(_eventInstance._title).to.equal("pool party");
          });
      }) 
  });
// import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


// const ContractModule = buildModule("ContractModule", (m) => {

//   const eventsOrg = m.contract("EventsOrg");
//   const lottery = m.contract("Lottery");

//   return { eventsOrg, lottery };
// });

// export default ContractModule;

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const EventsOrgModule = buildModule("EventsOrgModule", (m) => {

  const eventsOrg = m.contract("EventsOrg");

  return { eventsOrg};
});

export default EventsOrgModule;

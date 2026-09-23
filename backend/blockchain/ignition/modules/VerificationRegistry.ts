import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VerificationRegistryModule = buildModule(
  "VerificationRegistryModule",
  (m) => {
    const registry = m.contract("VerificationRegistry");

    return { registry };
  }
);

export default VerificationRegistryModule;
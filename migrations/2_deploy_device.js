const device = artifacts.require("device");

module.exports = function (deployer) {
  deployer.deploy(device);
};

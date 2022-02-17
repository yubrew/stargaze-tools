import { getSigningClient } from "./signingClient";
import { calculateFee, GasPrice } from "@cosmjs/stargate";

const config = require("../config");

export async function instantiateSg721() {
  const client = await getSigningClient();

  const gasPrice = GasPrice.fromString("0stars");
  const instantiateFee = calculateFee(500_000, gasPrice);
  const collectionMsg = {
    name: config["name"],
    symbol: config["symbol"],
    minter: config["creator"],
  };
  console.log(collectionMsg);

  const { contractAddress } = await client.instantiate(
    config["creator"],
    config["sg721CodeId"],
    collectionMsg,
    config["name"],
    instantiateFee
  );
  console.info(`Contract instantiated at: `, contractAddress);

  return contractAddress;
}

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const config = require("./config");

export async function getSigningClient() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    config["mnemonic"],
    {
      prefix: "stars",
    }
  );
  return await SigningCosmWasmClient.connectWithSigner(
    config["rpcEndpoint"],
    wallet
  );
}

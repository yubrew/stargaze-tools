import { Bech32 } from "@cosmjs/encoding";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { getSigningClient } from "./signingClient";

const config = require("./config");

export async function instantiateMinter() {
  const client = await getSigningClient();

  const gasPrice = GasPrice.fromString("0stars");
  const instantiateFee = calculateFee(500_000, gasPrice);
  const msg = {
    base_token_uri: config["baseTokenUri"],
    num_tokens: config["numTokens"],
    sg721_code_id: config["sg721CodeId"],
    sg721_instantiate_msg: {
      name: config["name"],
      symbol: config["symbol"],
      minter: config["creator"],
      config: {
        contract_uri: config["contractURI"],
        creator: config["creator"],
        royalties: {
          payment_address: config["royaltyAddress"],
          share: config["royaltyShare"].toString(),
        },
      },
    },
    unit_price: {
      amount: config["unitPrice"] * 1000000,
      denom: process.env.NEXT_PUBLIC_STAKING_DENOM,
    },
  };
  console.log(msg);

  const { contractAddress } = await client.instantiate(
    config["creator"],
    config["sg721CodeId"],
    msg,
    config["name"],
    instantiateFee
  );
  console.info(`Contract instantiated at: `, contractAddress);

  return contractAddress;
}

export async function mintFor(recipient: string, tokenId: string) {
  if (!recipient.startsWith("stars")) {
    const { data } = Bech32.decode(recipient);
    const starsAddr = Bech32.encode("stars", data);
    recipient = starsAddr;
  }

  const client = await getSigningClient();

  const gasPrice = GasPrice.fromString("0stars");
  const executeFee = calculateFee(300_000, gasPrice);
  const result = await client.execute(
    config["creator"],
    config["minter"],
    { mint_for: { recipient, tokenId } },
    executeFee
  );
  const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
  console.info(
    "The `wasm` event emitted by the contract execution:",
    wasmEvent
  );
}

export async function updateWhitelist(
  minterContract: string,
  toAdd: any,
  toRemove: any
) {
  const client = await getSigningClient();

  const gasPrice = GasPrice.fromString("0stars");
  const executeFee = calculateFee(300_000, gasPrice);
  const result = await client.execute(
    config["creator"],
    minterContract,
    { update_whitelist: { add_addresses: toAdd, remove_address: toRemove } },
    executeFee
  );
  const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
  console.info(
    "The `wasm` event emitted by the contract execution:",
    wasmEvent
  );
}

export async function updateWhitelistExpiration(
  minterContract: string,
  expiration: any
) {
  const client = await getSigningClient();

  const gasPrice = GasPrice.fromString("0stars");
  const executeFee = calculateFee(300_000, gasPrice);
  const result = await client.execute(
    config["creator"],
    minterContract,
    { update_whitelist_expiration: { at_time: expiration } },
    executeFee
  );
  const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
  console.info(
    "The `wasm` event emitted by the contract execution:",
    wasmEvent
  );
}

export async function updateWhitelistStartTime(
  minterContract: string,
  expiration: any
) {
  const client = await getSigningClient();

  const gasPrice = GasPrice.fromString("0stars");
  const executeFee = calculateFee(300_000, gasPrice);
  const result = await client.execute(
    config["creator"],
    minterContract,
    { update_start_time: { at_time: expiration } },
    executeFee
  );
  const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
  console.info(
    "The `wasm` event emitted by the contract execution:",
    wasmEvent
  );
}

export async function updatePerAddressLimit(
  minterContract: string,
  perAddresLimit: number
) {
  const client = await getSigningClient();

  const gasPrice = GasPrice.fromString("0stars");
  const executeFee = calculateFee(300_000, gasPrice);
  const result = await client.execute(
    config["creator"],
    minterContract,
    { update_per_address_limit: { per_address_limit: perAddresLimit } },
    executeFee
  );
  const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
  console.info(
    "The `wasm` event emitted by the contract execution:",
    wasmEvent
  );
}

export async function updateBatchMintLimit(
  minterContract: string,
  batchMintLimit: number
) {
  const client = await getSigningClient();

  const gasPrice = GasPrice.fromString("0stars");
  const executeFee = calculateFee(300_000, gasPrice);
  const result = await client.execute(
    config["creator"],
    minterContract,
    { update_batch_mint_limit: { batch_mint_limit: batchMintLimit } },
    executeFee
  );
  const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
  console.info(
    "The `wasm` event emitted by the contract execution:",
    wasmEvent
  );
}

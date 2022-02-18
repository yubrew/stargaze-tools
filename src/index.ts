#!/usr/bin/env node
import yargs, { Argv } from "yargs";
import { createAccount } from "./account";
import { instantiateSg721 } from "./sg721";
import { instantiateMinter } from "./minter";
import { pinataUpload } from "./pinata-upload";

const argv = yargs(process.argv.slice(2))
  .scriptName("stars-cli")
  .usage("Usage: $0 <cmd> [options]")
  .command(
    "create-account",
    "Create a new Stargaze account and address",
    function () {
      createAccount();
    }
  )
  .command(
    "instantiate-sg721",
    "instantiate a new NFT Minter contract",
    function (args: Argv) {
      instantiateSg721().then(console.log);
    }
  )
  .command(
    "instantiate-minter",
    "instantiate a new NFT Minter contract",
    function (args: Argv) {
      instantiateMinter().then(console.log);
    }
  )
  .command(
    "create-account",
    "create a new STARS account",
    function (args: Argv) {
      console.log("Coming soon...");
    }
  )
  .command(
    "mint-for",
    "Mint an NFT for an address",
    {
      recipient: {
        type: "string",
        demandOption: true,
        describe: "The address to which you wish to transfer the NFT.",
      },
      tokenId: {
        type: "string",
        demandOption: true,
        describe: "The token ID of the NFT you wish to transfer.",
      },
    },
    function (args: any) {
      console.log(args);
    }
  )
  .command(
    "pinata-upload",
    "Upload project to IPFS via Pinata (requires API key)",
    function (args: Argv) {
      console.log(args);
      pinataUpload().then(console.log);
    }
  )
  .command(
    "update-whitelist",
    "Update the whitelist for a minter contract",
    {
      contract: {
        type: "string",
        demandOption: true,
        describe: "The address of the minter contract.",
      },
      toAdd: {
        type: "string",
        demandOption: true,
        describe: "Path to CSV file of addresses to add.",
      },
      toRemove: {
        type: "string",
        demandOption: true,
        describe: "Path to CSV file of addresses to remove.",
      },
    },
    function (args: any) {
      console.log(args);
    }
  )
  .option("c", {
    // document options.
    description: "Project configuration",
    default: "config.js",
    alias: "config",
  })
  .option("h", {
    alias: "help",
    description: "display help message",
  })
  .help("help")
  // .demandCommand()
  .version() // the version string.
  .alias("version", "v")
  // final message to display when successful.
  .epilog(
    "For more information visit https://github.com/public-awesome/stargaze-nft"
  )
  .parseSync();

// the parsed data is stored in argv.
console.log(argv._);

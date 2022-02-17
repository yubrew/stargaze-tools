#!/usr/bin/env node
import yargs from "yargs";
import { instantiate } from "./instantiate";
import { pinataUpload } from "./pinata-upload";

const argv = yargs(process.argv.slice(2))
  .scriptName("stars-cli")
  .usage("Usage: $0 <cmd> [options]")
  .command(
    "instantiate",
    "instantiate a new NFT Minter contract",
    function (args: any) {
      instantiate().then(console.log);
    }
  )
  // TODO init a new project
  .command("init", "create a blank Stargaze NFT project", function (args: any) {
    console.log("Coming soon...");
  })
  // TODO start repl
  .command("repl", "Launch CosmJS Repl", function (args: any) {
    console.log(args);
  })
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
    () => {},
    function (args: any) {
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

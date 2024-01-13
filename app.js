const express = require('express');

const { GasPrice } = require('@cosmjs/stargate');
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { getOfflineSignerAmino } = require('cosmjs-utils');
const { chains } = require('chain-registry');

const app = express();
const port = 3000;



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/execute', async (req, res) => {
  // //eto yung address ng imimint

  console.log("this is the req.body: ", req.body);

  var contractAddress = req.body.contractAddress;
  var seedPhrase = req.body.seedPhrase;
  var phase = req.body.phase;
  var price = req.body.price;
  var arrAddresses = req.body.address;
  // var rpcEndPoint = req.body.rpcEndPoint;
  var rpcEndPoint = 'https://rpc.wallet.pacific-1.sei.io/';

  const mnemonic = seedPhrase;
  const chain = chains.find(({ chain_name }) => chain_name === 'sei');

  for (let i = 0; i < arrAddresses.length; i++) {

    const instruction = {

    }

    var msg = {
      "mint_native": {
        "collection": contractAddress,
        "group": phase,
        "hashed_address": null,
        "merkle_proof": null,
        "recipient": arrAddresses[i]
      }
    };
  }



  const funds = [];


  // console.log("this is the msg: ", msg); 

  // const execute = async () => {

  //   try {
  //     const rpcEndpoint = rpcEndPoint;
  //     const signer = await getOfflineSignerAmino({ mnemonic, chain });
  //     const client = await SigningCosmWasmClient.connectWithSigner(
  //       rpcEndpoint,
  //       signer,
  //       {
  //         gasPrice: GasPrice.fromString("0.125usei"),
  //       }
  //     );

  //     const [sender] = await signer.getAccounts();

  //     const fee = "auto";

  //     const tx = await client.execute(
  //       sender.address,
  //       'sei1hjsqrfdg2hvwl3gacg4fkznurf36usrv7rkzkyh29wz3guuzeh0snslz7d',
  //       msg,
  //       fee,
  //       undefined,
  //       funds
  //     );

  //     console.log(tx.transactionHash);

  //     console.log('mint successful');
  //   } catch (error) {
  //     console.log(error); // Handle the error
  //     console.log('mint not successful');
  //   }

  // };

  // execute();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

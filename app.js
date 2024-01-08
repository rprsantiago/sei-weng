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

app.get('/execute', async (req, res) => {
  //eto yung address ng imimint
  var contractAddress = req.query.contractAddress;
  var seedPhrase = req.query.seedPhrase;
  var phase = req.query.phase;
  var price = req.query.price;
  var address = req.query.address;
  // var rpcEndPoint = req.query.rpcEndPoint;
  var rpcEndPoint = 'https://rpc.wallet.pacific-1.sei.io/';

  const mnemonic = seedPhrase;
  const chain = chains.find(({ chain_name }) => chain_name === 'sei');

  var msg = {
    "mint_native": {
      "collection": contractAddress,
      "group": phase,
      "hashed_address": null,
      "merkle_proof": null,
      "recipient": address
    }
  };

  const funds = [];

  const execute = async () => {

    try {
      const rpcEndpoint = rpcEndPoint;
      const signer = await getOfflineSignerAmino({ mnemonic, chain });
      const client = await SigningCosmWasmClient.connectWithSigner(
        rpcEndpoint,
        signer,
        {
          gasPrice: GasPrice.fromString("0.125usei"),
        }
      );

      console.log('this is the client: ', client);

      const [sender] = await signer.getAccounts();

      console.log('this is the sender address: ', sender.address)

      const fee = "auto";

      const tx = await client.execute(
        sender.address,
        'sei1hjsqrfdg2hvwl3gacg4fkznurf36usrv7rkzkyh29wz3guuzeh0snslz7d',
        msg,
        fee,
        undefined,
        funds
      );

      console.log(tx.transactionHash);

      console.log('mint successful');
    } catch (error) {
      console.log(error); // Handle the error
      console.log('mint not successful');
    }

  };

  execute();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

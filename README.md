# NFT con dati on-chain
Questo progetto ha lo scopo di mostrare la creazione di un **NFT** con **dati on-chain** sfruttando lo **standard ERC-721**.

I dati sono on-chain perché sono all'interno del tokenURI dell'NFT che viene mintato. In questo modo non dobbiamo affidarci a servizi di terze parti per lo storage dell'NFT e sfruttiamo a pieno la decentralizzazione.
### Smart Contract
Lo smart contract è di tipo `ERC721URIStorage`. Nel costruttore chiamiamo il costruttore della super classe (passando due parametri: il nome e il simbolo dei nostri NFT) e impostiamo `tokenId = 0`, che tiene il conto di quanti token sono stati mintati.

Il core del contratto è il metodo `create`:
```js
function create(string memory _svg) public {
    _safeMint(msg.sender, tokenId);
    string memory imageURI = toImageURI(_svg);
    _setTokenURI(tokenId, toTokenURI(imageURI));
    tokenId = tokenId + 1;
    emit CreatedMyNFT(tokenId, _svg);
}
```
- `_safeMint` è il metodo che ereditiamo da `ERC721` ed è (dalla documentazione di OpenZeppelin) una "internal function to safely mint a new token";
- `toImageURI` è un metodo del nostro contratto che serve a convertire il contenuto testuale di un file SVG in un URI in base 64. In parole povere, qualcosa da concatenare con la stringa `data:image/svg+xml;base64,`;
- `toTokenURI` genera un JSON in base 64 che viene impostato come `tokenURI` dell'NFT appena mintato. Viene infatti usato quando chiamiamo `_setTokenURI`.
### Configurazione
**Premessa**: per l'esecuzione dello smart contract hai bisogno di un `wallet MetaMask`. Ricordati di settare la rete di test Rinkeby (o quella che preferisci). Per avere ether a disposizione puoi usare qualsiasi faucet Rinkeby disponibile online.

1. Clona la repository
2. `npm install`
3. Crea un file `.env` in cui impostare le variabili d'ambiente:
    - **RINKEBY_URL** (serve per deploy su rinkeby): *crea un account su Alchemy => nuovo progetto => imposta rinkeby come rete di test => copia HTTP URL*
    - **MNEMONIC** (serve per deploy non in locale): *frase mnemonica di MetaMask*
    - **ETHERSCAN_API_KEY**: *registrati su etherscan => impostazioni => copia API KEY*
4. Compila lo smart contract
5. Deploy

### Compilazione & Deploy
Per compilare: `npx hardhat compile`

Lo script `deploy-nft.js` effettua il deploy del contratto, la verifica e il mint di un NFT basato sul file `flag.svg` nella cartella `img`.
Per eseguire il deploy:
- (localhost) `npx hardhat deploy`
- (rinkeby) `npx hardhat deploy --network rinkeby`

Al termine, nel terminale avrai un log di questo tipo
`tokenURI: data:application/json;base64,eyJuYW1lIjogIkZsYWdneU5GVCIsImRlc2NyaXB0aW9u[...]rQ2p3dmMzWm5QZ289In0=
`

Prova a copiarlo sulla barra degli indirizzi del browser e dovresti visualizzare qualcosa del genere: 
```json
{
    "name": "FlaggyNFT",
    "description": "On-chain flag NFT",
    "attributes": "",
    "image": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZG[...]BQUFBRWxGVGtTdVFtQ0MiIC8+Cjwvc3ZnPgo="
}
```

Puoi provare anche ad estrapolare solo il valore di `image` e copiarlo sulla barra degli indirizzi del browser, dovresti visualizzare proprio il tuo NFT :)

### Buon divertimento!
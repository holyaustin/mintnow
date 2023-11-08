import React, { useContext, useEffect, useState } from 'react';
import { Xrpl } from '../provider/XrplProvider';

function View() {

  const { _xrpl, client, account } = useContext(Xrpl);
  const [nfts, setNfts] = useState([]);
  const [nftAmount, setNftAmount] = useState("");

  useEffect(() => {
    async function getNfts() {
      if (!client) return;
      if (!account) {
        // alert("Please connect wallet");
        return;
      }
      console.log(client);
      const { result: { account_nfts } } = await client.request({
        method: "account_nfts",
        account: account
      });
      setNftAmount(account_nfts.length);
      setNfts([]);
      account_nfts?.forEach((item) => {
        const tokenUri = _xrpl.convertHexToString(item.URI);
        fetch(tokenUri).then((response) => response.json()).then(data => setNfts(p => [...p, { ...data, tokenID: item.NFTokenID }]));
      });
    }
    getNfts();
  }, [client, account]);

  return (
    <div id="home">
      <div className="title">Your NFTs{account ? `(${nftAmount})` : null}</div>
      <div className="view">
        {
          account
            ? nfts.length
              ? nfts.map((item, index) => (
                                <div className="card" key={index}>
                                    <div className="name">{item.name}</div>
                                    <div className="description">{item.description}</div>
                                    <a className="id" href={`https://xrpscan.com/nft/${item.tokenID}`}>ID: {item.tokenID}</a>
                                    <div className="content">
                                        <img src={item.image} />
                                        <div className="attributes">
                                            <div className="title">Attributes</div>
                                            {
                                                item.attributes.map((attribute, index) => (
                                                    <div className="list" key={index}>
                                                        <div className="type">{attribute.trait_type}</div>
                                                        <div className="value">{attribute.value}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
      ))
      : <div className="no-nft">You don't have any NFTs!</div>
      : <div className="loading">Wallet not connected</div>
                }
    </div>
        </div >
    )
}

export default View;
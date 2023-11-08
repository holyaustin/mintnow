import React, { createContext, useEffect, useState } from 'react';
const xrpl = require("xrpl");

const network = "wss://s.altnet.rippletest.net:51233";
// const network = "wss://xrplcluster.com";

const server = "https://xroyaltybackend.vercel.app";
// const server = "http://localhost:8080";

export const Xrpl = createContext({
    _xrpl: null,
    client: null,
    account: null,
    connectWallet: () => { },
    disconnectWallet: () => { }
})

function XrplProvider({ children }) {
    const [_xrpl, setXrpl] = useState(null);
    const [account, setAccount] = useState(null);
    const [client, setClient] = useState(null);
    const [url, setUrl] = useState(null);


    async function connectWallet() {
        fetch(server, { method: "POST" })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.url);
                window.open(data.url, '_blank');
            });
    }

    async function disconnectWallet() {
        setUrl(null);
    }

    useEffect(() => {
        async function connect() {
            const client = new xrpl.Client(network);
            await client.connect();
            console.log(client);
            setXrpl(xrpl);
            setClient(client);
            // const interval = setInterval(() => {
            //     fetch("https://xroyaltybackend.vercel.app/", { method: "POST" })
            //         .then((res) => res.json())
            //         .then((data) => {
            //             if (!data) return;
            //             console.log(data.address);
            //             setAccount(data.address);
            //         });
            // }, 5000);
        }
        connect();
        return async () => client.disconnect();
    }, []);

    useEffect(() => {
        if (!url) {
            setAccount(null);
            return;
        }
        console.log(_xrpl.convertStringToHex(url));
        const interval = setInterval(() => {
            fetch(`${server}/${_xrpl.convertStringToHex(url)}`, { method: "POST" })
                .then((res) => res.json())
                .then((data) => {
                    if (!data) return;
                    if (!data.address) return;
                    console.log(data.address);
                    setAccount(data.address);
                });
        }, 3000);
        return () => clearInterval(interval);
    }, [url])

    return (
        <Xrpl.Provider value={{ _xrpl, client, account, connectWallet, disconnectWallet }}>
            {children}
        </Xrpl.Provider>
    )
}

export default XrplProvider;
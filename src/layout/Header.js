import React, { useContext, useEffect, useState } from 'react';
import { Xrpl } from '../provider/XrplProvider';
import logo from "../assets/img/logo_word_white.png";
import close from "../assets/img/close.svg";

function Header() {
  const { connectWallet, disconnectWallet, account } = useContext(Xrpl);
  const [isBoxOpened, setIsBoxOpened] = useState(false);

  const openBox = () => {
    setIsBoxOpened(true);
  }

  const closeBox = () => {
    setIsBoxOpened(false);
  }

  useEffect(() => {
    closeBox();
  }, [account])

  return (
    <div id="header">
      <div className="container">
        <a href="/">
         {/* <img src={logo} alt="logo" />*/}
           <div><h1>Mint Now </h1></div>
        </a>
        {/* <div className="links">
          <Link to="/">Mint</Link>
          <Link to="/view">View</Link>
        </div> */}
        <div className="connect-btn">
          {
            account
              ? <button onClick={openBox}>{account.slice(0, 3) + "..." + account.slice(-3)}</button>
              : <button onClick={connectWallet}>Connect</button>
          }
        </div>
      </div>
      {
        isBoxOpened &&
        <div className="msg-box-container">
          <div className="msg-box">
            <div className="top">
              <div className="title">Account Details</div>
              <button onClick={closeBox}><img src={close}alt="logo"/></button>
            </div>
            <div className="main">
              {account}
            </div>
            <div className="bottom">
              <button className="change-btn" onClick={connectWallet}>Change Wallet</button>
              <button className="disconnect-btn" onClick={disconnectWallet}>Disconnect</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Header;
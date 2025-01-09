import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../Hooks/useConnectWallet";

const CheckLogin = ({ register, Id, children }) => {
    const { walletAddress, ethBalance, ethBalanceUsdt, connectWallet } = useWallet();
    const [checkDevice, setCheckDevice] = useState("");
  const [texts, setText] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const detecting = async () => {
      if (window.innerWidth < 1000 && typeof window.ethereum === "undefined") {
        console.log("mobile");
        setCheckDevice(() => "mobileWithoutApp");
      } else if (
        window.innerWidth < 1000 &&
        typeof window.ethereum !== "undefined"
      ) {
        setCheckDevice(() => "mobileWithApp");
      } else if (
        window.innerWidth > 1000 &&
        typeof window.ethereum !== "undefined"
      ) {
        console.log("pc");
        setCheckDevice(() => "pcWithExtention");
      } else if (
        window.innerWidth > 1000 &&
        typeof window.ethereum === "undefined"
      ) {
        setCheckDevice(() => "pcWithoutExtention");
      }
    };

    detecting();
    console.log(register, "register");
    if (register == "login") {
      setText("Login with Wallet");
      setUrl(
        "https://metamask.app.link/dapp/http://securearbitrage.com"
      );
    } else if (register == "code") {
      setText("REGISTER TO GET YOUR AFFILIATE CODE");
      setUrl("https://metamask.app.link/dapp/http://securearbitrage.com");
    } else if (register == "pay") {
      setText("Connect Wallet to Buy");
      setUrl(
        `https://metamask.app.link/dapp/http://securearbitrage.com`
      );
    } else if (register == "busdgame") {
      setText("Login with Wallet");
      setUrl(
        `https://metamask.app.link/dapp/http://securearbitrage.com`
      );
    }
  }, []);
  return (
    <div>
      {checkDevice === "mobileWithoutApp" && (
        <a href={url} target={"_blank"} className="text-decoration-none">
          <p className="check-login">{children}</p>
        </a>
      )}
      {checkDevice === "mobileWithApp" && (
        <>
          {!walletAddress || walletAddress === "undefined" ? (
            <p className="check-login" onClick={() => connectWallet()}>
              {children}
            </p>
          ) : (
            <p className="check-login">{children}</p>
          )}
        </>
      )}
      {checkDevice === "pcWithExtention" && (
        <>
          {!walletAddress || walletAddress === "undefined" ? (
            <p className="check-login" onClick={() => connectWallet()}>
              {children}
            </p>
          ) : (
            <param className="check-login">{children}</param>
          )}
        </>
      )}
      {checkDevice === "pcWithoutExtention" && (
        <a
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          target={"_blank"}
          className="text-decoration-none"
        >
          <p className="check-login">{children}</p>
        </a>
      )}
    </div>
  );
};

export default CheckLogin;

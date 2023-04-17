"use client";
import { useWeb3React } from "@web3-react/core";
import { connector } from "@/config/web3";
import { useCallback, useEffect } from "react";

const Home = () => {
  const { active, account, activate, deactivate, error, chainId } =
    useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = useCallback(() => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  }, [deactivate]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="pt-10 mx-auto text-3xl font-bold">web3 demo login app</h1>

      {active ? (
        <>
          <button
            className="w-40 p-10 mx-auto mt-10 rounded-lg bg-cyan-500"
            onClick={disconnect}
          >
            Disconnect Wallet
          </button>
          <p className="pt-10 mx-auto">
            You are connected to the network ID: {chainId}
          </p>
          <p className="pt-10 mx-auto">Your account is {account}</p>
        </>
      ) : (
        <button
          className="w-40 p-10 mx-auto mt-10 rounded-lg bg-cyan-500"
          onClick={connect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Home;

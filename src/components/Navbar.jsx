
import { createThirdwebClient } from "thirdweb";
import { useConnect } from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";

const client = createThirdwebClient({ clientId : 'b48165bc64b4817f7ea74fe38dc2fc82' });
function ConnectButton() {
  const { connect, isConnecting, error } = useConnect();
  return (
    <div className='flex items-center justify-end px-5 py-2.5 ml-[400px] lg:ml-[800px] mt-[-300px]'>
    <button
    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      disabled={isConnecting}
      onClick={() =>
        connect(async () => {
          const wallet = createWallet("io.metamask"); // pass the wallet id

          // if user has wallet installed, connect to it
          if (injectedProvider("io.metamask")) {
            await wallet.connect({ client });
          }

          // open WalletConnect modal so user can scan the QR code and connect
          else {
            await wallet.connect({
              client,
              walletConnect: { showQrModal: true },
            });
          }

          // return the wallet to set it as active wallet
          return wallet;
        })
      }
    >
      {isConnecting ? "Connecting..." : "Wallet Connected"}
    </button>
    </div>
  );
}


export default ConnectButton;
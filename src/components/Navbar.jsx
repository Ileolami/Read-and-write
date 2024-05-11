import React from 'react'
import { createThirdwebClient } from 'thirdweb';
import { createWallet,  injectedProvider } from 'thirdweb/wallets';

const client = createThirdwebClient({ clientId: 'b48165bc64b4817f7ea74fe38dc2fc82' });
const metamask = createWallet("io.metamask"); // pass the wallet id
 

const Navbar = () => {
    const connectWallet = async () => {
        // if user has metamask installed, connect to it
if (injectedProvider("io.metamask")) {
    await metamask.connect({ client });
  }
   
  // open wallet connect modal so user can scan the QR code and connect
  else {
    await metamask.connect({
      client,
      walletConnect: { showQrModal: true },
    });
  }
  
    }
  return (
    <div className='flex w-full items-center justify-between px-5 py-2.5'>
       
        <button onClick={connectWallet} className='bg-white text-black text-[14px] px-[9px] py-[2.5px]'>connect</button>
    </div>
  )
}

export default Navbar
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
   else if(!injectedProvider("io.metamask")) {
    alert("Metamask is not installed");
    return;
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
    <div className='flex items-center justify-end px-5 py-2.5 ml-[400px] lg:ml-[800px] mt-[-300px]'>
        <button onClick={connectWallet} className=' text-black text-[14px] px-[9px] py-[2.5px] w-20 h-10 rounded-lg bg-blue-500 hover:bg-green-500 '>connect</button>
    </div>
  )
}

export default Navbar


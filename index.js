import { ethers } from 'ethers';
import cron from 'node-cron';
import * as dotenv from 'dotenv';
import header from './header.js';

// Load environment variables from .env file
dotenv.config();

//Variables
const JSON_RPC_PROVIDER_URL = process.env.JSON_RPC_PROVIDER_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const TIMEOUT = process.env.TIMEOUT
//Ethers.js
const provider = new ethers.JsonRpcProvider(JSON_RPC_PROVIDER_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const walletAddress = signer.address

// Construct the transaction object
const tx = {
    gasLimit: 300000, // 300000 gas limit
    from: walletAddress, // Sender's address
    to: '0xf0a66d18b46d4d5dd9947914ab3b2ddbdc19c2c0',   // Receiver's address
    data: '0x4e71d92d', // The encoded function call or other data
};

async function main() {
    await header()
    try {
        for (let i = 0; i < 20; i++) {
            console.log(`Sending transaction ${i + 1}...`);

            const txResponse = await signer.sendTransaction(tx);
            console.log(`Transaction ${i + 1} Hash:`, txResponse.hash);

            // Optionally wait for the transaction to be mined
            const receipt = await txResponse.wait();
            console.log(`Transaction ${i + 1} mined in block:`, receipt.blockNumber);

            // Optional: Delay between each transaction if needed to avoid nonce issues
            await new Promise(resolve => setTimeout(resolve, TIMEOUT)); // 5-second delay
        }
        console.log('Finished. Auto Mint Will Trigger In 12H')
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

main().then(() => {
    // Schedule the task to run every 3 hours
    cron.schedule('0 */12 * * *', async () => {
        await main();
    });
})


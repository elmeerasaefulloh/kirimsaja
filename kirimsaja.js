const { ethers } = require('ethers');

// Ganti dengan URL RPC Chain ID
const RPC_URL = 'isi rpc';
const CHAIN_ID = isi chain id;

// Kunci pribadi dari akun pengirim (jaga kerahasiaannya!)
const PRIVATE_KEY = 'isi pk';

// Membuat provider menggunakan RPC URL
const provider = new ethers.JsonRpcProvider(RPC_URL, {
    chainId: CHAIN_ID,
    name: ''
});

// Membuat wallet dari kunci pribadi dan menghubungkannya dengan provider
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

let transactionCount = 0;

// Fungsi untuk generate alamat Ethereum
function generateEthAddress() {
    const randomWallet = ethers.Wallet.createRandom();
    return randomWallet.address;
}

async function sendTransaction() {
    try {
        const chalk = (await import('chalk')).default; // Import chalk secara dinamis

        // Mendapatkan saldo ETH saat ini
        const balance = await provider.getBalance(wallet.address);

        // Generate random amount between 0.00001 and 0.000099
        const randomAmount = (Math.random() * (0.0000099 - 0.000001) + 0.000001).toFixed(8);

        // Generate new destination address
        const DESTINATION_ADDRESS = generateEthAddress();

        // Menyiapkan detail transaksi
        const tx = {
            to: DESTINATION_ADDRESS,
            value: ethers.parseEther(randomAmount),
            chainId: CHAIN_ID
        };

        // Mengirim transaksi
        const transactionResponse = await wallet.sendTransaction(tx);

        // Menunggu transaksi diselesaikan
        const receipt = await transactionResponse.wait();

        // Mendapatkan saldo ETH setelah transaksi
        const newBalance = await provider.getBalance(wallet.address);

        // Menambahkan angka urut di depan pesan
        transactionCount += 1;
        console.log(`${chalk.yellow(transactionCount)}. Kirim\t: ${randomAmount} ETH\nPenerima\t: ${DESTINATION_ADDRESS} \nBlock\t\t: ${receipt.blockNumber}\nBalance\t\t: ${chalk.green(ethers.formatEther(newBalance) + ' ETH')}`);
    } catch (error) {
        //const chalk = (await import('chalk')).default; // Import chalk secara dinamis untuk error
        //console.error(chalk.red('Jangan lupa madang!'));
    }
}

// Loop untuk mengirim transaksi setiap 3 detik
setInterval(sendTransaction, 3000);

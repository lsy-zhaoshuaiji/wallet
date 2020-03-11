let ethers=require('ethers');
//1.通过私钥创建钱包
let privateKey='0xec3702c3c89d352b95e0e0288fab1ca16c55977963804748e215cb9415c72b58';
let w1=new ethers.Wallet(privateKey);
console.log(w1.privateKey);
console.log(w1.address);
//2.随机创建一个新的钱包
let w2=new ethers.Wallet.createRandom();
console.log(w2.privateKey);
console.log(w2.address);
console.log(w2.mnemonic);
//3.给定json文件，创建钱包
let data = {
    id: "fb1280c0-d646-4e40-9550-7026b1be504a",
    address: "88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
    Crypto: {
        kdfparams: {
            dklen: 32,
            p: 1,
            salt: "bbfa53547e3e3bfcc9786a2cbef8504a5031d82734ecef02153e29daeed658fd",
            r: 8,
            n: 262144
        },
        kdf: "scrypt",
        ciphertext: "10adcc8bcaf49474c6710460e0dc974331f71ee4c7baa7314b4a23d25fd6c406",
        mac: "1cf53b5ae8d75f8c037b453e7c3c61b010225d916768a6b145adf5cf9cb3a703",
        cipher: "aes-128-ctr",
        cipherparams: {
            iv: "1dcdf13e49cea706994ed38804f6d171"
        }
    },
    "version" : 3
};

let json = JSON.stringify(data);
let password = "foo";

ethers.Wallet.fromEncryptedJson(json, password).then(function(wallet) {
    console.log("Json Address: " + wallet.address);
    // "Address: 0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290"
});
//4.给定助记词，生成钱包
let mnemonic = "pepper gift color reward collect timber pyramid rhythm avoid head city want";
let path = "m/44'/60'/0'/0/0";    //格式为: m/44'/60'/0'/0/{account_index}
let secondMnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic, path);
console.log("secondMnemonicWallet Address: " + secondMnemonicWallet.address);
//5.随机创建一个助记词钱包
let randValue=ethers.utils.randomBytes(16);
let w5_mnemonic=ethers.utils.HDNode.entropyToMnemonic(randValue);
console.log(`mnemonic: ${w5_mnemonic}`);
let path1 = "m/44'/60'/0'/0/0";
let thirdMnemonicWallet = ethers.Wallet.fromMnemonic(w5_mnemonic, path1);
console.log("thirdMnemonicWallet:",thirdMnemonicWallet.address);
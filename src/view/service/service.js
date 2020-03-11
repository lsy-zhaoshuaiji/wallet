let ethers=require('ethers');
let CreateRanderWallet=()=>{
    let w2=new ethers.Wallet.createRandom();
    return w2
};
let CreateWalletByPrivateKey=(PrivateKey)=>{
    console.log(PrivateKey,"wwwwwwwwwwwwwwwwwwwwwww");
    let w1=new ethers.Wallet(PrivateKey);
    return w1
};
let checkPrivateKey = (key) => {
    if (key === '') {
        return "不能为空!"
    }

    if (key.length != 66 && key.length != 64) {
        return "密钥长度为66位或64位16进制数字"
    }
    //^ : 开头
    //$ : 结尾
    //(0x)? : 可有可无
    //[0-9A-Fa-f]: 限定取值数据
    //{64}: 限定64个

    if (!key.match(/^(0x)?([0-9A-Fa-f]{64})$/)) {
        return "私钥为16进制表示,限定字符[0-9A-Fa-f]"
    }

    return ""
};
let checkAddress = (address) => {
    try {
        let addressNew = ethers.utils.getAddress(address);
        return addressNew
    } catch (error) {
        return ""
    }
};
let createRandomMnemonic = () => {
    //16字节的随机数
    let value = ethers.utils.randomBytes(16);
    //生成助记词
    let words = ethers.utils.HDNode.entropyToMnemonic(value);
    return words
};

let MMICPATH_PREFIX = "m/44'/60'/0'/0/";

//根据助记词和path路径生成对应的钱包
let createWalletFromMnemonic = (mmic, path) => {
    //现在只使用一个地址，但是我们能够获取很多
    let wallets = [];
    for (let i = 0; i < 10; i++) {
        let path1 = MMICPATH_PREFIX + i;
        let w = ethers.Wallet.fromMnemonic(mmic, path1);
        wallets.push(w);
        console.log(i + ":" + w.address)
    }

    //以后扩展的时候，可以把wallets全部返回
    return wallets
};
let createWalletFromKeyStore = (keystore, password, callback) => {
    return new Promise(async (resolve, reject) => {
        // let wallets = [] //后续扩展
        console.log('type:', typeof keystore);
        try {
            // let w = await ethers.Wallet.fromEncryptedJson(keystore, password, (progress) => {
            //     console.log(parseInt(progress * 100) + '%')
            // })
            let w = await ethers.Wallet.fromEncryptedJson(keystore, password, callback);
            resolve(w)

        } catch (error) {
            reject(error,"wwwwwwwwwwwwwwwwwwwwwwwwwww")
        }
    })
};
let exportKeyStoreFromWallet = (wallet, password, callback) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let keystore = await wallet.encrypt(password, p => {
            //     console.log(parseInt(p * 100) + '%')
            // })
            let keystore = await wallet.encrypt(password, callback);
            resolve(keystore)
        } catch (error) {
            reject(error)
        }
    })
};
let services={
    CreateRanderWallet,
    CreateWalletByPrivateKey,
    checkPrivateKey,
    checkAddress,
    createRandomMnemonic,
    createWalletFromMnemonic,
    createWalletFromKeyStore,
    exportKeyStoreFromWallet,
};


module.exports=services;
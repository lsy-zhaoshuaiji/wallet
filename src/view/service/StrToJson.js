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

console.log(json)
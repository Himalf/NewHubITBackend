var admin = require("firebase-admin");
var serviceAccount = require("../firebase-key.json")
const uuid = require('uuid');
const Bucket = 'hubit-1dc97.appspot.com';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: Bucket,
});
const bucket = admin.storage().bucket();
const uploadImage = (req, res, next) => {
    if (!req.files) return next();



    req.files.map((val, i) => {
        const Images = val;
        const Name = uuid.v4() + Images.originalname.split(".").pop();
        const file = bucket.file(Name);
        console.log(file);

        const stream = file.createWriteStream({
            metadata: {
                contentType: Images.mimetype,
            }
        });
        stream.on("error", (e) => {
            console.error(e);
        })
        stream.on("finish", async () => {
            file.makePublic();
            val.firebaseUrl = `https://storage.googleapis.com/${Bucket}/${Name}`;
            setTimeout(function () { return next() }, 10000);
        })
        stream.end(Images.buffer);
    });
    console.log(req.files, "files");
    return;
}
module.exports = uploadImage;
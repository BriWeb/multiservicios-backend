const validateEncoded = async (req, res, next) => {
    try {

        const basicHeader = req.headers['authorization'];
        const credentialsInBase64 = basicHeader.split(" ")[1];
        const credentials = new Buffer.from(credentialsInBase64, "base64").toString("utf8");

        const user = {
            username : credentials.split(":")[0],
            password : credentials.split(":")[1]
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = validateEncoded;
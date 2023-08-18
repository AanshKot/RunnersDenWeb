import aws from "aws-sdk";

const region = "";
const bucketName = "";
const accessKeyId = "";
const secretKeyAccess = "";

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretKeyAccess,
    signatureVersion: '4'
})



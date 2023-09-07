// The settings.
const settings = {
    AWSAccessKeyID: 'YOURAWSACCESSKEYID',
    AWSSecretAccessKey: 'YOURAWSSECRETACCESSKEY',
    AWSRegion: 'eu-central-1',
    MaxLabels: 10,
    MinConfidence: 75
}

// Load dependencies.
var FS = require('fs');
var AWS = require('aws-sdk');

// Ensure a path to an image got passed as an argument.
if (process.argv.length < 3) {
    console.log('Please pass the path to the image as an argument.');
    return;
}

// Extract the image path from the passed arguments.
var imagePath = process.argv[2];

// Ensure that the passed image exists.
if (!FS.existsSync(imagePath)) {
    console.log('The passed image does not exist!');
    return;
}

// Set AWS credentials.
var credentials = new AWS.Credentials({
    accessKeyId: settings.AWSAccessKeyID,
    secretAccessKey: settings.AWSSecretAccessKey,
});

AWS.config.credentials = credentials;

// Set region.
AWS.config.update({
    region: settings.AWSRegion
});

// Create AWS Rekognition Client.
const Rekognition = new AWS.Rekognition();

// Set parameters.
const parameters = {
    Features: [
        'GENERAL_LABELS',
    ],
    Image: {
        Bytes: base64_encode(imagePath),
    },
    MaxLabels: settings.MaxLabels,
    MinConfidence: settings.MinConfidence
}

// Detect labels.
Rekognition.detectLabels(parameters, function(error, response) {
    if (error) {
        console.log(error, error.stack);
    } else {
        console.log('Detected Labels:');
        console.log();

        response.Labels.forEach(label => {
            console.log(label.Name + ':');
            console.log('- ' + parseFloat(label.Confidence).toFixed(2) + '% Confidence');
            console.log();
        });
    }
});

// Function to encode the data of a file to a base64 encoded string.
function base64_encode(file) {
    // Read the binary data.
    var data = FS.readFileSync(file);
    
    // Convert the binary data to a base64 encoded string.
    return Buffer.from(data, 'base64');
}

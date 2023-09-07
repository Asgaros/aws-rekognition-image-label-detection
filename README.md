# AWS Rekognition Image Label Detection
A simple Node.js application to detect labels within an image using AWS Rekognition.

## Introduction
This repository contains a simple Node.js application which can be used to detect labels within an image using AWS Rekognition. The image which should get analyzed has to get passed to the application as an argument. In the results, a maximum of 10 labels with a minimum confidence of 75% are displayed. Feel free to adjust the parameters based to your needs.

## Installation
The application uses the aws-sdk as a dependency. Please run ```npm install``` before using it.

## Configuration
You can configure the following settings within the ```settings``` constant at the beginning of the ```detect.js``` file:
- **AWSAccessKeyID:** The ID of your AWS Access Key
- **AWSSecretAccessKey:** Your AWS Secret Access Key
- **AWSRegion:** The AWS Region in which you want to operate AWS Rekognition
- **MaxLabels:** The maximum number of labels to return
- **MinConfidence:** The minimum confidence level for the labels to return

## Usage
Simply pass the path to an image file as an argument when calling the Node.js application, for example:
```bash
node detect.js "C:\Path\Special Images\example.jpg"
```
**Note:** AWS Rekognition currently only supports JPEG and PNG images!

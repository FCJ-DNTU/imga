# imga
**imga** is a tool that helps you to extract content of a table to excel. Which run with **tesseract** as core. This tool is served with web application which is deployed in AWS Cloud.
<p align="center">
  <img src="https://github.com/user-attachments/assets/a97b7d3b-7c6a-48e6-baaf-55664f49bdb0" />
</p>

## Relevant Labs
There are some labs that I use and learn to build this project
- Lab 000002: [Manage access with AWS Identity and Access Management (AWS IAM)](https://000002.awsstudygroup.com/)
- Lab 000003: [Deploy network infrastructure with Amazon Virtual Private Cloud (Amazon VPC)](https://000003.awsstudygroup.com/)
- Lab 000004: [Getting Started and Deploying Applications on Amazon Compute Cloud (Amazon EC2)](https://000004.awsstudygroup.com/)
- Lab 000015: [Deploy Applications with Docker](https://000015.awsstudygroup.com/)
- Lab 000037: [Initialize Infrastructure as Code with AWS CloudFormation](https://000037.awsstudygroup.com/)
- Lab 000048: [Grant application permissions to access AWS services through IAM Role (AWS IAM)](https://000048.awsstudygroup.com/)
- Lab 000057: [Hosting static website with Amazon S3](https://000057.awsstudygroup.com/)

## Infrastructure
This diagram describes how my system look like in Cloud.
<p align="center">
  <img src="https://github.com/user-attachments/assets/8219b828-562c-4b3d-bad0-a2a20ba7f680" />
</p>

Note: _Remember, this diagram is just the first version of my application (this version is used for workshop), I'll will draw my entire system in future in the **Development Orientation** section._

## Technologies
I'll build the system and infrastructure with some technologies, tools, platforms and AWS services that are listed below.

### For frontend
Users will interact with web application and receive result from web application. I decide to use these technologies for building are `HTML`, `CSS`, `Javascript`, `Boostrap`.

### For backend
- `Node`, `Express`: use to build
- `Python`, `Tesseract`, `Numpy`: use to build python program, the core feature of this app.
- `SDK`: use to build applications, programs (Server, Python program) on cloud with AWS Software Development Kit.

### Services
- `VPC`: an infrastructure of my system in cloud.
- `EC2`: use to host docker container, including backend, web application.
- `S3`: use to store images, static files (web).
- `IAM`: use to grant to ec2, tools for cloud resources accessing.
- `API Gateway`: use to centralize apis in app.
- CloudFormation: (_in the future version of this project_)
- ECS (_in the future version of this project_)
- Amplify (_in the future version of this project_)
- Cloud9 (_in the future version of this project_)
- Lambda (_in the future version of this project_)
- Amazon RDS (_in the future version of this project_)
- Amazon Cognito (_in the future version of this project_)
- ELB (_in the future version of this project_)

### Environment
- `Docker` & `Cloud` (For production)
- `Local` (For development)

### Deployment tools
- `Github Actions`: use to delivery new code to cloud, upload web app, ...

## Development Orientation
In the future, I'll add more features, change OCR Model (or built by myself). These are my plan to use non-empharized services in the **Services** section.
- `CloudFormation`: actually I don't need it, because my structure of application is simple.
- `ECS`: I'll migrate my local docker containers in EC2 to ECS.
- `Amplify` & Cloud9: use to simplify my web application development & deployment.
- `Lambda`: move python program to lambda.
- `Amazon` RDS & Cognito:
- `ELB`: maybe, in future, my application is popular an current system cannot handle multiple requests, so I'll use ELB if EC2s still exist in my system.

Developed by @NguyenAnhTuan1912

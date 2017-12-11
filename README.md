#PAY PER READ

##Objective

We expect to have an app in React + Nodejs (Express) that is able to get Books from a catalog online (Contentful) and give a landing with summary and book information. Finally having a button that allows you to "Pay with a Tweet" that would be a twitter app you authorize to read / write, and will post in your name thanking for the book and giving you a temporal link to download (It lasts 2 minutes since S3 isnt able to create 1 time use but its good for the use case here)

###Requirements

1. Configure CONTENTFUL\_SPACE and CONTENTFUL\_TOKEN in environment variables (Remember you need to define your book with the same model structure that is expected `{id: "id", name: "name", summary: "summary", author: "author"}`
2. Configure AWS with any of the allowed methods (IAM role would be the suggested method if you are using an ec2 instance)

###Using it

After you filled the requirements (make sure to create and change your s3 bucket) you just need to run:
`npm run start:dev` 

For production environment you have `npm run start:prod` but i would suggest checking out the start up script that set up everything with a Docker container 


###Extra

We did server side rendering beside the client side rendering offered by react so search engines will have 0 problem loading the site!

###Scripts

Every script required to deploy has comments on it explaining everything and other choices to make it work better!
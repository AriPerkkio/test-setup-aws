Test setup for aws services for react app.
- Cloudfront: Single origin for webapp and API
- Cognito: User creation with email verification
- Dynamo DB: Store and read user specific data
- API Gateway: Integrate HTTP requests with Lambdas
- Lambdas: Integrate HTTP requests with Dynamo DB
- S3: Store and serve react app

```bash
# Only two things required:
# - aws credentials setup at ~/aws
# - S3 bucket for react app with matching name at package.json

# Setup cloudformation stack defined in api/serverless.yml
$ cd <project-root>/api
$ npm run deploy

# Build react app, deploy it to S3
$ cd <project-root>
$ npm run build
$ npm run deploy

# Check cloudfront's url from
$ cat <project-root>/api/cf-output.json
{
  ...
  "CloudFrontDomainName": "xyz123.cloudfront.net",
```

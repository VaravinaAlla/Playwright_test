FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /playwright-tests

COPY . .

RUN npm install

CMD ["npx", "playwright", "test", "--project=api-tests", "--project=login", "--project=qauto"]
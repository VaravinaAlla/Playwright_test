FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /playwright-tests

COPY . .

RUN npm install

CMD ["npx", "playwright", "test", "--project=api-tests", "--project=login", "--project=qauto"]
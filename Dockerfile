FROM node:22.12-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --include=optional

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]

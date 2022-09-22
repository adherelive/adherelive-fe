FROM node:16.10.0 as builder
LABEL application="adhere-live-frontend"
LABEL owner="Akshay Nagargoje"
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# stage 2
FROM nginx
EXPOSE 80
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /code/build/ /usr/share/nginx/html

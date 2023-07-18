FROM node:14.15.0 as builder
#RUN useradd -d /home/azureuser -m -s /bin/bash azureuser
LABEL application="adhere-live-frontend"
LABEL owner="Akshay Nagargoje"
RUN mkdir -p /code && mkdir -p /code/public
WORKDIR /code
COPY package.json ./
COPY package-lock.json ./
RUN npm install && npm cache clean --force --loglevel=error
COPY . .
RUN cp ./env_files/.env_prod .env
RUN npm run build
# Stage 2
FROM nginx
EXPOSE 80
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /code/build/ /usr/share/nginx/html
HEALTHCHECK NONE


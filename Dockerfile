FROM node:16.10.0 as builder
#RUN useradd -d /home/azureuser -m -s /bin/bash azureuser
LABEL application="adherelive-frontend"
LABEL owner="Akshay Nagargoje"
RUN mkdir -p /code && mkdir -p /code/public
WORKDIR /code
COPY package.json /code
COPY package-lock.json /code
COPY env_files/.env_prod /code/.env
RUN npm install
COPY . /code
RUN npm run build
FROM nginx
EXPOSE 80
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /code/build/ /usr/share/nginx/html
HEALTHCHECK NONE
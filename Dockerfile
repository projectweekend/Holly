FROM dockerfile/nodejs

RUN mkdir /webapp_root
ADD . /webapp_root/
WORKDIR /webapp_root

RUN npm install -g sails
RUN npm install

EXPOSE 3000

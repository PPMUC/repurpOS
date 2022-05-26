FROM electronuserland/builder:16-wine

#RUN apk add --update nodejs npm
RUN apt-get update
RUN apt-get install bash
RUN apt-get install g++ make python3-pip -y
RUN apt-get install make gcc g++ python3 
RUN apt-get install \
   git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
   -yq --no-install-suggests --no-install-recommends \
   && apt-get clean && rm -rf /var/lib/apt/lists/*
# RUN apk update && apk add wine
# RUN apk add bash
# RUN apk add g++ make py3-pip
# RUN apk add make gcc g++ python3 


WORKDIR /src
RUN npm install -g node-gyp
#RUN npm install python
RUN npm install vue

RUN npm install serialport --build-from-source

COPY . /src

RUN npm install


ENTRYPOINT ["/bin/bash", "-c", "npm run electron:build"]
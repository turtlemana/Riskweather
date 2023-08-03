FROM node:16

# 앱 디렉터리 생성
WORKDIR /home/Riskweather_web

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install
RUN npm ci --only=production
RUN npm i --save-dev @types/react-csv

# Add necessary system libraries for sharp
RUN apt-get update && apt-get install -y \
    libvips-dev \
    libjpeg-dev \
    libpng-dev

# sharp 패키지 설치
RUN apt-get update \
    && apt-get install -y libvips-dev python3 make g++ \
    && yarn add sharp \
    && apt-get remove -y libvips-dev python3 make g++ \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .
RUN npm run build

# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# pm2 설치
# RUN npm install -g pm2


EXPOSE 3000

# pm2로 실행
# CMD [ "pm2-runtime", "npm", "--", "start" ]
CMD [ "npm", "start"]

# 🖥 Kiosk Project

## Agenda
1. [Tech-Stack](#TechStack)
2. [Documents](#Documents)
    1. [Server Setting](#1-Server-Setting)
    2. [Client Setting](#2-Client-Setting)

## 🛠 Tech-Stack
* JavaScript, TypeScript
* Node.js, Nest.js, TypeORM
* REST-API, Postman
* MySQL
* Git, Github
* docker, docker-compose, ubuntu, shell-script

## 📚 Documents
### 1. Server Setting
1. [리눅스 계정추가](https://jhnyang.tistory.com/10)
```bash
sudo useradd -m <user-name> ## -m -> 사용자계정을 추가하고 자동으로 홈 디렉터리 생성
```
2. [`sudo` 그룹에 추가된 계정 추가](https://www.delftstack.com/ko/howto/linux/how-to-add-sudo-users-in-ubuntu/)
```bash
usermod -aG sudo <user-name>
```
3. [Password 없이 sudo 명령어 사용할수 있는 권한 추가](https://brownbears.tistory.com/225)
```bash
echo '<user-name> ALL=(ALL) NOPASSWD: ALL'>> /etc/sudoers
cat /etc/sudoers | tail -2
```
4. Git 설치
5. [Git-ssh key 생성](https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
6. Github - Setting - SSH and GPG Keys 에 **서버의 공개키** 등록
   ![](img/Screen%20Shot%202021-04-28%20at%204.02.59%20PM.png)
7. [클라이언트의 공개키를 서버에 등록](http://faq.add4s.com/?p=333)
8. Git Repository Clone<br>
   ![](img/Screen%20Shot%202021-04-28%20at%204.04.20%20PM.png)
9. [Docker, Docker Compose 설치](https://docs.docker.com/compose/install/)
10. 사용할 서버들의 포트포워딩

### 2. Client Setting
#### 1. Server IP Address 환경변수 설정
사용하고있는 터미널의 종류(ex. bash, zsh...)에 따라 홈 디렉토리에 있는 .<terminal-name>rc 파일을 열고 아래 환경변수를 추가한다(zsh일경우 .zshrc).
```bash
export KIOSK_SERVER_IP=<ip-address>
```
#### 2. 쉘 스크립트 추가
* `start-local-server.sh`
```bash
#!/bin/bash

sudo docker-compose up -d mysql && sudo docker-compose up -d --build api_server

exit 0
```

* `stop-local-server.sh`
```bash
#!/bin/bash

sudo docker-compose down

exit 0
```

* `start-remote-server.sh`
```bash
#!/bin/bash

ssh kiosk@"$KIOSK_SERVER_IP" "cd ./src/kiosk && sh start-local-server.sh"
```

* `stop-remote-server.sh`
```bash
#!/bin/bash

ssh kiosk@"$KIOSK_SERVER_IP" "cd ./src/kiosk && sh stop-local-server.sh"
```

* `deploy-remote-server.sh`
```bash
#!/bin/bash

ssh kiosk@"$KIOSK_SERVER_IP" "cd ./src/kiosk && \
    sh stop-local-server.sh && \
    git pull && \
    sh start-local-server.sh"
    
exit 0
```

#### 3. 생성한 모든 쉘 스크립트 실행가능한 파일로 변경
```bash
chmod +x <.sh-filename>
```

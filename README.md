# π₯ Kiosk Project

## Agenda
1. [Tech-Stack](#-Tech-Stack)
2. [Documents](#-Documents)
    1. [Server Setting](#1-Server-Setting)
    2. [Client Setting](#2-Client-Setting)

## π  Tech-Stack
* JavaScript, TypeScript
* Node.js, Nest.js, TypeORM
* REST-API, Postman
* MySQL
* Git, Github
* docker, docker-compose, ubuntu, shell-script

## π Documents
### 1. Server Setting
1. [λ¦¬λμ€ κ³μ μΆκ°](https://jhnyang.tistory.com/10)
```bash
sudo useradd -m <user-name> ## -m -> μ¬μ©μκ³μ μ μΆκ°νκ³  μλμΌλ‘ ν λλ ν°λ¦¬ μμ±
```
2. [`sudo` κ·Έλ£Ήμ μΆκ°λ κ³μ  μΆκ°](https://www.delftstack.com/ko/howto/linux/how-to-add-sudo-users-in-ubuntu/)
```bash
usermod -aG sudo <user-name>
```
3. [Password μμ΄ sudo λͺλ Ήμ΄ μ¬μ©ν μ μλ κΆν μΆκ°](https://brownbears.tistory.com/225)
```bash
echo '<user-name> ALL=(ALL) NOPASSWD: ALL'>> /etc/sudoers
cat /etc/sudoers | tail -2
```
4. Git μ€μΉ
5. [Git-ssh key μμ±](https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
6. Github - Setting - SSH and GPG Keys μ **μλ²μ κ³΅κ°ν€** λ±λ‘
   ![](img/Screen%20Shot%202021-04-28%20at%204.02.59%20PM.png)
7. [ν΄λΌμ΄μΈνΈμ κ³΅κ°ν€λ₯Ό μλ²μ λ±λ‘](http://faq.add4s.com/?p=333)
8. Git Repository Clone<br>
   ![](img/Screen%20Shot%202021-04-28%20at%204.04.20%20PM.png)
9. [Docker, Docker Compose μ€μΉ](https://docs.docker.com/compose/install/)
10. μ¬μ©ν  μλ²λ€μ ν¬νΈν¬μλ©

### 2. Client Setting
#### 1. Server IP Address νκ²½λ³μ μ€μ 
μ¬μ©νκ³ μλ ν°λ―Έλμ μ’λ₯(ex. bash, zsh...)μ λ°λΌ ν λλ ν λ¦¬μ μλ .<terminal-name>rc νμΌμ μ΄κ³  μλ νκ²½λ³μλ₯Ό μΆκ°νλ€(zshμΌκ²½μ° .zshrc).
```bash
export KIOSK_SERVER_IP=<ip-address>
```
#### 2. μ μ€ν¬λ¦½νΈ μΆκ°
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

#### 3. μμ±ν λͺ¨λ  μ μ€ν¬λ¦½νΈ μ€νκ°λ₯ν νμΌλ‘ λ³κ²½
```bash
chmod +x <.sh-filename>
```

# 자동배포 Client 구성
## Server IP Address 환경변수 설정
사용하고있는 터미널의 종류(ex. bash, zsh...)에 따라 홈 디렉토리에 있는 .<terminal-name>rc 파일을 열고 아래 환경변수를 추가한다(zsh일경우 .zshrc).
```bash
export KIOSK_SERVER_IP=<ip-address>
```
## 쉘 스크립트 추가
* `start-local-server.sh`
```bash
#!/bin/bash

sudo docker-compose up -d mysql && sudo docker-compose up -d api_server

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

ssh kiosk@"$KIOSK_SERVER_IP" "cd ./src/kiosk && sh stop-local-server.sh && git pull && sh start-local-server.sh"
```

## 생성한 모든 쉘 스크립트 실행가능한 파일로 변경
```bash
chmod +x <.sh-filename>
```


# 자동배포 Server 구성
1. 서버 IP: 14.5.208.178
2. [리눅스 계정추가](https://jhnyang.tistory.com/10)
```bash
sudo useradd -m <user-name> ## -m -> 사용자계정을 추가하고 자동으로 홈 디렉터리 생성
```
3. [`sudo` 그룹에 추가된 계정 추가](https://www.delftstack.com/ko/howto/linux/how-to-add-sudo-users-in-ubuntu/)
```bash
usermod -aG sudo <user-name>
```
4. [Password 없이 sudo 명령어 사용할수 있는 권한 추가](https://brownbears.tistory.com/225)
```bash
echo '<user-name> ALL=(ALL) NOPASSWD: ALL'>> /etc/sudoers
cat /etc/sudoers | tail -2
```
5. Git 설치
6. [Git-ssh key 생성](https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
7. Github - Setting - SSH and GPG Keys 에 **서버의 공개키** 등록
![](server-setting/Screen%20Shot%202021-04-28%20at%204.02.59%20PM.png)
8. [클라이언트의 공개키를 서버에 등록](http://faq.add4s.com/?p=333)
9. Git Repository Clone
![](server-setting/Screen%20Shot%202021-04-28%20at%204.04.20%20PM.png)
10. [Docker, Docker Compose 설치](https://docs.docker.com/compose/install/) 
11. 사용할 서버들의 포트포워딩

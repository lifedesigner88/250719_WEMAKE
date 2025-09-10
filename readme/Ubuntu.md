## **1. Ubuntu 기본 설정**

### **Ubuntu 터미널 접속**
```shell script
# 윈도우에서 Windows Terminal 또는 cmd에서
wsl

# 또는 시작메뉴에서 "Ubuntu" 검색해서 실행
```


### **Ubuntu 업데이트**
```shell script
# 패키지 목록 업데이트
sudo apt update

# 설치된 패키지들 업그레이드
sudo apt upgrade -y

# 기본 개발 도구 설치
sudo apt install -y curl wget git build-essential
```


## **2. Node.js 설치 (NVM 방식)**

### **NVM 설치**
```shell script
# NVM 설치 스크립트 다운로드 및 실행
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 터미널 재시작 (중요!)
source ~/.bashrc

# NVM 설치 확인
nvm --version
```


### **Node.js 최신 LTS 설치**
```shell script
# 최신 LTS 버전 설치
nvm install --lts

# 설치된 버전 사용
nvm use --lts

# 기본 버전으로 설정
nvm alias default node

# 설치 확인
node --version    # v20.11.0 (또는 최신 LTS)
npm --version     # 10.2.4 (해당 버전)
```


## **3. Git 설정**

### **Git 사용자 정보 설정**
```shell script
# 본인의 이름과 이메일로 변경
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 설정 확인
git config --list
```


### **SSH 키 생성 (GitHub용)**
```shell script
# SSH 키 생성 (이메일은 GitHub 계정 이메일)
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# 엔터 3번 (기본 위치, 패스워드 없음)
# Enter file: (엔터)
# Enter passphrase: (엔터) 
# Enter same passphrase: (엔터)

# SSH 키 복사
cat ~/.ssh/id_rsa.pub
```


**GitHub에 SSH 키 등록:**
1. GitHub.com → Settings → SSH and GPG keys → New SSH key
2. 위에서 복사한 키 붙여넣기

## **4. 프로젝트 클론**

### **projects 폴더 생성**
```shell script
# 홈 디렉토리에 projects 폴더 생성
mkdir ~/projects
cd ~/projects
```


### **Git 프로젝트 클론**
```shell script
# SSH 방식 (권장)
git clone git@github.com:username/your-react-project.git

# 또는 HTTPS 방식
git clone https://github.com/username/your-react-project.git

# 프로젝트 폴더로 이동
cd your-react-project
```


## **5. WebStorm에서 프로젝트 열기**

### **WSL 프로젝트 열기**
1. WebStorm 실행
2. **File → Open**
3. 주소창에 입력: `\\wsl$\Ubuntu\home\username\projects\your-react-project`
4. **OK** 클릭

### **WebStorm WSL 설정**
1. **File → Settings** (Ctrl+Alt+S)
2. **Languages & Frameworks → Node.js**
3. **Node interpreter**: `...` 버튼 클릭
4. **Add...** → **WSL** 선택
5. **Linux distribution**: Ubuntu
6. **Node interpreter path**: `/home/username/.nvm/versions/node/v20.11.0/bin/node`
7. **Package manager**: `/home/username/.nvm/versions/node/v20.11.0/bin/npm`
8. **OK** → **Apply** → **OK**

## **6. 터미널 설정**

### **WebStorm 터미널을 WSL로 설정**
1. **File → Settings**
2. **Tools → Terminal**
3. **Shell path**: `wsl.exe`
4. **Tab name**: `WSL: Ubuntu`
5. **OK**

## **7. npm install 실행**

### **WebStorm 하단 터미널에서**
```shell script
# 터미널이 자동으로 WSL Ubuntu로 열림
pwd  # /mnt/c/... 가 아닌 /home/username/projects/your-react-project 여야 함

# package.json 확인
ls -la  # package.json 파일이 있는지 확인

# 의존성 설치
npm install

# 개발 서버 실행 테스트
npm run dev
```


## **8. 프로젝트 실행 설정**

### **Run Configuration 생성**
1. **Run → Edit Configurations**
2. **+** → **npm**
3. **Name**: `Dev Server`
4. **package.json**: 프로젝트의 package.json 경로
5. **Command**: `run`
6. **Scripts**: `dev`
7. **Node interpreter**: 설정한 WSL Node.js
8. **OK**

## **9. 전체 폴더 구조 확인**

```shell script
# WSL Ubuntu 터미널에서
tree -L 2 ~/projects/your-react-project/
# 또는
ls -la ~/projects/your-react-project/

# 예상 결과:
# ├── package.json
# ├── package-lock.json
# ├── node_modules/
# ├── src/
# ├── public/
# └── ...
```


## **10. 개발 시작!**

### **개발 서버 실행**
```shell script
npm run dev
```


### **브라우저에서 확인**
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (일반적인 React)

## **문제 해결**

### **권한 문제 발생 시**
```shell script
# npm 캐시 정리
npm cache clean --force

# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```


### **포트 문제 발생 시**
```shell script
# 다른 포트로 실행
npm run dev -- --port 3001
```


## **완료 체크리스트**

- [ ] ✅ Ubuntu 업데이트 완료
- [ ] ✅ NVM + Node.js 설치 완료
- [ ] ✅ Git 설정 완료
- [ ] ✅ SSH 키 GitHub 등록 완료
- [ ] ✅ 프로젝트 클론 완료
- [ ] ✅ WebStorm WSL 설정 완료
- [ ] ✅ npm install 성공
- [ ] ✅ 개발 서버 실행 성공

이제 **WSL Ubuntu + WebStorm** 환경에서 빠르고 쾌적하게 개발할 수 있습니다! 🎉

**질문이나 에러가 발생하면 언제든 말씀해 주세요!**
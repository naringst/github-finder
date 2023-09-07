# Github-Finder

> 깃허브 사용자, 사용자 정보를 찾아주는 어플리케이션 👥

## 검색 기능
검색창에 깃허브 사용자 이름을 검색하면 레포지토리와 프로필 정보를 확인할 수 있습니다.
![main-page](assets/main-page.png)


### 검색 방법 
1. 검색 버튼을 통해서
   
https://github.com/naringst/github-finder/assets/92130993/4ba8c0d2-a3df-41f6-a3a8-c26e40ddb236

2. 엔터 버튼을 활용해 가능합니다.


https://github.com/naringst/github-finder/assets/92130993/86d028a1-2f1d-43ba-8adc-a9dc1ec58ed3

<br/>

## 검색 시 확인할 수 있는 정보
검색 시 **github api**를 활용해 해당 사용자의 정보를 fetch합니다.
fetch해오는 정보는 다음과 같습니다.


### 1. 프로필사진

프로필 사진을 가져오며, 프로필보기 버튼을 누르면 프로필 사진을 더 큰 사이즈로 확인할 수 있습니다.


https://github.com/naringst/github-finder/assets/92130993/7948d377-eb2e-4030-b7a9-c024e6f4d0c0


### 2. 사용자 주요 정보

사용자의 Public Repo, Public Gists, Followers, Following 정보를 알 수 있습니다. 또한 소속 회사, 블로그 주소, 위치, 가입 날짜를 정보를 가져옵니다.
![user-info](assets/userInfo.png)

### 3. 주요 리포지토리

사용자의 주요 리포지토리 정보를 보여줍니다. 리포지토리 이름, star 수, watcher 수, fork 수를 보여줍니다.
![repo-info](assets/repoInfo.png)

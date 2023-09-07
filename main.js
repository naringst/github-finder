// import { Octokit } from "octokit";

// MYTOKEN = "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";

// const octokit = new Octokit({
//   auth: { MYTOKEN },
// });

function UserProfile(name, company, blog, location, date) {
  this.name = name;
  this.company = company;
  this.blog = blog;
  this.location = location;
  this.date = date;
}

function UserSocial(publicRepos, publicGists, followers, following) {
  this.publicRepos = publicRepos;
  this.publicGists = publicGists;
  this.followers = followers;
  this.following = following;
}

function UserRepos(name, stars, watchers, forks) {
  this.name = name;

  this.stars = stars;
  this.watchers = watchers;
  this.forks = forks;
}

function getInputValue() {
  const $input = document.getElementsByTagName("input")[0];
  const inputValue = $input.value;
  return inputValue;
}

function setProfileImage(url) {
  $profileImage = document.querySelector(".profile > img");
  $profileImage.src = url;
}

function setUserProfile(userObject) {
  const $company = document.querySelector(".profile-detail #company");
  console.log($company);
  $company.textContent = `회사 : ${userObject.company}`;
  const $blog = document.querySelector(".profile-detail #blog");
  $blog.textContent = `블로그 : ${userObject.blog}`;
  const $location = document.querySelector(".profile-detail #location");
  $location.textContent = `위치 : ${userObject.location}`;
}

function setUserSocial(userSocial) {
  const $publicRepos = document.querySelector(".profile-info-buttons > .blue");
  $publicRepos.textContent = `Public Repos : ${userSocial.publicRepos}`;

  const $publicGists = document.querySelector(".profile-info-buttons > .gray");
  $publicGists.textContent = `Public Gists : ${userSocial.publicGists}`;

  const $followers = document.querySelector(".profile-info-buttons > .green");
  $followers.textContent = `Followers : ${userSocial.followers}`;

  const $following = document.querySelector(
    ".profile-info-buttons > .bluegreen"
  );
  $following.textContent = `Following : ${userSocial.following}`;
}

async function fetchGithubUserInfo() {
  const userName = getInputValue();
  const response = await fetch(`http://api.github.com/users/${userName}`);
  if (response.status == "200") {
    const $section = document.querySelector(".found");
    $section.style.display = "block";

    const $notfound = document.querySelector(".not-found");
    $notfound.style.display = "none";
  } else {
    const $section = document.querySelector(".found");
    $section.style.display = "none";

    const $notfound = document.querySelector(".not-found");
    $notfound.style.display = "block";
  }

  const $footer = document.querySelector("footer");
  $footer.style.position = "relative";

  const user = await response.json().then((res) => {
    console.log(res);
    const user = new UserProfile(
      res.login,
      res.company,
      res.blog,
      res.location
    );

    setProfileImage(res["avatar_url"]);

    const userSocial = new UserSocial(
      res["public_repos"],
      res["public_gists"],
      res["followers"],
      res["following"]
    );

    setUserProfile(user);
    setProfileImage(res["avatar_url"]);
    setUserSocial(userSocial);
  });
}

function showProfile() {
  const $nowImg = document.querySelector(".profile img");
  const nowURL = $nowImg.src;
  window.open(nowURL, "_프로필");
}

function makeRepo(repoObject) {
  const $repoDiv = document.createElement("div");
  $repoDiv.className = "repo";

  const $repoName = document.createElement("p");
  $repoName.textContent = repoObject["name"];

  const $repoContainer = document.querySelector(".repos-container");

  $repoDiv.appendChild($repoName);
  $repoContainer.appendChild($repoDiv);

  const $repoButtonDiv = document.createElement("div");
  $repoButtonDiv.className = "buttons";

  const $repoStars = document.createElement("button");
  $repoStars.className = "blue";
  $repoStars.textContent = `Stars : ${repoObject.stars}`;

  const $repoWatachers = document.createElement("button");
  $repoWatachers.className = "gray";
  $repoWatachers.textContent = `Watchers : ${repoObject.watchers}`;

  const $repoForks = document.createElement("button");
  $repoForks.className = "green";
  $repoForks.textContent = `Forks : ${repoObject.forks}`;

  $repoButtonDiv.appendChild($repoStars);
  $repoButtonDiv.appendChild($repoWatachers);
  $repoButtonDiv.appendChild($repoForks);

  $repoDiv.appendChild($repoButtonDiv);
}

async function fetchRepoData() {
  const user = getInputValue();

  const repoData = await fetch(`http://api.github.com/users/${user}/repos`);
  const repoRes = await repoData.json().then((res) =>
    res.slice(0, 3).forEach((r, idx) => {
      const userRepoInfo = new UserRepos(
        r.name,
        r["stargazers_count"],
        r.forks,
        r.watchers
      );
      makeRepo(userRepoInfo);
    })
  );
}

//event listener

const $searchButton = document.querySelector(".search-div > button");
$searchButton.addEventListener("click", fetchGithubUserInfo);
$searchButton.addEventListener("click", fetchRepoData);

const $inputBlank = document.querySelector(".search-div > input");
$inputBlank.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    fetchGithubUserInfo();
    fetchRepoData();
  }
});

const $profileShowButton = document.querySelector(".profile > button");
$profileShowButton.addEventListener("click", showProfile);

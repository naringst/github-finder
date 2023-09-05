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

function UserRepos(link, stars, watchers, forks) {
  this.link = link;
  this.stars = stars;
  this.watchers = watchers;
  this.forks = forks;
}

function getInputValue() {
  const $input = document.getElementsByTagName("input")[0];
  const inputValue = $input.value;

  const userInfo = fetchGithubUserInfo(inputValue);

  setProfileImage(userInfo["avatar_url"]);
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

async function fetchGithubUserInfo(userName) {
  const response = await fetch(`http://api.github.com/users/${userName}`);
  const user = await response.json().then((res) => {
    console.log(res);
    const user = new UserProfile(
      res.login,
      res.company,
      res.blog,
      res.location
    );

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
  return user;
}

function showProfile() {
  const $nowImg = document.querySelector(".profile img");
  const nowURL = $nowImg.src;
  window.open(nowURL, "_프로필");
}

const $searchButton = document.querySelector(".search-div > button");
$searchButton.addEventListener("click", getInputValue);

const $profileShowButton = document.querySelector(".profile > button");
$profileShowButton.addEventListener("click", showProfile);

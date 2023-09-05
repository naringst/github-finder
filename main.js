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

function UserSocial(publicRepos, publicGists, Followers, Following) {
  this.publicRepos = publicRepos;
  this.publicGists = publicGists;
  this.Followers = Followers;
  this.Following = Following;
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
  });
  return user;
}

const $searchButton = document.querySelector(".search-div > button");
$searchButton.addEventListener("click", getInputValue);

import { Octokit } from "octokit";

MYTOKEN = "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";

const octokit = new Octokit({
  auth: { MYTOKEN },
});

const $searchButton = document.querySelector(".search-div > button");
$searchButton.addEventListener("click", getInputValue);

function getInputValue() {
  const $input = document.getElementsByTagName("input")[0];
  console.log($input);
  const inputValue = $input.value;
  //이 값을 서버로 보내
  console.log(inputValue);
}

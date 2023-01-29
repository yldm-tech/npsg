#!/usr/bin/env bash
GITHUB_REPOSITORY=${1}
GITHUB_PAT=${2}
CURRENT_REF=${3}
RESULT_FILE_PATH=${4}

set -e

LATEST_TAG=$(curl -s -H "Authorization: token ${GITHUB_PAT}" \
  https://api.github.com/repos/${GITHUB_REPOSITORY}/releases/latest | jq -r .tag_name)
if [ "${LATEST_TAG}" == "null" ]; then
  LATEST_TAG=$(git rev-list --max-parents=0 HEAD)
fi

tmpfile=$(mktemp); cp -f ${tmpfile} ${RESULT_FILE_PATH};
curl -s \
  -H "Authorization: token ${GITHUB_PAT}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${GITHUB_REPOSITORY}/compare/${LATEST_TAG}...${CURRENT_REF}" \
  | jq '[.commits[] | {sha: .sha, message: .commit.message}]' \
  > ${tmpfile}

JSON=$(cat ${tmpfile}); rm -f ${tmpfile}
LENGTH=$(echo ${JSON} | jq length)
echo -e -n "## Changelog\n\n" >> ${RESULT_FILE_PATH}

i=0
while :; do
  MESSAGE=$(echo ${JSON} | jq -r ".[$i] | .message" | sed -n -e 1p)
  if [[ "${MESSAGE}" != Bump\ * ]]; then
    SHA=$(echo ${JSON} | jq -r ".[$i] | .sha")
    echo "${SHA} ${MESSAGE}" >> ${RESULT_FILE_PATH}
  fi
  i=$(expr ${i} + 1)
  if [ ${i} -ge ${LENGTH} ]; then break; fi
done
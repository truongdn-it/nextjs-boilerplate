#!/usr/bin/env bash
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex='^((feat|feedback|hotfix|revert|reset|force|refactor|fix)\/[a-zA-Z0-9\-]+)$'

message="Branch name invalidate, regex: $valid_branch_regex"

if ! echo "$local_branch_name" | grep -Eq "$valid_branch_regex"; then
    echo "$message"
    exit 1
fi

exit 0

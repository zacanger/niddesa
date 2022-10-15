#!/usr/bin/env bash
set -e
word=his
# his
# he
# man
# him
ag -c "\b$word\b" book

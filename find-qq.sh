#!/bin/sh

# Finds remaining occurrences of '??' and displays matching files sorted
# by the amount of occurrences

ag -Q '??' book --count | sort --field-separator=: -g  -k2

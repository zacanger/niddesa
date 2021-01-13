See the comments in the script for configuration. Call it with `./translate.py
path/to/directory` where the directory has a bunch of markdown files in the
language you want to translate.

## Google

This is using a service account json key for authentication. Create a service
account, download the json, put it somewhere, and run this before trying the
script: `export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json`.

## Amazon

Depend on having the AWS CLI configured with credentials.

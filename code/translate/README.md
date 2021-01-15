This script translates a directory of files using either Amazon or Google. There
are some variables in the script that need to be changed before running. See the
comments in the script. You will need AWS CLI and/or Google CLI (or a service
account) set up. See Google and Amazon's docs on how to do that.

Once configured, Call it with `./translate.py path/to/directory` where the
directory has a bunch of markdown files in the language you want to translate.
This will produce new files in that directory that can then be moved, renamed,
and eventually cleaned up and organized into readable text.

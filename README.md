# niddesa

Attempting an English language translation.

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

## About

There has never been a complete English language translation of [the
Niddesa](https://en.wikipedia.org/wiki/Niddesa). After asking on Stack Exchange,
I got [an answer](https://buddhism.stackexchange.com/a/43712/19522) that pointed
me to a Sinhala translation, which I figured I could use to automate an English
translation. I then also found a complete Chinese translation and did the same
thing with that.

It will take work and time to clean up the generated translations
and make them readable. In the future I may try to learn Pali and do a fresh
translation from the source (see those files in this repo, or the Pali Text
Society's Romanizations on the Internet Archive).

### The Text

The auto-generated translations were done using Google and Amazon's translation
services. The Yandex and IBM Watson translations were terrible, not worth trying
to use.

If you find a problem or want to help, please feel free to
[submit an issue](https://github.com/zacanger/niddesa/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).
The bulk of the open work now is in taking the two generated translations and
trying to get one decent translation out of them.

Files in text/ are named `nn-file-source.md`. Example:

* `01-sinhala.md` is the Sinhala source in plain text
* `01-pali.md` is the Pali source in plain text
* `01-sinhala-google.md` is from Google Cloud Translate from Sinhala to English

Etc.

### The Code

To try the translation code for yourself, see the notes in code/translate.

To build assets, run `make`. The build is based on code from
[this project](https://github.com/wikiti/pandoc-book-template)
used under the MIT license. You will need various dependencies: make, pandoc, a
LaTeX setup including xetex (mactex or texlive-xetex, depending on your
platform), as well as Noto fonts (for the moment, this may change).

## Licensing

For code in this repo, see code/LICENSE.md.
For the output text, see the license in the introduction file.
For credits and other licenses on the source material, see the notes in the
introduction file.

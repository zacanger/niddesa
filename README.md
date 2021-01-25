# Niddesa

[Read Online](https://zacanger.com/niddesa/assets/niddesa.html) &middot;
[PDF](https://zacanger.com/niddesa/assets/niddesa.pdf) &middot;
[EPUB](https://zacanger.com/niddesa/assets/niddesa.epub) &middot;
[Repository](https://github.com/zacanger/niddesa)

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger)
[![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger)
[![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

I recommend reading the PDF version, as the HTML is quite large, and the EPUB
currently has some issues. For previous versions, you can check out the assets
at a Git tag.

## About

See ./book/00-introduction.md.

### The Text

The auto-generated translations were done using Google and Amazon's translation
services. The Yandex and IBM Watson translations were terrible, not worth trying
to use.

./book contains the contents. If you find a problem or want to help, please feel
free to [submit an
issue](https://github.com/zacanger/niddesa/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).
See ./TODO.md for current tasks. ./pali is for reference.

### The Code

To try the translation code for yourself, see
[this repo](https://github.com/zacanger/translate-batches)

To build assets, run `make`. You will need various dependencies: make, pandoc, a
LaTeX setup including xetex (mactex or texlive-xetex, depending on your
platform), as well as the Cardo font.

To make a new release, run `make release-major` or `make release-minor`, then
`git push --follow-tags`. Patch changes should not result in new releases.

## Licensing

For code in this repo, see LICENSE.md.
For the output text, credits and other licenses on the source material, see the
notes in the introduction file.

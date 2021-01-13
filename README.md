# niddesa

Attempting an English language translation.

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

I don't know Pali or Sinhala, so I'm attempting to do this semi-automated (see
the code in the scripts directory). Learning Pali might be useful in the future
to do a fresh full translation, but it's not a priority for me right now.

Google, Yandex, IBM Watson, and Amazon all have Sinahala to English translation.
Of those, Yandex and Watson's results are garbage. Google's seem to
halfway-usable.  Microsoft and the others don't have
Sinhala. None of them have Pali. Amazon's is worse than Google's, but might
still be helpful for areas where Google's translation gets weird. Spot-checking
can be done [here](https://ai-service-demos.go-aws.com/translate) without
needing to create an AWS account.

See other READMEs in the repo for more notes.

## TODO:

* [x] Get the A. P. de Zoysa Sinhala translation from Sutta Central html
* [x] Convert that to Markdown for easier processing
* [x] Get automated translation with Google Translate
* [ ] Do the same with Amazon?
* [ ] Clean up the auto translation(s)

Possibly in the future, try the same process but starting with the Pali. There
don't seem to be any good Pali->English APIs out there right now.

## Licensing

For any code that ends up here, see LICENSE-code.md. For the output text, see
LICENSE-text.md.

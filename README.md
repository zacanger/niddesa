# Niddesa

[Read Online](https://zacanger.com/niddesa/assets/niddesa.html) &middot;
[PDF](https://zacanger.com/niddesa/assets/niddesa.pdf) &middot;
[EPUB](https://zacanger.com/niddesa/assets/niddesa.epub) &middot;
[Repository](https://github.com/zacanger/niddesa)

I recommend downloading the PDF or EPUB files, as the HTML is quite large and
may bog down your browser.

## About

See ./book/00-introduction.md in the repo.

### The Text

The auto-generated translations were done using Google and Amazon's translation
services. The Yandex and IBM Watson translations were terrible, not worth trying
to use.

The ./book directory in the repo contains the contents. If you find a problem or
want to help, please feel free to [submit an
issue](https://github.com/zacanger/niddesa/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).

### The Code

The initial translation code is in [this
repo](https://github.com/zacanger/translate-batches). To build the book, run
`./build.sh`. You will need Docker.

To release a new edition, update the introduction and create a tag along with a
versioning commit. Example:

```
git commit --allow-empty -am v2 && \
  git tag -m v2 -a v2 && \
  git push origin master --follow-tags
```

### TODO (v3?)

* Redistribute to tipitika wikia
* Compare with the Paramatthajotikā
* Compare with Thai editions

## Licensing

For code in this repo, see LICENSE.md.
For the output text, credits and other licenses on the source material, see the
notes in the introduction file.

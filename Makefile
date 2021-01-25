# Build configuration
BUILD = assets
MAKEFILE = Makefile
OUTPUT_FILENAME = niddesa
METADATA = metadata.yml
CHAPTERS = book/*.md book/mnd/*.md book/cnd/*.md
TOC = --toc --toc-depth 4
METADATA_ARGS = --metadata-file $(METADATA)
TEMPLATES = $(shell find templates/ -type f)
PAGEBREAK = -L templates/pagebreak.lua
# COVER_IMAGE = cover.jpg

# Chapters content
CONTENT = awk 'FNR==1 && NR!=1 {print "\n\n"}{print}' $(CHAPTERS)

# Debugging
# DEBUG_ARGS = --verbose

# Combined arguments
ARGS = $(PAGEBREAK) $(TOC) $(METADATA_ARGS) $(FILTER_ARGS) $(DEBUG_ARGS)

PANDOC_COMMAND = pandoc

# Per-format options
EPUB_ARGS = --template templates/epub.html # --epub-cover-image $(COVER_IMAGE)
HTML_ARGS = --template templates/html.html --standalone --to html5
PDF_ARGS = --template templates/pdf.latex --pdf-engine xelatex -V geometry:margin=1.25in

# Per-format file dependencies
BASE_DEPENDENCIES = $(MAKEFILE) $(CHAPTERS) $(METADATA) $(TEMPLATES)
EPUB_DEPENDENCIES = $(BASE_DEPENDENCIES)
HTML_DEPENDENCIES = $(BASE_DEPENDENCIES)
PDF_DEPENDENCIES = $(BASE_DEPENDENCIES)

# Basic targets
all:	book site
book:	epub html pdf
clean:
	rm -rf $(BUILD)
	rm -f index.html

site:
	pandoc -f gfm README.md -s -t html5 --template=templates/index.html -o index.html

# Builders
epub:	$(BUILD)/$(OUTPUT_FILENAME).epub
html:	$(BUILD)/$(OUTPUT_FILENAME).html
pdf:	$(BUILD)/$(OUTPUT_FILENAME).pdf

$(BUILD)/$(OUTPUT_FILENAME).epub:	$(EPUB_DEPENDENCIES)
	mkdir -p $(BUILD)
	$(CONTENT) | $(PANDOC_COMMAND) $(ARGS) $(EPUB_ARGS) -o $@
	@echo "$@ was built"

$(BUILD)/$(OUTPUT_FILENAME).html:	$(HTML_DEPENDENCIES)
	mkdir -p $(BUILD)
	$(CONTENT) | $(PANDOC_COMMAND) $(ARGS) $(HTML_ARGS) -o $@
	@echo "$@ was built"

$(BUILD)/$(OUTPUT_FILENAME).pdf:	$(PDF_DEPENDENCIES)
	mkdir -p $(BUILD)
	$(CONTENT) | $(PANDOC_COMMAND) $(ARGS) $(PDF_ARGS) -o $@
	@echo "$@ was built"

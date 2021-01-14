# Build configuration
BUILD = build
MAKEFILE = Makefile
OUTPUT_FILENAME = niddesa
METADATA = metadata.yml
CHAPTERS = text/*.md text/mahaniddesa/*.md text/cullaniddesa/*.md
TOC = --toc --toc-depth 2
METADATA_ARGS = --metadata-file $(METADATA)
TEMPLATES = $(shell find templates/ -type f)
COVER_IMAGE = cover.jpg
MATH_FORMULAS = --webtex

# Chapters content
CONTENT = awk 'FNR==1 && NR!=1 {print "\n\n"}{print}' $(CHAPTERS)
# Use this to add sed filters or other piped commands to transform content at
# build time
CONTENT_FILTERS = tee

# Debugging
# DEBUG_ARGS = --verbose

# Combined arguments
ARGS = $(TOC) $(MATH_FORMULAS) $(METADATA_ARGS) $(FILTER_ARGS) $(DEBUG_ARGS)

PANDOC_COMMAND = pandoc

# Per-format options
EPUB_ARGS = --template templates/epub.html --epub-cover-image $(COVER_IMAGE)
HTML_ARGS = --template templates/html.html --standalone --to html5
PDF_ARGS = --template templates/pdf.latex --pdf-engine xelatex

# Per-format file dependencies
BASE_DEPENDENCIES = $(MAKEFILE) $(CHAPTERS) $(METADATA) $(TEMPLATES)
EPUB_DEPENDENCIES = $(BASE_DEPENDENCIES)
HTML_DEPENDENCIES = $(BASE_DEPENDENCIES)
PDF_DEPENDENCIES = $(BASE_DEPENDENCIES)

# Basic targets
all:	book
book:	epub html pdf
clean:
	rm -rf $(BUILD)

# Builders
epub:	$(BUILD)/$(OUTPUT_FILENAME).epub
html:	$(BUILD)/$(OUTPUT_FILENAME).html
pdf:	$(BUILD)/$(OUTPUT_FILENAME).pdf

$(BUILD)/$(OUTPUT_FILENAME).epub:	$(EPUB_DEPENDENCIES)
	mkdir -p $(BUILD)
	$(CONTENT) | $(CONTENT_FILTERS) | $(PANDOC_COMMAND) $(ARGS) $(EPUB_ARGS) -o $@
	@echo "$@ was built"

$(BUILD)/$(OUTPUT_FILENAME).html:	$(HTML_DEPENDENCIES)
	mkdir -p $(BUILD)
	$(CONTENT) | $(CONTENT_FILTERS) | $(PANDOC_COMMAND) $(ARGS) $(HTML_ARGS) -o $@
	@echo "$@ was built"

$(BUILD)/$(OUTPUT_FILENAME).pdf:	$(PDF_DEPENDENCIES)
	mkdir -p $(BUILD)
	$(CONTENT) | $(CONTENT_FILTERS) | $(PANDOC_COMMAND) $(ARGS) $(PDF_ARGS) -o $@
	@echo "$@ was built"

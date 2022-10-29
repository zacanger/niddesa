in bilara-data repo, put in:
translation/n/anger/sutta/kn/{mnd,cnd}

for cnd and mnd
for each file
create {mnd,cnd}chapter_translation-en-anger.json
    example: cnd9_transation-en-anger.json
structure example:
{
    // metadata
    cnd9:0.1: Culaniddesa
    cnd9:0.2: commentary section (parayana vagga niddessa, etc)
    cnd9:0.3: further section if exists (like pucchāniddesa)
    cnd9:0.4: chapter number and title (like 6: questions of upsiva)

    // text
    cnd9:1.1: first line of the first verse of the quote
    cnd9:1.2: second line of the quote // etc.

    cnd9:2.1: first line of the explanation
    // etc.
}

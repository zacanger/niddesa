#!/usr/bin/env python3

import os
import sys
from google.cloud import translate

# my project id, change this if you use your own
project_id = "micro-autumn-301618"
location = "global"
dir_to_translate = sys.argv[1]
files_to_translate = os.listdir(dir_to_translate)


def translate_text(text):
    client = translate.TranslationServiceClient()
    parent = f"projects/{project_id}/locations/{location}"
    response = client.translate_text(
        request={
            "parent": parent,
            "contents": [text],
            "mime_type": "text/plain",
            "source_language_code": "si",  # sinhala
            "target_language_code": "en-US",
        }
    )

    tr = []
    for translation in response.translations:
        tr.append(translation)
    return "\n".join(tr)


# Limit of 5k code points per request
def chunk_file(text):
    n = 2000
    return [text[i:i+n] for i in range(0, len(text), n)]


def write_translated_file(text, path):
    with open(path + "en.md", "w") as dst:
        dst.write(text)
        d.close()


def translate_file(file_name):
    full_path = dir_to_translate + "/" + file_name
    with open(full_path) as source_file:
        source = source_file.read()
        splits = chunk_file(source)
        tr = []
        for s in splits:
            tr = translate_text(s)
        write_translated_file("\n".join(tr), full_path)


def main():
    for file in files_to_translate:
        translate_file(file)


if __name__ == "__main__":
    main()

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
        print("chunk")
        tr.append(translation.translated_text)
    return "".join(tr)


# Limit of 5k code points per request
def chunk_file(text):
    n = 2000
    chunks = [text[i:i+n] for i in range(0, len(text), n)]
    print(len(chunks))
    return chunks


def write_translated_file(text, path):
    with open(path + ".en.md", "w") as dst:
        dst.write(text)
        dst.close()
        return


def translate_file(file_name):
    full_path = dir_to_translate + "/" + file_name
    with open(full_path) as source_file:
        source = source_file.read()
        splits = chunk_file(source)
        tr = []
        for s in splits:
            tr.append(translate_text(s))
        return write_translated_file("".join(tr), full_path)


def main():
    for file in files_to_translate:
        print("translating " + file)
        translate_file(file)


if __name__ == "__main__":
    main()

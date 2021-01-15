#!/usr/bin/env python3

import os
import sys

SERVICE_TO_USE = "amazon"  # or amazon
LANGUAGE_FROM = "zh-TW"  # sinhala == si, zh-TW == traditional chinese

dir_to_translate = sys.argv[1]
files_to_translate = os.listdir(dir_to_translate)


def amazon_translate_text(text):
    import boto3
    from botocore.config import Config

    # this gets rate limited almost immediately,
    # so add in a bunch of retry attempts
    config = Config(retries=dict(max_attempts=20))

    # add your settings
    region = "us-east-1"

    translate = boto3.client(
        service_name="translate",
        region_name=region,
        use_ssl=True,
        config=config,
    )

    result = translate.translate_text(
        Text=text, SourceLanguageCode=LANGUAGE_FROM, TargetLanguageCode="en"
    )

    return result.get("TranslatedText")


def google_translate_text(text):
    from google.cloud import translate

    # fill in project id from google cloud console
    project_id = "translation-301721"
    location = "global"

    client = translate.TranslationServiceClient()
    parent = f"projects/{project_id}/locations/{location}"
    response = client.translate_text(
        request={
            "parent": parent,
            "contents": [text],
            "mime_type": "text/plain",
            "source_language_code": LANGUAGE_FROM,
            "target_language_code": "en-US",
        }
    )

    tr = []
    for translation in response.translations:
        tr.append(translation.translated_text)
    return "".join(tr)


# chunk files to avoid hitting limites. google says "5000 code points", amazon
# says "5000 bytes". 1500 characters seems to be low enough to not freak amazon
# out.
def chunk_file(text):
    n = 1500
    chunks = [text[i : i + n] for i in range(0, len(text), n)]
    print(len(chunks), "chunks to process")
    return chunks


def write_translated_file(text, path):
    with open(path + SERVICE_TO_USE + ".md", "w") as dst:
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
            # TODO: amazon
            if SERVICE_TO_USE == "google":
                tr.append(google_translate_text(s))
            elif SERVICE_TO_USE == "amazon":
                tr.append(amazon_translate_text(s))
            else:
                raise ValueError("No valid service selected!")
        return write_translated_file("".join(tr), full_path)


def main():
    for file in files_to_translate:
        print("translating " + file)
        translate_file(file)


if __name__ == "__main__":
    main()

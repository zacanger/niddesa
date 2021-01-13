#!/bin/bash
for html in *; do pandoc "$html" -o "$html.md"; done

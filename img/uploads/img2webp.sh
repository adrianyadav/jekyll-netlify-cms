#!/usr/bin/env bash
ls | grep -v jpg$ | while IFS= read -r FILENAME
do
    cwebp -jpeg_like -metadata all ${FILENAME} -o ${FILENAME%.*}.webp
done
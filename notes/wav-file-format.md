---
title: WAV File format
tags:
  - Audio
---

If you ever need to output a WAV file, here's the format:

- the string "RIFF"
- file length minus 8 bytes (4 bytes)
- the string "WAVEfmt " (remember the ending whitespace!)
- the number 16 (4 bytes)
- the number 1, to represent linear quantization (2 bytes)
- the number of channels. Either 1 or 2, just to be safe (2 bytes)
- the sample rate. Standard sample rates are 44100, 88200, 96000, 192000 (4 bytes)
- the byte rate. Absolutely has to be sample rate times number of channels time bits per sample all divided by 8 (4 bytes)
- block align, which is the byte rate without the sample rate (2 bytes)
- bits per sample, which is either 8, 16, 24, 32, etc. (2 bytes)
- the string "data"
- the length of the actual data (which doesn't include the header length)

You can look at an example implementation here: https://gist.github.com/shovon/a7ac2c6f59c7c6c95c96016830b059ca

## Source

- [WAVE PCM soundfile format](http://soundfile.sapp.org/doc/WaveFormat/)

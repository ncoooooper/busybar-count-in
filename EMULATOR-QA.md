# Emulator verification

Firmware wall clock and manually selected meter and bars.

Selected a one-bar count in 3/4, started the count and watched it reach GO after three beats.

21 distinct frames were recorded on firmware 1.3.1. App io.ncoooooper.countin exited: finished; heap peak 81.7 of 128 KiB. Screenshots are in screenshots/ and the recording is in media/.

## Display capture

Firmware 1.3.1 rendered both README examples. Each square in a guide GIF is one front LED in a 16 × 16 cell. The production archive was built from the source in this repository.

## Screen transition capture

Firmware 1.3.1 rendered the display sequences in the README. The release archive also ran on a fresh emulator with rapid wheel reversals and Back during a transition. The guide uses a 14 × 14 lit area inside each 16 × 16 cell. Input sequences, frame counts and the release archive checksum are in [the capture record](media/screen-transitions.json).

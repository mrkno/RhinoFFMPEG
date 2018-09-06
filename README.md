## RhinoFFMPEG

An FFMpeg intercepter for Plex which will handoff transcoding to a [RhinoTranscoder](https://github.com/mrkno/RhinoTranscoder).

This is a heavily modified version of __UnicornTranscoder__, aimed at being a more scalable and easily deployable solution.

## Dependencies
* NodeJS with `yarn` or `npm`
* Plex Media Server

## Installation
* Clone this repository
* Run `yarn` or `npm install`
* Set your configuration in `config.json`. See `config.example.json` for options.
* Build the binary with `yarn start` or `npm start`.
* Replace the Plex binary called `Plex Transcoder` with the generated binary from the `bin` folder

# eetool

A CLI tool written in Node.js I am developing for fun.

![image](https://i.postimg.cc/ZqYW75xD/Untitled.png)

## Description

At the moment only allows you to change tabs to spaces and vice versa, randomly generating a password and reformatting images.

## Getting Started

### Dependencies

* Node.js

### Installing

* Clone git repository
* Run commands npm install and npm link in cloned repos root
* Tool is now usable anywhere through the command line 

### Usage

* eetool --help, For list of available commands
* eetool --tabs, Converts spaces to tabs in given file. eetool --tabs (file)
* eetool --spaces, Converts tabs to spaces in given file. eetool --spaces (file)
* eetool --password, Randomnly generates a password with a default length of 24. eetool --password {length} {flags}. Optional flags: -c -> Copy to clipboard, -s -> use special characters. 
* eetool --image, Reformat images, optionally also resize them. eetool --image (infile, i.e img.jpg ) (outfile, i.e img.png) {width} {height}.
* eetool --update, Check for and install updates.

## Acknowledgments

Inspiration:
* https://citw.dev/tutorial/create-your-own-cli-tool

# CourseDisplayMap
CourseDisplayMap Project for Software Engineering is designed to take a pre-made XLSx spreadsheet created by the registar and allow arbirary filtering of its content. 

It also includes a hard-coded list of General Education flags, in `flags.json`, which maps courses to flags. This list must be kept updated manually.

# 3rd Party Modules
This project uses two additional modules to get it's work done, and they are incorporated as git *submodules*. To download the ENTIRE package while cloning, please use the `--recursive` switch on git:
```
$ git clone --recursive git@github.com:meyersh/CourseDisplayMap.git
```

## TaffyDB
All data searching, querying, and filtering is done using the TaffyDB javascript database engine. Initial documentation can be found in `js/taffydb/readme.md`.

## SheetJS (js-xlsx) 
The Excel sheet handing is done using SheetJS and almost all the code is based on the example page provided under "In-Browser Demos." The SheetJS project provides a conversion that makes it easy to map a spreadsheet of the format

| HeaderA |  HeaderB  |
|---|-----|
| 1a | 2b | 
| 2a | 2b |

to the javascript object
```
[
{ 
  HeaderA: '1a',
  HeaderB; '1b'
},
{
  HeaderA: '2a',
  HeaderB: '2b'
 }
 ]
```

...which is the exact format needed to initialize a TAFFY() database instance! During processing, each row is walked and missing data is filled foward (to accomodate labs and others,) a few fields are exploded, and the flag fields are added from the flags.json data.

# Installation
This html/js app is entirely self-contained and has been fully tested on Google Chrome (and appears to work fine on IE and Firefox.) Therefore, installation may be done by simply downloading the directory and opening CourseDisplayMap.html in a browser (preferably Chrome.) 

Centralized web deployment is also possible, simply load this repositoy (and submodules) into an internet accessible place.

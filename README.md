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

# Care and Feeding
## `flags.json`
To accomodate General Education flag data filters, whose data is *not* in the spreadsheet, a JSON file catalogs all of the mappings between arbitrary flags and course department and number (so CSCI*230*001 is referred to as CSCI-230, which makes it more independent.) Flags (object 'keys') may be added or removed, they are parsed dynamically.

## Spreadsheet maintenance
Spreadsheet headers (row 1) are read dynamically, so adding, removing, or reordering headings shouldn't cause any problems. There are two *required* fields: O.TIME and COURSE, although either may be blank. They are interpreted as follows.

 - `COURSE`
 
 If it is not blank, must be of the form `DEPT*NUM*SEC` (such as `CSCI*100*001` for CSCI 100, section 001). If these are missing, DEPT, NUMBER, and SECT are `undefined`.
 
 - `O.TIME`
 
 O.TIME is expected to be blank (an overflow record, and the entire record is ignored) or a hyphen separeted field of two times, eg "9:00AM-10:00PM" and is split by '-', either devation from this format will render STARTTIME and ENDTIME undefined, as well as monkey with STARTHOUR which is used for graphical display. 
 
 ## `js/filters.js`
 Filters are a little tricky, since they are essentually building a TAFFY query "object," (more on that in the excellent TAFFYdb documentation) as it is selection from a given field is considered an OR. For example, multiple TERM filters are considered TERM-A or TERM-B and will match both. The `window.filters.generateQuery()` method ensures that all multiple-field filters are considered as an OR, also, so TERM-A + COURSE-B filters together would be TERM-A OR COURSE-B, rather than the default AND. This is an intentional design decision where either choice would have drawbacks. 
 
 Future improvements may wish to split the "add filter" button to some sort of "AND" "OR" conjunctions so allow including and excluding courses based on filters. At this time, it is 100% inclusional. (Is that a word?)

# How to use.

## install

`npm install -g` to installation.

## Use

### sfdx_apexLogIndention

`sfdx_apexLogIndention` is utility for salesforce apex log file.

```sh
$ sfdx force:apex:log:tail | sflog_indention.js
46.0 APEX_CODE,FINEST;APEX_PROFILING,INFO;CALLOUT,INFO;DB,INFO;NBA,INFO;SYSTEM,DEBUG;VALIDATION,INFO;
VISUALFORCE,INFO;WAVE,INFO;WORKFLOW,INFO
21:17:25.0 (836413)|USER_INFO|[EXTERNAL]|0052v00000U12l6|wfower@white-azalea.net|(GMT+09:00) 日本標準時 (Asia/Tokyo)|GMT+09:00
21:17:25.0 (884237)|EXECUTION_STARTED
    21:17:25.0 (909684)|CODE_UNIT_STARTED|[EXTERNAL]|01p2v00000RDw3B|TestFizzBuzz.Buzz_Test()
    21:17:25.0 (2317055)|HEAP_ALLOCATE|[79]|Bytes:3
    21:17:25.0 (2374923)|HEAP_ALLOCATE|[84]|Bytes:152
    21:17:25.0 (2393055)|HEAP_ALLOCATE|[399]|Bytes:408
    21:17:25.0 (2408807)|HEAP_ALLOCATE|[412]|Bytes:408
    21:17:25.0 (2420949)|HEAP_ALLOCATE|[520]|Bytes:48
    21:17:25.0 (2452948)|HEAP_ALLOCATE|[139]|Bytes:6
    21:17:25.0 (2470802)|HEAP_ALLOCATE|[EXTERNAL]|Bytes:17
    21:17:25.0 (2506238)|METHOD_ENTRY|[2]|01p2v00000RDw3B|TestFizzBuzz.TestFizzBuzz()
        21:17:25.0 (2517480)|STATEMENT_EXECUTE|[2]
        21:17:25.0 (2526450)|STATEMENT_EXECUTE|[2]
        21:17:25.0 (2555490)|HEAP_ALLOCATE|[52]|Bytes:5
        21:17:25.0 (2585715)|HEAP_ALLOCATE|[58]|Bytes:5
        21:17:25.0 (2595597)|HEAP_ALLOCATE|[66]|Bytes:7
        21:17:25.0 (3117308)|SYSTEM_MODE_ENTER|false
        21:17:25.0 (3140129)|HEAP_ALLOCATE|[EXTERNAL]|Bytes:5
        21:17:25.0 (3152746)|SYSTEM_MODE_EXIT|false
    21:17:25.0 (3166730)|METHOD_EXIT|[2]|TestFizzBuzz
    21:17:25.0 (3223752)|SYSTEM_MODE_ENTER|false
    21:17:25.0 (3231337)|HEAP_ALLOCATE|[22]|Bytes:5
    21:17:25.0 (3236817)|STATEMENT_EXECUTE|[15]
    21:17:25.0 (3238726)|STATEMENT_EXECUTE|[21]
    21:17:25.0 (3242244)|HEAP_ALLOCATE|[22]|Bytes:4
...
```

#!/usr/bin/env node

"use strict";
const STRING_ENFOCING = 'UTF-8';
const LINE_ENDING = '\n';
const INDENT_STR = '  ';

const INDENT_INC_SIGS = [
    'METHOD_ENTRY'          // メソッド開始
    , 'CONSTRUCTOR_ENTRY'   // コンストラクタ起動
    , 'SYSTEM_METHOD_ENTRY'
    , 'DML_BEGIN',
    , 'WF_RULE_EVAL_BEGIN'
    , 'WF_FLOW_ACTION_BEGIN'
    , 'FLOW_START_INTERVIEWS_BEGIN'
    , 'FLOW_START_INTERVIEW_BEGIN'
    , 'CODE_UNIT_STARTED'
];

const INDENT_DEC_SIGS = [
    'METHOD_EXIT'          // メソッド終了
    , 'CONSTRUCTOR_EXIT'   // コンストラクタ処理完了
    , 'SYSTEM_METHOD_EXIT'
    , 'DML_END',
    , 'WF_RULE_EVAL_END'
    , 'WF_FLOW_ACTION_END'
    , 'FLOW_START_INTERVIEWS_END'
    , 'FLOW_START_INTERVIEW_END'
    , 'CODE_UNIT_FINISHED'
];

const FORCE_ZERO_INDENTS = [
    'EXECUTION_FINISHED'
];

const COMMAND_REGEX = /\d{2}:\d{2}:\d{2}\.\d+ \(\d+\)\|([A-Z_]+).*/i;
const EOL_MSG = "EOL";

// util
// やってみるとわかるけど、pipe から取得する文字列が中途半端な箇所でスッパリ斬られている場合がちらほらあるので、
// 内部で文字列をバッファし、行単位でのみデータを返すユーティリティを作った。
class PipeStringReader {
    constructor(lineEnding) {
        this.lineEnding = lineEnding;
        this.endingLength = lineEnding.length;
        this.internalString = '';
    }

    nextLine() {
        let index = this.internalString.indexOf(this.lineEnding);
        let nextIndex = index + this.endingLength;

        if (index < 0) {
            return EOL_MSG;  // buffer end.
        }

        let result = this.internalString.substring(0, index);
        this.internalString = this.internalString.substring(nextIndex);

        return result;
    }

    addMore(text) {
        this.internalString = this.internalString + text;
    }

    pipeClear() {
        let res = this.internalString;
        this.internalString = '';
        return res;
    }
}

// execution here
let stdin = process.openStdin();
stdin.setEncoding(STRING_ENFOCING);

function calcIndention(currentIndentSize, line_str) {
    if (line_str == null || line_str == '') {
        return currentIndentSize;
    }

    let matches = line_str.match(COMMAND_REGEX);
    if (matches && matches.length > 1) {
        let targetStr = matches[1];
        if (INDENT_INC_SIGS.indexOf(targetStr) >= 0) {
            return currentIndentSize + 1;
        }
        if (INDENT_DEC_SIGS.indexOf(targetStr) >= 0) {
            return currentIndentSize == 0 ? 0 : currentIndentSize - 1;
        }
        if (FORCE_ZERO_INDENTS.indexOf(targetStr) >= 0) {
            return 0;
        }
    }
    return currentIndentSize;
}

function splitStrs(base) {
    if (base == null || base == '') return [''];
    return base.split(LINE_ENDING);
}

function indentStr(indentSize) {
    let tmp = '';
    for (let i = 0; i < indentSize; i++) {
        tmp += INDENT_STR;
    }
    return tmp;
}

var currentIndentSize = 0;
var pipeReader = new PipeStringReader(LINE_ENDING);

stdin.on('data', function (chunk) {
    pipeReader.addMore(chunk);
    let nextLine = '';
    while (true) {
        nextLine = pipeReader.nextLine();
        if (nextLine === EOL_MSG) { break; }
        let old = currentIndentSize;
        currentIndentSize = calcIndention(currentIndentSize, nextLine);

        process.stdout.write(
            indentStr(old < currentIndentSize ? old : currentIndentSize)
            + nextLine + LINE_ENDING
        );
    }
});

stdin.on('end', function() {
    process.stdout.write(
        indentStr(currentIndentSize) + pipeReader.pipeClear() + LINE_ENDING
    );
    console.log('Finished');
});

stdin.on('SIGINT', function () {
    console.log('Got a SIGINT. Goodbye cruel world');
    process.exit(0);
});

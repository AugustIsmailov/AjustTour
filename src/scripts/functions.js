// счетчик попаданий
function countRepeats(key) {
    var state = key || $.currentState;
    $.session.repeats = $.session.repeats || {};
    $.session.repeats[state] = $.session.repeats[state] ? $.session.repeats[state] + 1 : 1;
    return $.session.repeats[state];
}

// счетчик попаданий подряд
function countRepeatsInRow() {
    $.temp.entryState = $.currentState;
    if ($.session.lastEntryState === $.currentState) {
        $.session.repeatsInRow += 1;
    } else {
        $.session.repeatsInRow = 1; // число раз подряд
    }
    return $.session.repeatsInRow;
}

// для проверки любых значений в тестах
function addTestResponse(key, value) {
    if (testMode()) {
        $.response.test = $.response.test || {};
        $.response.test[key] = value;
    }
    log(key + ": " + JSON.stringify(value));
}

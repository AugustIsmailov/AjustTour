function getAnswer(key, dictionary) {
    var dict = dictionary || $Answers;
    var arr = dict[key];
    if (!arr) {
        throw new Error("COULDN'T FIND ANSWER FOR STATE: " + key);
    }
    if (!_.isArray(arr)) {
        arr = [arr];
    }
    return arr;
}

// рандомный ответ
// передается либо название элемента в словаре, либо название текущего стейта
function answerRandom(key, dictionary) {
    var state = key || _.last($.currentState.split("/"));
    var arr = getAnswer(state, dictionary);
    $reactions.answer(selectRandomArg(arr));
}

// ответ по порядку
// передается либо название элемента в словаре, либо название текущего стейта
function answerNext(key, dictionary) {
    var state = key || _.last($.currentState.split("/"));
    var arr = getAnswer(state, dictionary);

    // работа с повторами
    $.session.repeatsInfo = $.session.repeatsInfo || {};
    var index = $.session.repeatsInfo[$.currentState];
    index = _.isNumber(index) ? index + 1 : 0;
    index = index > arr.length - 1 ? 0 : index;
    $.session.repeatsInfo[$.currentState] = index;
    $reactions.answer(arr[index]);
}

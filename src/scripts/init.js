$global.CATCHALL_LIMIT = $injector.catchAllLimit;

// для счетчика попаданий подряд
bind("preProcess", function ($context) {
    $context.temp.entryState = $context.currentState;
});

bind("postProcess", function ($context) {
    $context.session.lastState = $context.currentState;
    $context.session.lastEntryState = $context.temp.entryState;
});

bind("preMatch", function ($context) {
    // для выхода из модального стейта при запуске новой сессии
    if ($context.request.query === "/start" || (!testMode() && $context.currentState === "/")) {
        $context.temp.targetState = "/Start";
    }
    // заполняем предыдущий стейт для тестов
    // без этого тест приходится начинать с предыдущего шага
    if (testMode()) {
        $context.session.lastState = $context.session.lastState || $context.currentState;
    }
});

bind("onAnyError", function ($context) {
    if (testMode()) {
        $reactions.answer($context.exception.message);
    } else {
        $reactions.answer(selectRandomArg($Answers.OnAnyError));
    }
});

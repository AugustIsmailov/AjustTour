require: requirements.sc

theme: /

# основные стейты (см пример диалога в файле test.xml)

    state: Start
        q!: $regex</?start>
        intent!: /hello
        script:
            $jsapi.startSession();
            answerNext("Hi");

    # обработка всех интентов, например, "что ты умеешь"
    state: Match
        event!: match
        a: {{$context.intent.answer}}
        go!: /AnotherQuestion

    # остались ли еще вопросы
    state: AnotherQuestion
        a: {{ selectRandomArg($Answers.AnotherQuestion) }}

        state: No
            q: ($no/{нет [больше] ~вопрос}/все (понятно/ясно))
            go!: /Bye

        state: Yes
            q: $yes
            script: answerRandom("HowCanIHelp")

    state: AreYouBot
        q: * $bot *
        intent!: /are_you_robot
        script: answerRandom("AreYouBot")

    state: CatchAll || noContext = true
        event!: noMatch
        event!: timeLimit
        event!: lengthLimit
        # q!: *
        script:
            if (countRepeats() < CATCHALL_LIMIT) {
                answerNext("CatchAll");
            } else {
                $reactions.answer("логика при превышении лимита нераспознанных реплик");
            }

    state: Bye
        intent!: /bye
        script: answerRandom("Bye")

# перевод на оператора

    state: CallOperator
        q!: * $switchToOperator *
        script:
            $response.replies = $response.replies || [];
            $response.replies.push({
                type:"switch",
                firstMessage: $session.history,
                closeChatPhrases: ["/close", "закрыть"]
            });

        state: NoOperatorsOnline
            event: noLivechatOperatorsOnline
            script: answerRandom("NoOperatorsOnline")

        state: SpeechEnd
            event: livechatFinished
            script: answerRandom("SpeechEnd")

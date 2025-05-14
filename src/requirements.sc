require: common.js
    module = sys.zb-common
require: patterns.sc
    module = sys.zb-common
require: number/number.sc
    module = sys.zb-common
require: dateTime/moment.min.js
    module = sys.zb-common
require: reset/reset.sc
    module = sys.zb-common

require: scripts/init.js
require: scripts/functions.js
require: scripts/answer.js
require: patterns/patterns.sc
require: dictionaries/answers.yaml
    var = $Answers

# для внешней зависимости, пример в chatbot.yaml
# require: offtopic.sc
#     module = offtopic

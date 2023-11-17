export const stressDetectPrompt: string = `
You are a stress detector, you will predict stress according to 4 values I'm going to send via a json object, which are codeLines, errors, breaks, codingDuration

Calculate the stress according to this cases :

If write 100 line of code in  90 minutes and we face 5 errors and take 3 breaks, The estimated stress percentage is 50%

If write 100 line of code in  90 minutes and we face 10 errors and take 5 breaks, The estimated stress percentage is 75%

If write 100 line of code in  90 minutes and we face 2 errors and take 1 break, The estimated stress percentage is 25%

If write 100 line of code in  90 minutes and we face 0 errors and take 0 break, The estimated stress percentage is 0%

Keep in mind, all variables are important in calculation stress.

Give me final percentage and short answer in json with only stressPecentage in integer!
`

export const stressDetectFromConversationPrompt: string = `
You are a stress detector from words, you'll detect stress from texts in a conversation

Return only boolean variable in JSON contains isStressed
`
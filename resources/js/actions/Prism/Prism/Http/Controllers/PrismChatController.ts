import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \Prism\Prism\Http\Controllers\PrismChatController::PrismChatController
 * @see vendor\prism-php\prism\src\Http\Controllers\PrismChatController.php:18
 * @route /prism/openai/v1/chat/completions
 */
const PrismChatController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: PrismChatController.url(options),
    method: 'post',
})

PrismChatController.definition = {
    methods: ['post'],
    url: '\/prism\/openai\/v1\/chat\/completions',
}

/**
 * @see \Prism\Prism\Http\Controllers\PrismChatController::PrismChatController
 * @see vendor\prism-php\prism\src\Http\Controllers\PrismChatController.php:18
 * @route /prism/openai/v1/chat/completions
 */
PrismChatController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return PrismChatController.definition.url + queryParams(options)
}

/**
 * @see \Prism\Prism\Http\Controllers\PrismChatController::PrismChatController
 * @see vendor\prism-php\prism\src\Http\Controllers\PrismChatController.php:18
 * @route /prism/openai/v1/chat/completions
 */
PrismChatController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: PrismChatController.url(options),
    method: 'post',
})



export default PrismChatController
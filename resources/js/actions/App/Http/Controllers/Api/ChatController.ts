import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\ChatController::chat
 * @see app\Http\Controllers\Api\ChatController.php:14
 * @route /api/chat
 */
export const chat = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: chat.url(options),
    method: 'post',
})

chat.definition = {
    methods: ['post'],
    url: '\/api\/chat',
}

/**
 * @see \App\Http\Controllers\Api\ChatController::chat
 * @see app\Http\Controllers\Api\ChatController.php:14
 * @route /api/chat
 */
chat.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return chat.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\ChatController::chat
 * @see app\Http\Controllers\Api\ChatController.php:14
 * @route /api/chat
 */
chat.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: chat.url(options),
    method: 'post',
})


const ChatController = { chat }

export default ChatController
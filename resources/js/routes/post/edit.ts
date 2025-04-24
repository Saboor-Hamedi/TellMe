import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:78
 * @route /post/{post}/edit
 */
export const edit = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/post\/{post}\/edit',
}

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:78
 * @route /post/{post}/edit
 */
edit.url = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    const parsedArgs = {
        post: typeof args.post === 'object'
            ? args.post.id
            : args.post,
    }

    return edit.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:78
 * @route /post/{post}/edit
 */
edit.get = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:78
 * @route /post/{post}/edit
 */
edit.head = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit
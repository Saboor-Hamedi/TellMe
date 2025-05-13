import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\PostController::PostVisibility
 * @see app\Http\Controllers\PostController.php:109
 * @route /post/{post}/visibility
 */
export const PostVisibility = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: PostVisibility.url(args, options),
    method: 'patch',
})

PostVisibility.definition = {
    methods: ['patch'],
    url: '\/post\/{post}\/visibility',
}

/**
 * @see \App\Http\Controllers\PostController::PostVisibility
 * @see app\Http\Controllers\PostController.php:109
 * @route /post/{post}/visibility
 */
PostVisibility.url = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return PostVisibility.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::PostVisibility
 * @see app\Http\Controllers\PostController.php:109
 * @route /post/{post}/visibility
 */
PostVisibility.patch = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: PostVisibility.url(args, options),
    method: 'patch',
})


export default PostVisibility
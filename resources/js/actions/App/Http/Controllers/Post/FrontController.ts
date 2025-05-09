import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Post\FrontController::index
 * @see app\Http\Controllers\Post\FrontController.php:18
 * @route /
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/',
}

/**
 * @see \App\Http\Controllers\Post\FrontController::index
 * @see app\Http\Controllers\Post\FrontController.php:18
 * @route /
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Post\FrontController::index
 * @see app\Http\Controllers\Post\FrontController.php:18
 * @route /
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Post\FrontController::index
 * @see app\Http\Controllers\Post\FrontController.php:18
 * @route /
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Post\FrontController::show
 * @see app\Http\Controllers\Post\FrontController.php:29
 * @route /front/{post}
 */
export const show = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/front\/{post}',
}

/**
 * @see \App\Http\Controllers\Post\FrontController::show
 * @see app\Http\Controllers\Post\FrontController.php:29
 * @route /front/{post}
 */
show.url = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Post\FrontController::show
 * @see app\Http\Controllers\Post\FrontController.php:29
 * @route /front/{post}
 */
show.get = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Post\FrontController::show
 * @see app\Http\Controllers\Post\FrontController.php:29
 * @route /front/{post}
 */
show.head = (args: { post: number | { id: number } } | [post: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


const FrontController = { index, show }

export default FrontController
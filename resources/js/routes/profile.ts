import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:11
 * @route /profile/{user}
 */
export const profile = (args: { user: string | { name: string } } | [user: string | { name: string }] | string | { name: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: profile.url(args, options),
    method: 'get',
})

profile.definition = {
    methods: ['get','head'],
    url: '\/profile\/{user}',
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:11
 * @route /profile/{user}
 */
profile.url = (args: { user: string | { name: string } } | [user: string | { name: string }] | string | { name: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'name' in args) {
        args = { user: args.name }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    const parsedArgs = {
        user: typeof args.user === 'object'
            ? args.user.name
            : args.user,
    }

    return profile.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:11
 * @route /profile/{user}
 */
profile.get = (args: { user: string | { name: string } } | [user: string | { name: string }] | string | { name: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: profile.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:11
 * @route /profile/{user}
 */
profile.head = (args: { user: string | { name: string } } | [user: string | { name: string }] | string | { name: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: profile.url(args, options),
    method: 'head',
})


export default profile
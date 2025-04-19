import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:12
 * @route /profile
 */
export const profile = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ['get','head'],
    url: '\/profile',
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:12
 * @route /profile
 */
profile.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return profile.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:12
 * @route /profile
 */
profile.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: profile.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:12
 * @route /profile
 */
profile.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: profile.url(options),
    method: 'head',
})


export default profile
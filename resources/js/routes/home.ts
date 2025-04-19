import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\Post\FrontController::home
 * @see app\Http\Controllers\Post\FrontController.php:14
 * @route /
 */
export const home = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ['get','head'],
    url: '\/',
}

/**
 * @see \App\Http\Controllers\Post\FrontController::home
 * @see app\Http\Controllers\Post\FrontController.php:14
 * @route /
 */
home.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return home.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Post\FrontController::home
 * @see app\Http\Controllers\Post\FrontController.php:14
 * @route /
 */
home.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: home.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Post\FrontController::home
 * @see app\Http\Controllers\Post\FrontController.php:14
 * @route /
 */
home.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: home.url(options),
    method: 'head',
})


export default home
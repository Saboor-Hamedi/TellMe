import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\scrape\ScrapeController::process
 * @see app\Http\Controllers\scrape\ScrapeController.php:18
 * @route /scrape/process
 */
export const process = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: process.url(options),
    method: 'post',
})

process.definition = {
    methods: ['post'],
    url: '\/scrape\/process',
}

/**
 * @see \App\Http\Controllers\scrape\ScrapeController::process
 * @see app\Http\Controllers\scrape\ScrapeController.php:18
 * @route /scrape/process
 */
process.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return process.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\scrape\ScrapeController::process
 * @see app\Http\Controllers\scrape\ScrapeController.php:18
 * @route /scrape/process
 */
process.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: process.url(options),
    method: 'post',
})


export default process
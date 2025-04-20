import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\scrape\ScrapeController::index
 * @see app\Http\Controllers\scrape\ScrapeController.php:13
 * @route /scrape
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
    url: '\/scrape',
}

/**
 * @see \App\Http\Controllers\scrape\ScrapeController::index
 * @see app\Http\Controllers\scrape\ScrapeController.php:13
 * @route /scrape
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\scrape\ScrapeController::index
 * @see app\Http\Controllers\scrape\ScrapeController.php:13
 * @route /scrape
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\scrape\ScrapeController::index
 * @see app\Http\Controllers\scrape\ScrapeController.php:13
 * @route /scrape
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


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


const ScrapeController = { index, process }

export default ScrapeController
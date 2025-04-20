import process from './process'
import { queryParams, type QueryParams } from './../../wayfinder'

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



const scrape = {
    index, 
    process,
}

export default scrape
import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \Prism\Prism\Http\Controllers\PrismModelController::PrismModelController
 * @see vendor\prism-php\prism\src\Http\Controllers\PrismModelController.php:12
 * @route /prism/openai/v1/models
 */
const PrismModelController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: PrismModelController.url(options),
    method: 'get',
})

PrismModelController.definition = {
    methods: ['get','head'],
    url: '\/prism\/openai\/v1\/models',
}

/**
 * @see \Prism\Prism\Http\Controllers\PrismModelController::PrismModelController
 * @see vendor\prism-php\prism\src\Http\Controllers\PrismModelController.php:12
 * @route /prism/openai/v1/models
 */
PrismModelController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return PrismModelController.definition.url + queryParams(options)
}

/**
 * @see \Prism\Prism\Http\Controllers\PrismModelController::PrismModelController
 * @see vendor\prism-php\prism\src\Http\Controllers\PrismModelController.php:12
 * @route /prism/openai/v1/models
 */
PrismModelController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: PrismModelController.url(options),
    method: 'get',
})

/**
 * @see \Prism\Prism\Http\Controllers\PrismModelController::PrismModelController
 * @see vendor\prism-php\prism\src\Http\Controllers\PrismModelController.php:12
 * @route /prism/openai/v1/models
 */
PrismModelController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: PrismModelController.url(options),
    method: 'head',
})



export default PrismModelController
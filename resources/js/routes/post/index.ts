import create from './create'
import store from './store'
import destroy from './destroy'
import show from './show'
import edit from './edit'
import update from './update'
import PostVisibility from './PostVisibility'
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:28
 * @route /post/index
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
    url: '\/post\/index',
}

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:28
 * @route /post/index
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:28
 * @route /post/index
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:28
 * @route /post/index
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})



const post = {
    index, 
    create, 
    store, 
    destroy, 
    show, 
    edit, 
    update, 
    PostVisibility,
}

export default post
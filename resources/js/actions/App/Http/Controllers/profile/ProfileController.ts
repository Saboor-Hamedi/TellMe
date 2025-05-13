import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:25
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
 * @see app\Http\Controllers\profile\ProfileController.php:25
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
 * @see app\Http\Controllers\profile\ProfileController.php:25
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
 * @see app\Http\Controllers\profile\ProfileController.php:25
 * @route /profile/{user}
 */
profile.head = (args: { user: string | { name: string } } | [user: string | { name: string }] | string | { name: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: profile.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\profile\ProfileController::backgroundImage
 * @see app\Http\Controllers\profile\ProfileController.php:34
 * @route /profile/backgroundImage
 */
export const backgroundImage = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: backgroundImage.url(options),
    method: 'post',
})

backgroundImage.definition = {
    methods: ['post'],
    url: '\/profile\/backgroundImage',
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::backgroundImage
 * @see app\Http\Controllers\profile\ProfileController.php:34
 * @route /profile/backgroundImage
 */
backgroundImage.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return backgroundImage.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::backgroundImage
 * @see app\Http\Controllers\profile\ProfileController.php:34
 * @route /profile/backgroundImage
 */
backgroundImage.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: backgroundImage.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\profile\ProfileController::profileImage
 * @see app\Http\Controllers\profile\ProfileController.php:48
 * @route /profile/profileImage
 */
export const profileImage = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: profileImage.url(options),
    method: 'post',
})

profileImage.definition = {
    methods: ['post'],
    url: '\/profile\/profileImage',
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::profileImage
 * @see app\Http\Controllers\profile\ProfileController.php:48
 * @route /profile/profileImage
 */
profileImage.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return profileImage.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::profileImage
 * @see app\Http\Controllers\profile\ProfileController.php:48
 * @route /profile/profileImage
 */
profileImage.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: profileImage.url(options),
    method: 'post',
})


const ProfileController = { profile, backgroundImage, profileImage }

export default ProfileController
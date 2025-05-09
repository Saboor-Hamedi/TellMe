import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\profile\ProfileController::profile
 * @see app\Http\Controllers\profile\ProfileController.php:21
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
 * @see app\Http\Controllers\profile\ProfileController.php:21
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
 * @see app\Http\Controllers\profile\ProfileController.php:21
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
 * @see app\Http\Controllers\profile\ProfileController.php:21
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
 * @see \App\Http\Controllers\profile\ProfileController::uploadBGImage
 * @see app\Http\Controllers\profile\ProfileController.php:40
 * @route /profile/uploadBGImage
 */
export const uploadBGImage = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: uploadBGImage.url(options),
    method: 'post',
})

uploadBGImage.definition = {
    methods: ['post'],
    url: '\/profile\/uploadBGImage',
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::uploadBGImage
 * @see app\Http\Controllers\profile\ProfileController.php:40
 * @route /profile/uploadBGImage
 */
uploadBGImage.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return uploadBGImage.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::uploadBGImage
 * @see app\Http\Controllers\profile\ProfileController.php:40
 * @route /profile/uploadBGImage
 */
uploadBGImage.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: uploadBGImage.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\profile\ProfileController::uploadProfilePicture
 * @see app\Http\Controllers\profile\ProfileController.php:74
 * @route /profile/uploadProfilePicture
 */
export const uploadProfilePicture = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: uploadProfilePicture.url(options),
    method: 'post',
})

uploadProfilePicture.definition = {
    methods: ['post'],
    url: '\/profile\/uploadProfilePicture',
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::uploadProfilePicture
 * @see app\Http\Controllers\profile\ProfileController.php:74
 * @route /profile/uploadProfilePicture
 */
uploadProfilePicture.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return uploadProfilePicture.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\profile\ProfileController::uploadProfilePicture
 * @see app\Http\Controllers\profile\ProfileController.php:74
 * @route /profile/uploadProfilePicture
 */
uploadProfilePicture.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: uploadProfilePicture.url(options),
    method: 'post',
})


const ProfileController = { profile, uploadBGImage, uploadProfilePicture }

export default ProfileController
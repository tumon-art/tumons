import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_PROJECT_ID!")
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_DATASET")
}

export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset:  process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2022-01-05',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
})

const bulider = imageUrlBuilder(client)

export const urlFor = (source) => bulider.image(source); 


import config from '../config'

const yourIpResponse = {
    message: {
        ip: '69.193.129.122',
    },
};

const dogImagesResponse = {
    message: [
        "https://images.dog.ceo/breeds/cattledog-australian/IMG_1042.jpg ",
        "https://images.dog.ceo/breeds/cattledog-australian/IMG_5177.jpg",
    ],
};

export default async function mockFetch(url: string) {
  switch (url) {
    case config.ipFetcher: {
      return {
        ok: true,
        status: 200,
        json: async () => yourIpResponse,
      }
    }
    // case 'https://dog.ceo/api/breed/husky/images':
    // case 'https://dog.ceo/api/breed/cattledog/images': {
    //   return {
    //     ok: true,
    //     status: 200,
    //     json: async () => dogImagesResponse,
    //   }
    // }
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}
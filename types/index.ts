export interface IStrapiImage {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    thumbnail: {
      name: string
      hash: string
      ext: string
      mime: string
      path: string
      width: number
      height: number
      size: number
      url: string
    }
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: string
  createdAt: string
  updatedAt: string
}

export interface IResponse {
  id?: number
  data: any
  error: {
    status: number
    name: string
    message: string
    details: any
  }
}

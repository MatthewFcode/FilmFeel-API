export interface Movie {
  title: string
  rating: number
  overview: string
  release_date: string
  poster?: string
  language: string
  mood: string
}

export interface PostMovie {
  title: string
  mood: string
}

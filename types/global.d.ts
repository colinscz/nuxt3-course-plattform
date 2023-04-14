export {}

declare global {
  type Maybe<T> = T | null | undefined
}

type OutlineBase = {
  title: string
  slug: string
  number: number
}

export type OutlineChapter = OutlineBase & {
  lessons: OutlineLesson[]
}

export type OutlineLesson = OutlineBase & {
  path: string
}

export type CourseMeta = {
  title: string
  chapters: OutlineChapter[]
}

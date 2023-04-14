import { CourseMeta } from '~~/types/global'

export default async () => useFetchWithCache<CourseMeta>('/api/course/meta')

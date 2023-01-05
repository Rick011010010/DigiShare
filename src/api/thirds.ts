import service from '@/utils/request'

export type Third = {
  id: number
}

export const getThird = (id: number) => service.get<Third>(`/thirds/${id}`)

export const getThirds = () => service.get<Third[]>(`/thirds`)

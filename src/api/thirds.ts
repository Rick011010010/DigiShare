import service from '@/utils/request'

export type StringOrNull = string | null | undefined

export type Third = {
  id: number
  first_name: StringOrNull
  last_name: StringOrNull
  name: StringOrNull
  email: StringOrNull
  mobile: StringOrNull
  phone: StringOrNull
  birthday: StringOrNull
  address: StringOrNull
  created_at: StringOrNull
  updated_at: StringOrNull
  company_id: StringOrNull
  source: any[]
  status: boolean
  premium: boolean
  verified: boolean
  city: object
  country_id: StringOrNull
  state_id: StringOrNull
  is_company: boolean
  lang: StringOrNull
  gender: StringOrNull
  data: DataObj
  tags: TagsType[]
  group: any[]
  platformLinks: any[]
}

export type DataObj = {
  avatar?: StringOrNull
  location?: object
  company_name?: StringOrNull
} & any

export type TagsType = {
  object: StringOrNull,
  id: StringOrNull,
  name: StringOrNull,
  slug: StringOrNull,
  type: boolean,
  order_column: number,
  created_at: StringOrNull,
  updated_at: StringOrNull,


}




export const getThird = (id: number) => service.get<Third>(`/thirds/${id}`)

export const getThirds = () => service.get<Third[]>(`/thirds`)

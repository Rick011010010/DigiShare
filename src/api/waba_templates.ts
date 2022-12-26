import service from '@/utils/request'

export type WabaTemplateComponent = {
  type: 'BODY' | 'HEADER' | 'BUTTONS' | 'FOOTER' | string
  example?: object
  buttons?: any[]
  format?: string
} & any

export type WabaTemplate = {
  id: number
  category: string
  components: WabaTemplateComponent[]
  language: string
  name: string
  rejected_reason?: string | null
  status: string
}

export const getWabaTemplate = (id: number) =>
  service.get<WabaTemplate>(`/waba_templates/${id}`)

export const getWabaTemplates = () =>
  service.get<WabaTemplate[]>(`/waba_templates`)

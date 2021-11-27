export interface User {
  user_ident: number
  group_id: string
  user_email: string
  user_id: string
  user_nickname: string
  user_realname: string
  user_gender: 0 | 1
  user_password: string
  user_salt: string
  user_createdAt: Date

  student_id: string
  student_name: string
  student_grade: number
  student_class: number
  student_number: number
  student_phone: number
  student_room: number
  student_address: string
}

export interface Code {
  userid: number
  redirecturi: string
}

export interface Token {
  id: number
}

export interface Application {
  app_id: string
  app_name: string
  app_desc: string
  app_secret: string
  app_redirect: string
  app_used_cound: number
  app_created_at: Date
  app_updated_at: Date
  app_deleted_at: Date
  app_website: string
  app_icon: string
}
export interface TaskData {
    id?: string
    title: string
    status: boolean
    description: string
}

export interface AuthTask extends TaskData {
    user_id: string
}
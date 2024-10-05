import { supabase } from "~/providers"
import type { TaskData, AuthTask } from "~/types"

async function createTask(newTaskData: AuthTask) {
    await supabase.from('tasks').insert(newTaskData)
}

async function fetchTasks(userId: string) {
    const { data } = await supabase.from('tasks').select('*').eq('user_id', userId).order('inserted_at', {ascending: false})

    return data
}

async function updateTask({id: taskId, ...newTaskData }:AuthTask ) {
    await supabase.from('tasks').update(newTaskData).eq('id', taskId)
}

async function removeTask(taskId: string) {
    await supabase.from('tasks').delete().eq('id', taskId)
}

export default {
    createTask,
    fetchTasks,
    updateTask,
    removeTask
}
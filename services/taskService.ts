import { addDoc, collection } from "firebase/firestore"
import api from "./config/api"
import { db } from "@/firebase"
import { Task } from "@/types/task"



export const taskColRef = collection(db,"task")



// Firestore

export const createTask = async (task: Task) => {
   const docRef = await addDoc(taskColRef, task);
   return docRef.id;
}

export const getAllTask = async () => {
   const res =  await api.get("/tasks")
   return res.data
}
export const addTask = async (task : any) => {
   const res = await api.post("/tasks", task)
   return res.data
}
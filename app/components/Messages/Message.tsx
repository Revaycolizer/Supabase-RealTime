"use client"

import supabase from "@/app/constants/supabase";
import { useEffect, useState } from "react"

interface Message{
    id:string;
    senderId:string;
    userId:string;
    message:string;
}

export default function Message({message}:{message:Message[]}){
    const [messages,setMessages] = useState(message)
   
    useEffect(()=>{
        
    const channel = supabase
  .channel('realtime:message')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table:'message',
    },
    (payload)=>{
    setMessages([...messages,payload.new as Message])
    }
  )
  
  .subscribe()
  return ()=>{
    supabase.removeChannel(channel)
  }
},[messages,setMessages])
  return(
    <div className="flex flex-col items-center justify-center gap-2">
        <pre>{JSON.stringify(messages,null,2)}</pre>
    </div>
  )
}
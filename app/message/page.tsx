

import { cookies } from 'next/headers'
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Message from '@/app/components/Messages/Message'
import supabase from '@/app/constants/supabase'


export default async function Messag(){
    const cookieStore = cookies()
   
    const { data } = await supabase.from('message').select()
    console.log(data)

  return(
    <div>
        <Message message={data ?? []}/>
    </div>
  )
}
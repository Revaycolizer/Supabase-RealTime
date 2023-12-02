
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_NAME } from './app/constants/cookie';
import { cookies } from 'next/headers';


function matchURL(url:string, matchURL:string){
    const regex = new RegExp(matchURL)
    return regex.test(url)
}


export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the Supabase client to be able to modify the response headers.
  const res = NextResponse.next()
  // Create authenticated Supabase Client.
 
//  if(req.nextUrl.pathname.startsWith("/api")){
//   res.headers.append("Access-Control-Allow-Origin","*")
//  }

  const token = req.cookies.get(COOKIE_NAME);
 

    if (!token) {
        if(matchURL(req.nextUrl.pathname,"/home(.*)")){
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
        }

        if(matchURL(req.nextUrl.pathname,"/aduser(.*)")){
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
        }

        if(matchURL(req.nextUrl.pathname,"/adbanner(.*)")){
          const redirectUrl = req.nextUrl.clone()
          redirectUrl.pathname = '/'
          redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
      }

      if(matchURL(req.nextUrl.pathname,"/wishlist(.*)")){
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
    }

      if(matchURL(req.nextUrl.pathname,"/adcategory(.*)")){
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
    }

          if (matchURL(req.nextUrl.pathname,"/register(.*)")) {
            return NextResponse.rewrite(new URL('/register', req.url))
          }

          if (matchURL(req.nextUrl.pathname,"/cart(.*)")) {
            return NextResponse.next()
          }

          if (matchURL(req.nextUrl.pathname,"/category(.*)")) {
            return NextResponse.next()
          }

           if (matchURL(req.nextUrl.pathname,"/adlog(.*)")) {
            return NextResponse.rewrite(new URL('/adlog', req.url))
          }
         
          if (matchURL(req.nextUrl.pathname,"/adupload(.*)")) {
            const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/adlog'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
          }

          if ( matchURL(req.nextUrl.pathname,"/(.*)")) {
            return NextResponse.next()
          }
     }
   

    


     
  
  // Check auth condition
  if (token) {

    const user = JSON.parse(token.value)
    // Get the user's role (You need to implement this based on your Supabase schema)
     // Replace 'role' with the actual field name for user roles in your Supabase table
   if(user.role === "USER"){
    // If the user is already logged in, redirect them away from login pages

    if (user.role === "USER" && matchURL(req.nextUrl.pathname,"/home(.*)")) {
        return NextResponse.next()
      }

      if (user.role === "USER" && matchURL(req.nextUrl.pathname,"/category(.*)")) {
        return NextResponse.next()
      }

      if (user.role === "USER" && matchURL(req.nextUrl.pathname,"/wishlist(.*)")) {
        return NextResponse.next()
      }

      if (user.role === "USER" && matchURL(req.nextUrl.pathname,"/cart(.*)")) {
        return NextResponse.next()
      }
     if (user.role === "USER" && matchURL(req.nextUrl.pathname,"/adupload(.*)")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/home'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
      }

      if (user.role === "USER" && matchURL(req.nextUrl.pathname,"/aduser(.*)")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/home'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
      }

  

      if (user.role === "USER" || matchURL(req.nextUrl.pathname,"/register(.*)")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/home'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
      }

      if (user.role === "USER" || matchURL(req.nextUrl.pathname,"/login(.*)")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/home'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
      }

      if (user.role === "USER" || matchURL(req.nextUrl.pathname,"/adbanner(.*)")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/home'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
      }
    
      if (user.role === "USER" || matchURL(req.nextUrl.pathname,"/adcategory(.*)")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/home'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
      }
      
      if (user.role === "USER" || matchURL(req.nextUrl.pathname,"/(.*)")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/home'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
      }


      

      if (user.role === "USER" || matchURL(req.nextUrl.pathname,"/adupload(.*)")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/home'
        redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
      }
    }

    if(user.role === "ADMIN"){

        if (user.role === "ADMIN" && matchURL(req.nextUrl.pathname,"/adupload(.*)")) {
      return NextResponse.next()
          }

          if (user.role === "ADMIN" && matchURL(req.nextUrl.pathname,"/aduser(.*)")) {
            return NextResponse.next()
                }

                if (user.role === "ADMIN" && matchURL(req.nextUrl.pathname,"/adbanner(.*)")) {
                  return NextResponse.next()
                      }
      
                      if (user.role === "ADMIN" && matchURL(req.nextUrl.pathname,"/adcategory(.*)")) {
                        return NextResponse.next()
                            }

        if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/register(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }

          if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }
    
          if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/login(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }
    
          if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/adlog(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }
    
          if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/adreg(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }

          if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/home(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }

          if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/category(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }

          if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/wishlist(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }

          if (user.role === "ADMIN" || matchURL(req.nextUrl.pathname,"/cart(.*)")) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/adupload'
            redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
          }

        
    }


   
  }

  return res
}

export const config = {
  matcher: [
    
    '/',
    '/dance/:path*',
    '/comedy/:path*',
    '/education/:path*',
    '/profile/:path*',
    '/users/:path*',
    '/home',
    '/adupload',
    '/aduser',
    '/adlog',
    '/adreg',
    '/register',
    '/login',
    '/delivery',
    '/adbanner',
    '/adcategory',
    '/wishlist',
    '/cart'
    
  ],
}

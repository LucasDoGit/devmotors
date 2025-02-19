import { redirect } from "next/navigation";

// function delay(ms: number){
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

export async function getDataHome(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects/673b8e75750f18cd0d3af4a6?pretty=true&read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata,type`, { next: { revalidate: 120 }})

        if(!res.ok){
            throw new Error("Failed to fetch data")
        }

        return res.json();
        
    } catch (error) {
        throw new Error("Failed to fetch data")
    }
}

export async function getSubMenu(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22%3A%22pages%22%7D&limit=10&skip=0&read_key=${process.env.READ_KEY}&depth=1&props=slug%2Ctitle&sort=-order`, { next: { revalidate: 120 }}
            
        )

        if(!res.ok){
            throw new Error("Failed to fetch data")
        }

        return res.json();
        
    } catch (error) {
        throw new Error("Failed to fetch data")
    }
}

export async function getItemBySlug(itemSlug: string){
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/objects`

    const queryParams = new URLSearchParams({
        query: JSON.stringify({
            slug: itemSlug
        }),
        props: 'slug,title,content,metadata',
        read_key: process.env.READ_KEY as string
    })

    const url = `${baseUrl}?${queryParams.toString()}`

    try {

        // await delay(4000)
        
        const res = await fetch(url, { next: { revalidate: 120 }})

        if(!res.ok){
            throw new Error("Failed to fetch data")
        }

        return res.json();

    } catch (error) {
        console.log(error)
        redirect("/")
    }
}
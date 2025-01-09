import { useEffect } from "react"

export function useTitle(title) {
    useEffect(() => {
        const prevTitle = document.title
        document.title = title
        return () => {
            document.title = prevTitle
        }
    })
}

export function useDesc(desc) {
    useEffect(() => {
        // const prevTitle = document.title
        const prevDesc = document.querySelector('meta[name="description"]').content;
        document.querySelector('meta[name="description"]').content = desc;
        return () => {
            document.querySelector('meta[name="description"]').content = prevDesc
        }
    })
}


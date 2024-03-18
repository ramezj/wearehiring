"use client"
export default function Page({ params }: { params: { slug: string }}) {
    return (
        <>
        Parameters : {params.slug}
        </>
    )
}
import { Suspense } from 'react';
import { PostProps } from '@/utils/post.type';
import { getItemBySlug } from '@/utils/actions/get-data'
import { Metadata } from 'next';
import { Content } from './components/content';
import { LoadingPost } from './components/loading';

export async function generateMetadata({ params: { slug } }: {
    params: { slug: string }
}): Promise<Metadata> {
    try {

        const { objects }: PostProps = await getItemBySlug(slug)
            .catch(() => {
                return {
                    title: "DevMotors - Sua oficina especialiada!",
                    description: "Oficina de carros especializada em Curitiba",
                }
            })

        return {
            title: `DevMotors - ${objects[0].title}`,
            description: `${objects[0].metadata.description.text}`,
            keywords: ["devmotors", "troca de oleo", "dev motors troca de oleo"],
            openGraph: {
                title: `DevMotors - ${objects[0].title}`,
                images: [`${objects[0].metadata.banner.url}`],
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: true,
                    noimageindex: true,
                }
            }
        }


    } catch (error) {
        return {
            title: "DevMotors - Sua oficina especialiada!",
            description: "Oficina de carros especializada em Curitiba",
        }
    }
}

export default async function Page({ params: { slug } }: {
    params: { slug: string }
}) {

    return (
        <>
            <Suspense fallback={<LoadingPost/>}>
                <Content slug={slug} />
            </Suspense>
        </>
    )
}
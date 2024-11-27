import { PostProps } from '@/utils/post.type';
import styles from './styles.module.scss'
import { getItemBySlug } from '@/utils/actions/get-data'
import { Hero } from '@/components/hero';
import { Phone } from 'lucide-react';
import { Container } from '@/components/container';
import Image from 'next/image';
import { Metadata } from 'next';

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
    const { objects }: PostProps = await getItemBySlug(slug);

    return (
        <>
            <Hero
                heading={objects[0].title}
                bannerUrl={objects[0].metadata.banner.url}
                buttonTitle={objects[0].metadata.button.title}
                buttonUrl={objects[0].metadata.button.url}
                icon={<Phone size={24} color="#FFF" />}
            />

            <Container>
                <section className={styles.about}>
                    <article className={styles.innerAbout}>
                        <h1 className={styles.title}>
                            {objects[0].metadata.description.title}
                        </h1>
                        <p>
                            {objects[0].metadata.description.text}
                        </p>

                        {objects[0].metadata.description.button_active && (
                            <a
                                href={objects[0].metadata.description.button_url as string}
                                target='_blank'
                                className={styles.link}
                            >
                                {objects[0].metadata.description.button_title}
                            </a>
                        )}
                    </article>

                    <div className={styles.bannerAbout}>
                        <Image
                            className={styles.imageAbout}
                            alt={objects[0].title}
                            quality={100}
                            priority={true}
                            fill={true}
                            src={objects[0].metadata.description.banner.url}
                            sizes='(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 50%'
                        />
                    </div>

                </section>
            </Container>
        </>
    )
}
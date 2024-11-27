import styles from './content.module.scss'
import Image from "next/image";
import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { PostProps } from '@/utils/post.type';
import { getItemBySlug } from '@/utils/actions/get-data';
import { Phone } from 'lucide-react';


export async function Content({ slug }: { slug: string }){
    const { objects }: PostProps = await getItemBySlug(slug);

    return(
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
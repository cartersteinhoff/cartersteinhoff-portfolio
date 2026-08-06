import { ArrowLink } from "@/components/arrow-link";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./about.module.css";

const description =
  "How Carter Steinhoff went from COBOL on an American Express mainframe to running an independent product design and full-stack development practice in Phoenix.";

export const metadata = createPageMetadata({
  title: "About",
  description,
  path: "/about",
  image: {
    url: "/images/phoenix-night.webp",
    width: 1672,
    height: 941,
    alt: "Phoenix city lights and the Sonoran Desert at night",
  },
});

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroGridLines} aria-hidden="true" />
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.heroStatement}>
            <h1 id="about-title" className={`display-1 ${styles.heroTitle}`}>
              From mainframes to <em>modern products.</em>
            </h1>
            <div className={styles.heroSummary}>
              <p>
                A winding route through COBOL, WordPress, a layoff, a classroom, and eventually a
                practice of my own.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.story} aria-label="Background">
        <div className={styles.shell}>
          <div className={styles.prose}>
            <p>
              I did not start on the web. I started on a mainframe, writing COBOL as an intern at
              American Express.
            </p>
            <p>
              It was not glamorous work, and that turned out to be the point. Mainframe code runs
              the parts of a business that cannot be down, on systems that were old before I got
              there and will outlive anything I have written since. You learn to read code you did
              not write, change it carefully, and respect the blast radius of a mistake. I still
              think about software that way.
            </p>
          </div>

          <div className={styles.chapter}>
            <p className={styles.chapterLabel}>Passport Health</p>
            <div className={styles.prose}>
              <h2 className={`display-4 ${styles.chapterTitle}`}>Finding the web.</h2>
              <p>
                My next job moved me onto the web, doing development in a WordPress environment. It
                was the first time I owned something people actually looked at — templates, content
                models, the small daily negotiation between what a design wants and what a CMS will
                comfortably do. I liked it immediately, and I learned the publishing side of the web
                the way you only can by maintaining a real site.
              </p>
              <p>Then I was let go.</p>
            </div>
          </div>

          <div className={styles.chapter}>
            <p className={styles.chapterLabel}>Starting over</p>
            <div className={styles.prose}>
              <h2 className={`display-4 ${styles.chapterTitle}`}>Back to being a student.</h2>
              <p>
                I enrolled in a web development bootcamp. Going back to a classroom after having had
                the job is a particular kind of humbling, but it was the right call. I had learned
                the web through one CMS; I needed the modern JavaScript foundation underneath it —
                the languages, the frameworks, and the habits that would let me build something from
                nothing rather than only maintain what already existed.
              </p>
              <p>
                From there I went to work at a friend&rsquo;s digital marketing agency. Agency work
                is a fast teacher. You see a lot of sites, a lot of clients, and a lot of deadlines,
                and you find out quickly which of your opinions survive contact with a real budget.
              </p>
            </div>
          </div>

          <div className={styles.chapter}>
            <p className={styles.chapterLabel}>Nucamp</p>
            <div className={styles.prose}>
              <h2 className={`display-4 ${styles.chapterTitle}`}>
                The other side of the classroom.
              </h2>
              <p>
                Then I ended up back at a bootcamp — this time teaching. I became a web development
                instructor at Nucamp, working with people making the same career change I had made a
                few years earlier.
              </p>
              <p>
                Teaching changed how I work more than any job before it. You cannot hand-wave in
                front of a class. If you cannot explain why one approach beats another in plain
                language, you do not understand it well enough yet, and thirty people will find the
                hole in your reasoning before you do. That pressure is why I still write things down
                the way I do: clear tradeoffs, documented decisions, and a handoff someone else can
                actually pick up.
              </p>
            </div>
          </div>

          <div className={styles.chapter}>
            <p className={styles.chapterLabel}>Going independent</p>
            <div className={styles.prose}>
              <h2 className={`display-4 ${styles.chapterTitle}`}>A student, and a first client.</h2>
              <p>
                One of my students wanted to try freelancing. So we tried it together — real
                projects, real clients, the two of us figuring out the parts of the work that no
                curriculum covers: scoping, pricing, saying no, and shipping something you are
                willing to put your name on.
              </p>
              <p>
                That became a practice. I put it on Upwork, kept taking on work, and gradually
                stopped thinking of it as a side project. Today I run it independently from{" "}
                {site.location}, designing products and building the systems behind them — the same
                two halves of the job I have been circling since the mainframe.
              </p>
            </div>
          </div>

          <div className={styles.chapter}>
            <p className={styles.chapterLabel}>Now</p>
            <div className={styles.prose}>
              <h2 className={`display-4 ${styles.chapterTitle}`}>Why the range matters.</h2>
              <p>
                The odd shape of this path is the useful part. COBOL taught me to respect systems I
                did not write. WordPress taught me what editors and content teams actually need.
                Agency work taught me to scope and finish. Teaching taught me to explain.
                Freelancing taught me to own the whole outcome.
              </p>
              <p>
                It means I can sit with a design decision and an infrastructure decision in the same
                afternoon and understand what each one costs the other. That is the work I want:
                complete products, designed and built by the same person, taken all the way into
                production.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="about-cta-title">
        <div className={`${styles.shell} ${styles.closingLayout}`}>
          <div>
            <p className="eyebrow">Working together</p>
            <h2 id="about-cta-title" className="display-3">
              Tell me what <span>you&rsquo;re making.</span>
            </h2>
          </div>
          <ArrowLink href="/contact">Start a conversation</ArrowLink>
        </div>
      </section>
    </main>
  );
}

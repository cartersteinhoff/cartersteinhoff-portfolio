import { ArrowLink } from "@/components/arrow-link";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./about.module.css";

const description =
  "How Carter Steinhoff went from COBOL on an American Express mainframe to running an independent product design and full-stack development practice in Phoenix.";

/* No `image` — the route's own opengraph-image.tsx supplies the card. */
export const metadata = createPageMetadata({
  title: "About",
  description,
  path: "/about",
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
                Ten years from COBOL on an American Express mainframe to designing and building
                complete products, by way of a layoff, a classroom, and a studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.story} aria-label="Background">
        <div className={styles.shell}>
          <div className={styles.column}>
            <div className={styles.intro}>
              <p className={styles.chapterLabel}>American Express · 2015</p>
              <p>
                I did not start on the web. I started on a mainframe, writing COBOL as an intern at
                American Express.
              </p>
              <p>
                Eight weeks of dedicated mainframe training, then four months on a team writing
                COBOL for high-volume transaction programs. It was not glamorous, and that turned
                out to be the point. Mainframe code runs the parts of a business that cannot be
                down, on systems that were old before I got there and will outlive anything I have
                written since. You learn to read code you did not write, change it carefully, and
                respect the blast radius of a mistake. I still think about software that way. They
                offered me a job as a junior mainframe engineer when it ended. I took a position
                elsewhere.
              </p>
            </div>

            <div className={styles.chapter}>
              <p className={styles.chapterLabel}>Passport Health · 2016–2017</p>
              <h2 className={`display-4 ${styles.chapterTitle}`}>Finding the web.</h2>
              <p>
                That position put me on the web as a front-end developer, working in WordPress. I
                built page templates used across 250 clinics and the central site, and picked up the
                unglamorous half of the job along the way: content models, local and organic SEO,
                analytics, and the small daily negotiation between what a design wants and what a
                CMS will comfortably do. I liked it immediately, and I learned the publishing side
                of the web the way you only can by maintaining a real site.
              </p>
              <p>Then I was let go.</p>
            </div>

            <div className={styles.chapter}>
              <p className={styles.chapterLabel}>Starting over · 2017–2019</p>
              <h2 className={`display-4 ${styles.chapterTitle}`}>Back to being a student.</h2>
              <p>
                I enrolled in a web development bootcamp. Going back to a classroom after having had
                the job is a particular kind of humbling, but it was the right call. I had learned
                the web through one CMS; I needed the modern JavaScript foundation underneath it:
                the languages, the frameworks, and the habits that would let me build something from
                nothing rather than only maintain what already existed.
              </p>
              <p>
                From there I went to work at a friend&rsquo;s digital marketing agency. Agency work
                is a fast teacher. You see a lot of sites, a lot of clients, and a lot of deadlines,
                and you find out quickly which of your opinions survive contact with a real budget.
              </p>
            </div>

            <div className={styles.chapter}>
              <p className={styles.chapterLabel}>Upwork · 2019</p>
              <h2 className={`display-4 ${styles.chapterTitle}`}>Working for myself.</h2>
              <p>
                In 2019 I started freelancing, mostly through Upwork. It began as a way to keep
                building on my own terms and became the thing I was actually suited to: talking
                directly to the person who needs the work, scoping it honestly, and owning the
                outcome instead of a ticket.
              </p>
            </div>

            <div className={styles.chapter}>
              <p className={styles.chapterLabel}>Nucamp · 2020–present</p>
              <h2 className={`display-4 ${styles.chapterTitle}`}>
                The other side of the classroom.
              </h2>
              <p>
                In 2020 I ended up back at a bootcamp, this time teaching. I have been an instructor
                at Nucamp ever since, running a weekly workshop in React, React Native, DevOps, and
                cybersecurity for people making the same career change I had made a few years
                earlier.
              </p>
              <p>
                Teaching changed how I work more than any job before it. You cannot hand-wave in
                front of a class. If you cannot explain why one approach beats another in plain
                language, you do not understand it well enough yet, and a room full of students will
                find the hole in your reasoning before you do. That pressure is why I still write
                things down the way I do: clear tradeoffs, documented decisions, and a handoff
                someone else can actually pick up.
              </p>
            </div>

            <div className={styles.chapter}>
              <p className={styles.chapterLabel}>Life Sciences Web Studio · 2023–2024</p>
              <h2 className={`display-4 ${styles.chapterTitle}`}>A student, and a partner.</h2>
              <p>
                One of my students wanted to try freelancing for real. So we built something
                together: a studio making websites for the life sciences sector, the two of us
                working through the parts no curriculum covers: pricing, scoping, saying no,
                security and compliance, and putting your name on something a client depends on.
              </p>
              <p>
                I co-owned it for a little over a year. Running a studio with someone you taught is
                a strange and clarifying experience. Every shortcut you ever demonstrated comes back
                to you as a question.
              </p>
            </div>

            <div className={styles.chapter}>
              <p className={styles.chapterLabel}>Now · {site.location}</p>
              <h2 className={`display-4 ${styles.chapterTitle}`}>Why the range matters.</h2>
              <p>
                After two years as a full-stack engineer and product designer at City Press Media, I
                am back to running my own practice, still teaching at Nucamp and taking on product
                and platform work independently.
              </p>
              <p>
                The odd shape of this path is the useful part. COBOL taught me to respect systems I
                did not write. WordPress taught me what editors and content teams actually need.
                Agency work taught me to scope and finish. Teaching taught me to explain. Running a
                studio taught me to own the whole outcome.
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

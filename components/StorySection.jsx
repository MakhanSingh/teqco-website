import Pic from './Pic';
import Em from './Em';
import { settings as s, store } from '@/lib/cms';

export default function StorySection() {
  return (
    <section className="sec story" id="story">
      <div className="wrap">
        <div>
          <span className="eyebrow">{s.about_story_eyebrow}</span>
          <h2><Em text={s.about_story_heading} /></h2>
          {s.about_story_paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <div className="stats">
            {s.about_stats.map((st, i) => <div key={i}><b>{st.a}</b><span>{st.b}</span></div>)}
          </div>
        </div>
        <figure>
          <Pic src="tools.jpg" alt="Hand tools on the Teqco store wall" sizes="(max-width:980px) 100vw, 560px" />
          <span className="chip">{store.addressShort.replace(/ NSW.*$/, '')}</span>
        </figure>
      </div>
    </section>
  );
}

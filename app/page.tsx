import { Particles } from "./particles";

export default function ComingSoonPage() {
  return (
    <main className="page">
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />
      <Particles />

      <div className="content">
        <p className="brand">The Wed Plans</p>
        <h1 className="title">
          Coming <em>soon</em>
        </h1>
        <p className="lede">
          Every ceremony, one calm plan. Your wedding, beautifully organised.
        </p>
        <span className="line" aria-hidden="true" />
      </div>
    </main>
  );
}

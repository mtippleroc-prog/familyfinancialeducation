// Foundations of Investing: a small, dependency-free single-page app.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $("#app");
const money = (n, d = 0) => (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const pct = (n, d = 1) => (n * 100).toFixed(d) + "%";
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const ext = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

$("#asof").textContent = ASOF;

// ---------- navigation ----------
const NAV = [["#/", "Home"], ...SESSIONS.map((s) => [`#/session/${s.id}`, `${s.n}. ${s.title.split(" ")[0]}`]), ["#/portfolio", "Portfolio"], ["#/companies", "Companies"], ["#/books", "Reading"]];
function renderNav() {
  const h = location.hash || "#/";
  $("#nav").innerHTML = NAV.map(([href, t]) => `<a href="${href}" class="${h === href ? "on" : ""}">${t}</a>`).join("");
}
const lt = $("#leaderToggle");
lt.checked = store.get("leader", false);
document.body.classList.toggle("leader-on", lt.checked);
lt.addEventListener("change", () => { store.set("leader", lt.checked); document.body.classList.toggle("leader-on", lt.checked); });

function route() {
  const h = location.hash || "#/";
  renderNav();
  const m = h.match(/^#\/session\/(\w+)/);
  if (m) renderSession(SESSIONS.find((s) => s.id === m[1]) || SESSIONS[0]);
  else if (h.startsWith("#/portfolio")) renderPortfolio();
  else if (h.startsWith("#/companies")) renderCompanies();
  else if (h.startsWith("#/books")) renderBooks();
  else renderHome();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);

// ---------- home ----------
function renderHome() {
  app.innerHTML = `
  <section class="hero">
    <h1>Foundations of Investing</h1>
    <p>Four 45-minute sessions for teens and young adults (ages 13 to 30) on how money grows, what can go wrong, and what you keep after tax. Work through it together: each session has big ideas, hands-on exercises and questions for the dinner table.</p>
  </section>
  <div class="grid">
    ${SESSIONS.map((s) => `<a class="card s-${s.color}" href="#/session/${s.id}">
      <div class="num">${s.n}</div><h3 style="margin-top:8px">${s.title}</h3><p class="muted">${s.subtitle}</p><span class="pill">Ages ${s.age}+</span></a>`).join("")}
  </div>
  <h2>Also in the app</h2>
  <div class="grid">
    <a class="card" href="#/portfolio"><h3>📊 Practice portfolio</h3><p class="muted">Invest a pretend $10,000, follow the rules, and see if you can beat the S&amp;P 500. Several family members can play.</p></a>
    <a class="card" href="#/companies"><h3>🏢 Companies and market links</h3><p class="muted">Live prices, investor pages and filings for companies you know, plus rates, taxes and tools.</p></a>
    <a class="card" href="#/books"><h3>📚 20-book reading list</h3><p class="muted">Ordered by age and difficulty, with page counts and reading time.</p></a>
  </div>
  <h2>How to use it</h2>
  <ul class="tight">
    <li><b>One session a week</b> works best, so the practice portfolio has time to move.</li>
    <li><b>Go in order,</b> except Session 4 (Taxes), which can come before Session 3.</li>
    <li><b>Two tracks:</b> younger or newer participants can stop at the main exercise; older ones can try the "Advanced" parts.</li>
    <li><b>Leading the session?</b> Turn on <i>Leader notes</i> at the top for the run of show, prep and watch-outs.</li>
  </ul>
  <div class="leader"><h3>Why the minimum ages</h3>
    <table><thead><tr><th>Session</th><th>Min. age</th><th>Why</th></tr></thead><tbody>
    ${SESSIONS.map((s) => `<tr><td>${s.n}. ${s.title}</td><td>${s.age}</td><td>${s.whyAge}</td></tr>`).join("")}
    </tbody></table></div>`;
}

// ---------- session page ----------
function renderSession(s) {
  const i = SESSIONS.indexOf(s);
  const prev = SESSIONS[i - 1], next = SESSIONS[i + 1];
  app.innerHTML = `<div class="s-${s.color}">
    <div class="session-head"><div class="kicker">Session ${s.n} · ages ${s.age}+ · 45 minutes</div><h1>${s.title}</h1><p class="muted" style="font-size:1.1rem">${s.subtitle}</p></div>
    <div class="hook"><b>Start here:</b> ${s.hook}</div>
    <div class="leader"><h3>Leader notes</h3>
      <p><b>Why age ${s.age}+:</b> ${s.whyAge}</p>
      <p><b>Run of show</b></p><table><tbody>${s.leader.runOfShow.map(([t, w]) => `<tr><td style="white-space:nowrap">${t}</td><td>${w}</td></tr>`).join("")}</tbody></table>
      <p><b>Prep</b></p><ul class="tight">${s.leader.prep.map((p) => `<li>${p}</li>`).join("")}</ul>
      <p><b>Watch-outs</b></p><ul class="tight">${s.leader.watchouts.map((p) => `<li>${p}</li>`).join("")}</ul>
    </div>
    <h2>By the end, you can…</h2>
    <ol class="goals">${s.goals.map((g) => `<li>${g}</li>`).join("")}</ol>
    <h2>Big ideas</h2>
    <div class="ideas">${s.ideas.map(([h, b]) => `<div class="card"><h3>${h}</h3><p>${b}</p></div>`).join("")}</div>
    ${s.extras.map((x) => `<h2>${x.title}</h2><div class="tablewrap">${x.html}</div>`).join("")}
    <h2>Try it</h2>
    ${s.exercises.map((e) => `<div class="ex" id="ex-${e}"></div>`).join("")}
    <h2>Talk about it at dinner</h2>
    <ol>${s.family.map((q) => `<li>${q}</li>`).join("")}</ol>
    <details><summary>For the family</summary><p style="margin-top:8px">${s.familyNote}</p></details>
    <h2>Watch, listen, play</h2>
    <div class="tablewrap"><table><thead><tr><th>Type</th><th>Title</th><th>Length</th><th>Why it works</th></tr></thead><tbody>
      ${s.media.map(([ty, t, len, why, url]) => `<tr><td>${ty}</td><td>${ext(url, esc(t))}</td><td>${len}</td><td>${why}</td></tr>`).join("")}
    </tbody></table></div>
    <div class="takeaway">Takeaway: ${s.takeaway}</div>
    <div class="row" style="justify-content:space-between;margin-top:24px">
      ${prev ? `<a href="#/session/${prev.id}">← Session ${prev.n}: ${prev.title}</a>` : "<span></span>"}
      ${next ? `<a href="#/session/${next.id}">Session ${next.n}: ${next.title} →</a>` : `<a href="#/portfolio">Practice portfolio →</a>`}
    </div></div>`;
  s.exercises.forEach((e) => EX[e]($(`#ex-${e}`)));
}

// ---------- exercises ----------
const EX = {};

EX.ownWhatYouUse = (el) => {
  el.innerHTML = `<h3>Own What You Use</h3>
  <p class="intro">Pick a company whose products you use. Look up its market value and yearly profit (find it on the <a href="#/companies">Companies</a> page, or search Google Finance).</p>
  <div class="row"><label class="f">Company<input id="owu-n" placeholder="e.g. Nike"></label>
  <label class="f">Market value ($ billions)<input type="number" id="owu-mv" min="0" step="any"></label>
  <label class="f">Yearly profit ($ billions)<input type="number" id="owu-p" step="any"></label></div>
  <div class="out" id="owu-o">Fill in both numbers to see the price-to-earnings (P/E) ratio.</div>
  <details><summary>What does P/E mean?</summary><p>P/E is market value divided by yearly profit. It answers: <i>if you bought the whole company at today's price, how many years of today's profit would it take to earn your money back?</i> Investors pay a higher P/E for companies they expect to grow faster. Compare two companies' P/Es and ask why.</p></details>`;
  const calc = () => {
    const mv = +$("#owu-mv", el).value, p = +$("#owu-p", el).value, n = $("#owu-n", el).value || "This company";
    const o = $("#owu-o", el);
    if (!mv || !p) return (o.textContent = "Fill in both numbers to see the price-to-earnings (P/E) ratio.");
    if (p <= 0) return (o.innerHTML = `${esc(n)} isn't profitable right now, so it has no meaningful P/E. Investors are betting on <i>future</i> profits.`);
    const pe = mv / p;
    o.innerHTML = `<span class="big">P/E ${pe.toFixed(1)}</span><br>${esc(n)}: buying the whole company would take about <b>${pe.toFixed(0)} years</b> of today's profit to earn your money back. ${pe > 30 ? "That's high: investors expect fast growth." : pe < 15 ? "That's fairly low: investors expect slow growth, or see risk." : "That's in the normal range for large companies."}`;
  };
  $$("input", el).forEach((i) => i.addEventListener("input", calc));
};

function fvMonthly(pmt, annual, months) { const r = annual / 12; return r === 0 ? pmt * months : pmt * (Math.pow(1 + r, months) - 1) / r; }
EX.compounding = (el) => {
  el.innerHTML = `<h3>The Compounding Race</h3>
  <p class="intro">Three savers each invest $100 a month at a 7% yearly return. Guess who ends up with the most at 65 before you look.</p>
  <div class="row"><label class="f">Monthly amount<input type="number" id="cr-p" value="100" min="0"></label>
  <label class="f">Yearly return (%)<input type="number" id="cr-r" value="7" min="0" max="15" step="0.5"></label></div>
  <div class="tablewrap"><table><thead><tr><th>Saver</th><th>Saves from</th><th>Total put in</th><th>Value at 65</th></tr></thead><tbody id="cr-t"></tbody></table></div>
  <details><summary>Show the punchline</summary><p>Stop-early Sam put in a fraction of Later Liam's money and still ends up with more. The first ten years do the heavy lifting.</p><p><b>Advanced:</b> the Rule of 72. Divide 72 by the yearly return to get the years it takes money to double. At 7%, that's about 10 years.</p></details>
  <h3 style="margin-top:16px">Your turn</h3>
  <div class="row"><label class="f">Start age<input type="number" id="cr-a" value="16" min="10" max="64"></label>
  <label class="f">Stop saving at age<input type="number" id="cr-s" value="65" min="11" max="65"></label></div>
  <div class="out" id="cr-o"></div>`;
  const saver = (p, r, start, stop) => { const m1 = (stop - start) * 12, v = fvMonthly(p, r, m1); return [p * m1, v * Math.pow(1 + r / 12, (65 - stop) * 12)]; };
  const calc = () => {
    const p = +$("#cr-p", el).value || 0, r = (+$("#cr-r", el).value || 0) / 100;
    const rows = [["Early Emma", 18, 65, "18 to 65"], ["Later Liam", 28, 65, "28 to 65"], ["Stop-early Sam", 18, 28, "18 to 28, then stops"]];
    $("#cr-t", el).innerHTML = rows.map(([n, a, b, l]) => { const [put, val] = saver(p, r, a, b); return `<tr><td>${n}</td><td>${l}</td><td>${money(put)}</td><td><b>${money(val)}</b></td></tr>`; }).join("");
    let a = +$("#cr-a", el).value, s = +$("#cr-s", el).value;
    if (!(a < s && s <= 65)) return ($("#cr-o", el).textContent = "Pick a start age below your stop age (65 or younger).");
    const [put, val] = saver(p, r, a, s);
    $("#cr-o", el).innerHTML = `Saving ${money(p)} a month from ${a} to ${s}: you put in <b>${money(put)}</b> and have about <span class="big">${money(val)}</span> at 65. Growth did <b>${pct(1 - put / val, 0)}</b> of the work.`;
  };
  $$("input", el).forEach((i) => i.addEventListener("input", calc)); calc();
};

EX.dice = (el) => {
  el.innerHTML = `<h3>Dice Diversification</h3>
  <p class="intro">Portfolio A owns one "stock": a single die. Portfolio B owns many: the average of several dice. Roll a few rounds and compare.</p>
  <div class="row"><label class="f">Dice in Portfolio B<select id="dd-n"><option>5</option><option selected>10</option><option>50</option></select></label>
  <button id="dd-r">Roll 1 round</button><button class="ghost" id="dd-r10">Roll 10 rounds</button><button class="ghost" id="dd-c">Reset</button></div>
  <div class="out" id="dd-o">Roll to start.</div>`;
  let A = [], B = [];
  const d = () => 1 + Math.floor(Math.random() * 6);
  const roll = () => { const n = +$("#dd-n", el).value; A.push(d()); let s = 0; for (let i = 0; i < n; i++) s += d(); B.push(s / n); };
  const show = () => {
    if (!A.length) return ($("#dd-o", el).textContent = "Roll to start.");
    const rng = (x) => `${Math.min(...x).toFixed(1)} to ${Math.max(...x).toFixed(1)}`, avg = (x) => (x.reduce((a, b) => a + b, 0) / x.length).toFixed(2);
    const bars = (x) => `<div class="bars">${x.slice(-12).map((v) => `<div style="height:${(v / 6) * 100}%"><span>${v.toFixed(1)}</span></div>`).join("")}</div>`;
    $("#dd-o", el).innerHTML = `<div class="row" style="align-items:flex-start;gap:28px"><div style="flex:1;min-width:220px"><b>A: one die</b><br>Average ${avg(A)} · range ${rng(A)}${bars(A)}</div><div style="flex:1;min-width:220px"><b>B: average of ${$("#dd-n", el).value} dice</b><br>Average ${avg(B)} · range ${rng(B)}${bars(B)}</div></div>
    <p style="margin-top:12px">${A.length >= 5 ? "Both average about 3.5, but A swings between 1 and 6 while B stays close to the middle. <b>That's why one stock is a bet and an index fund is an investment.</b>" : "Keep rolling…"}</p>`;
  };
  $("#dd-r", el).onclick = () => { roll(); show(); };
  $("#dd-r10", el).onclick = () => { for (let i = 0; i < 10; i++) roll(); show(); };
  $("#dd-c", el).onclick = () => { A = []; B = []; show(); };
  $("#dd-n", el).onchange = () => { A = []; B = []; show(); };
};

EX.lendToFriend = (el) => {
  const bs = [["Uncle Sam", "Always pays, can print money.", "Low, roughly the Treasury rate (about 4% to 5% now)."], ["Steady Sophie", "Has a job, paid back every loan.", "A few points higher than Uncle Sam."], ["Startup Steve", "Great idea, no revenue yet.", "Very high, or no bid at all."]];
  el.innerHTML = `<h3>Lend to a Friend auction</h3>
  <p class="intro">Each borrower wants $1,000 for one year. What yearly interest rate would you demand from each? (Everyone in the room can bid; the lowest bid wins the loan.)</p>
  <div class="borrowers">${bs.map(([n, d], i) => `<div class="card"><h3>${n}</h3><p class="muted">${d}</p><label class="f">Your rate (%)<input type="number" min="0" step="0.5" id="lf-${i}"></label></div>`).join("")}</div>
  <div class="row"><button id="lf-go">Reveal</button></div><div class="out" id="lf-o" hidden></div>`;
  $("#lf-go", el).onclick = () => {
    const r = bs.map((_, i) => +$(`#lf-${i}`, el).value || 0);
    const o = $("#lf-o", el); o.hidden = false;
    const flip = Math.random() < 0.5;
    o.innerHTML = `<p><b>Typical winning bids:</b></p><ul class="tight">${bs.map(([n, , t]) => `<li><b>${n}:</b> ${t}</li>`).join("")}</ul>
    <p>The gap between Uncle Sam's rate and Steve's is the <b>credit spread</b>: payment for the chance you won't be repaid.</p>
    <p><b>Advanced, coin flip for Steve:</b> ${flip ? `<span class="good">Heads, he repays!</span> You get $1,000 plus ${money(1000 * r[2] / 100)} interest.` : `<span class="bad">Tails, he pays nothing.</span> You lose $1,000.`} Lend to many Steves at ${r[2] || 0}% and about half default: on average you'd ${r[2] > 100 ? "come out ahead" : "lose money"}. That's why some lenders won't bid at all.</p>`;
  };
};

const bondPrice = (coupon, years, yld, face = 1000) => { let p = 0; for (let t = 1; t <= years; t++) p += (coupon * face) / Math.pow(1 + yld, t); return p + face / Math.pow(1 + yld, years); };
EX.seesaw = (el) => {
  el.innerHTML = `<h3>The Seesaw</h3>
  <p class="intro">You own a 10-year, $1,000 bond paying 4% ($40 a year). Now interest rates on new bonds change. Would anyone pay you $1,000 for your old bond?</p>
  <div class="row"><label class="f">Rate on new bonds: <b id="ss-l">6.0%</b><input type="range" id="ss-r" min="1" max="10" step="0.25" value="6"></label>
  <label class="f">Years left<select id="ss-y"><option>2</option><option>5</option><option selected>10</option><option>30</option></select></label></div>
  <div class="out" id="ss-o"></div>
  <details><summary>Advanced: where does the price come from?</summary><p>It's the price at which a new buyer earns the new market rate each year, counting your bond's $40 coupons and the $1,000 at the end. Try 30 years left: longer bonds swing much more.</p></details>`;
  const calc = () => {
    const r = +$("#ss-r", el).value / 100, y = +$("#ss-y", el).value; $("#ss-l", el).textContent = pct(r, 2);
    const p = bondPrice(0.04, y, r), ch = p / 1000 - 1;
    $("#ss-o", el).innerHTML = `Your bond is now worth about <span class="big">${money(p)}</span> <span class="${ch >= 0 ? "good" : "bad"}">(${ch >= 0 ? "+" : ""}${pct(ch)})</span><br>${r > 0.04 ? "Rates went <b>up</b>, so your lower-paying bond is worth <b>less</b>." : r < 0.04 ? "Rates went <b>down</b>, so your higher-paying bond is worth <b>more</b>." : "Rates didn't change, so it's still worth about $1,000."} Rates up, prices down: the seesaw.`;
  };
  $("#ss-r", el).oninput = calc; $("#ss-y", el).onchange = calc; calc();
};

EX.debtVsSavings = (el) => {
  el.innerHTML = `<h3>Debt vs. Savings</h3>
  <p class="intro">Same $2,000. In one case you owe it on a credit card for a year; in the other it sits in a savings account.</p>
  <div class="row"><label class="f">Amount<input type="number" id="ds-a" value="2000"></label><label class="f">Card rate (APR %)<input type="number" id="ds-c" value="22" step="0.5"></label><label class="f">Savings rate (%)<input type="number" id="ds-s" value="4" step="0.25"></label></div>
  <div class="out" id="ds-o"></div>
  <p class="muted">Bankrate's example: $5,000 at 20%, paying only the minimum, takes about 23 years and costs about $7,723 in interest.</p>`;
  const calc = () => {
    const a = +$("#ds-a", el).value || 0, c = (+$("#ds-c", el).value || 0) / 100, s = (+$("#ds-s", el).value || 0) / 100;
    const owe = a * (Math.pow(1 + c / 12, 12) - 1), earn = a * (Math.pow(1 + s / 12, 12) - 1);
    $("#ds-o", el).innerHTML = `Carry it on the card: you pay about <span class="bad">${money(owe)}</span> in interest.<br>Keep it in savings: you earn about <span class="good">${money(earn)}</span>.<br>The card costs you <b>${(owe / Math.max(earn, 0.01)).toFixed(1)}×</b> what savings earns. Paying off high-rate debt is the best guaranteed "return" there is. Pay the full balance every month and a card costs nothing.`;
  };
  $$("input", el).forEach((i) => i.addEventListener("input", calc)); calc();
};

EX.pizza = (el) => {
  el.innerHTML = `<h3>Buy a Pizza Shop</h3>
  <p class="intro">A pizza shop earns $200,000 a year and is for sale for $1,000,000. You'll sell it in five years. How much will you borrow? Choose before you look at the bad case.</p>
  <div class="row"><label class="f">Borrow: <b id="pz-l">$700,000</b><input type="range" id="pz-b" min="0" max="900000" step="50000" value="700000"></label>
  <label class="f">What happens<select id="pz-c"><option value="good">Good case: profit grows, sells for $1.5M</option><option value="bad">Bad case: profit falls, sells for $600K</option></select></label></div>
  <div class="out" id="pz-o"></div>
  <details><summary>The point</summary><p>This is how private equity works: borrowed money (leverage) makes good outcomes great and bad outcomes wipeouts. <b>Advanced:</b> what could the owner do to make the good case happen (raise prices, open a second location, cut waste), and what makes the bad case happen (a competitor, rising rates, a key employee leaving)?</p></details>`;
  const calc = () => {
    const D = +$("#pz-b", el).value, E = 1e6 - D, good = $("#pz-c", el).value === "good";
    $("#pz-l", el).textContent = money(D);
    const sale = good ? 1.5e6 : 6e5, left = good ? Math.max(0, D - 400000) : D, you = Math.max(0, sale - left), mult = you / E;
    const yr = mult > 0 ? Math.pow(mult, 1 / 5) - 1 : -1;
    $("#pz-o", el).innerHTML = `You put in <b>${money(E)}</b> and borrow ${money(D)}. ${good ? "Profits pay the loan down" : "Profits can't pay the loan down"}; at the sale you still owe ${money(left)}.<br>You walk away with <span class="big">${money(you)}</span>: <span class="${mult >= 1 ? "good" : "bad"}">${mult.toFixed(1)}× your money (${yr <= -1 ? "you lose everything" : (yr >= 0 ? "+" : "") + pct(yr, 0) + " a year"})</span>.`;
  };
  $("#pz-b", el).oninput = calc; $("#pz-c", el).onchange = calc; calc();
};

EX.holdOn = (el) => {
  const dd = [["Bitcoin, 2018", 84], ["Bitcoin, 2021–22", 77], ["Bitcoin, 2025–26", 47], ["S&P 500, 2007–09", 57], ["Amazon, 2000–01", 95]];
  el.innerHTML = `<h3>Could You Hold On?</h3>
  <p class="intro">How far some investments have fallen from their peak:</p>
  ${dd.map(([n, d]) => `<div style="display:flex;align-items:center;gap:10px;margin:6px 0"><span style="width:150px;font-size:.92rem">${n}</span><div style="flex:1;background:#eee;border-radius:6px;height:18px"><div style="width:${d}%;background:var(--bad);height:100%;border-radius:6px"></div></div><b style="width:48px">−${d}%</b></div>`).join("")}
  <p style="margin-top:14px"><b>You put in $1,000 and it's now worth $230. Be honest: what do you do?</b></p>
  <div class="row"><button data-c="sell">Sell</button><button data-c="hold">Hold</button><button data-c="buy">Buy more</button></div>
  <div class="out" id="ho-o" hidden></div>`;
  $$("button[data-c]", el).forEach((b) => (b.onclick = () => {
    const o = $("#ho-o", el); o.hidden = false;
    const msg = { sell: "Most people sell here, and lock in the loss.", hold: "Holding takes nerve.", buy: "Buying more takes even more nerve, and money you can afford to lose." }[b.dataset.c];
    o.innerHTML = `${msg} The people who earned bitcoin's and Amazon's long-run gains sat through drops like these, but plenty of other coins and companies never came back. <b>The lesson: size any speculative bet so a 90% loss wouldn't change your life.</b> In the practice portfolio, crypto stays at 10% or less.`;
  }));
};

EX.bingo = (el) => {
  const FL = ["Guaranteed returns", "\"Act now\"", "Someone gets paid to recruit you", "Can't explain how it makes money", "Asked to keep it secret", "Pay only in crypto or gift cards", "Suspiciously steady returns", "Online stranger turned friend", "\"Everyone is getting rich\""];
  const P = [
    ["\"My fund pays 20% a month, guaranteed. It's never had a down month. Spots close tonight.\"", [0, 1, 6]],
    ["\"My favorite streamer just launched a coin. Everyone in the Discord is getting rich, and I get a bonus if you sign up with my link.\"", [2, 3, 8]],
    ["\"My startup needs $5,000 by Friday. It's hard to explain, but trust me. Don't tell your parents yet.\"", [1, 3, 4]],
    ["\"I met her on Instagram a month ago. She showed me a trading app that makes 1% a day, every day. You fund it with Bitcoin.\"", [5, 6, 7]]
  ];
  let cur = 0, sel = new Set(), checked = false;
  const draw = () => {
    el.innerHTML = `<h3>Red-Flag Bingo</h3>
    <p class="intro">Read each pitch. Tap every red flag you hear, then check your answer. (Pitch ${cur + 1} of ${P.length})</p>
    <div class="hook">${P[cur][0]}</div>
    <div class="flags">${FL.map((f, i) => { let c = "flag small"; if (checked) c += P[cur][1].includes(i) ? (sel.has(i) ? " hit" : " miss") : sel.has(i) ? " wrong" : ""; else if (sel.has(i)) c += " sel"; return `<button class="${c}" data-i="${i}">${f}</button>`; }).join("")}</div>
    <div class="row"><button id="bg-c">${checked ? "Next pitch" : "Check"}</button></div>
    <div class="out" id="bg-o" ${checked ? "" : "hidden"}>${checked ? `Green = caught it. Red outline = missed. Pink = not really in this pitch. ${cur === 2 ? "Notice: this one is from a friend. Scams often come through people you trust." : ""}` : ""}</div>
    <p class="muted"><b>Advanced:</b> FTX was a famous, celebrity-endorsed crypto exchange that collapsed in 2022 after customer money was misused. Which red flags were hiding in plain sight?</p>`;
    $$(".flag", el).forEach((b) => (b.onclick = () => { if (checked) return; const i = +b.dataset.i; sel.has(i) ? sel.delete(i) : sel.add(i); draw(); }));
    $("#bg-c", el).onclick = () => { if (!checked) checked = true; else { cur = (cur + 1) % P.length; sel = new Set(); checked = false; } draw(); };
  };
  draw();
};

EX.ladder = (el) => {
  const KEY = ["FDIC-insured savings account", "U.S. Treasury bills", "Broad bond fund", "S&P 500 index fund", "A single stock", "Private equity or venture fund", "A meme coin"];
  let order = [...KEY].sort(() => Math.random() - 0.5), checked = false;
  const draw = () => {
    el.innerHTML = `<h3>The Risk Ladder</h3><p class="intro">Put these in order from <b>safest</b> (top) to <b>riskiest</b> (bottom), then defend your order.</p>
    <ol class="ladder" style="padding-left:20px">${order.map((x, i) => `<li class="${checked ? (KEY[i] === x ? "ok" : "no") : ""}"><span>${x}</span><button class="small ghost" data-u="${i}" ${i === 0 ? "disabled" : ""}>↑</button><button class="small ghost" data-d="${i}" ${i === order.length - 1 ? "disabled" : ""}>↓</button></li>`).join("")}</ol>
    <div class="row"><button id="rl-c">Check</button><button class="ghost" id="rl-s">Shuffle</button></div>
    <div class="out" id="rl-o" ${checked ? "" : "hidden"}>${checked ? `${order.filter((x, i) => KEY[i] === x).length} of ${KEY.length} in the usual spot. Reasonable people debate neighbors on the ladder; what matters is your reasoning. Answer key: ${KEY.join(" → ")}.` : ""}</div>`;
    $$("[data-u]", el).forEach((b) => (b.onclick = () => { const i = +b.dataset.u; [order[i - 1], order[i]] = [order[i], order[i - 1]]; checked = false; draw(); }));
    $$("[data-d]", el).forEach((b) => (b.onclick = () => { const i = +b.dataset.d; [order[i + 1], order[i]] = [order[i], order[i + 1]]; checked = false; draw(); }));
    $("#rl-c", el).onclick = () => { checked = true; draw(); };
    $("#rl-s", el).onclick = () => { order.sort(() => Math.random() - 0.5); checked = false; draw(); };
  };
  draw();
};

// 2026 federal brackets, single filer
const BRACKETS = [[12400, 0.10], [50400, 0.12], [105700, 0.22], [201775, 0.24], [256225, 0.32], [640600, 0.35], [Infinity, 0.37]];
const STD = 16100, SS_BASE = 184500;
function fedTax(taxable) { let t = 0, lo = 0, marg = 0.10; for (const [hi, r] of BRACKETS) { if (taxable > lo) { t += (Math.min(taxable, hi) - lo) * r; marg = r; } lo = hi; } return [t, taxable > 0 ? marg : 0]; }
EX.paycheck = (el) => {
  el.innerHTML = `<h3>Read a Paycheck</h3>
  <p class="intro">Type in a year's pay from a job (single filer, 2026 federal rules). Try a $6,000 summer job, then a $60,000 first salary.</p>
  <div class="row"><label class="f">Yearly wages<input type="number" id="pc-w" value="6000" min="0" step="500"></label><button class="ghost" data-v="6000">Summer job</button><button class="ghost" data-v="60000">First job</button><button class="ghost" data-v="150000">Later career</button></div>
  <div class="out" id="pc-o"></div>
  <p class="muted">Leaves out state and local tax (New York would add roughly 4% to 6% here) and any retirement contributions.</p>`;
  const calc = () => {
    const w = Math.max(0, +$("#pc-w", el).value || 0);
    const payroll = Math.min(w, SS_BASE) * 0.062 + w * 0.0145 + Math.max(0, w - 200000) * 0.009;
    const taxable = Math.max(0, w - STD), [fed, marg] = fedTax(taxable);
    const take = w - payroll - fed;
    $("#pc-o", el).innerHTML = `<table><tbody>
      <tr><td>Gross pay</td><td>${money(w)}</td></tr>
      <tr><td>Payroll tax (Social Security and Medicare, about 7.65%)</td><td>−${money(payroll)}</td></tr>
      <tr><td>Federal income tax (on ${money(taxable)} after the ${money(STD)} standard deduction)</td><td>−${money(fed)}</td></tr>
      <tr><th>Take-home before state tax</th><th>${money(take)}</th></tr></tbody></table>
      ${fed === 0 ? `<p><b>No federal income tax</b> because pay is below the standard deduction. Anything withheld comes back as a refund if you file a return. Payroll tax applies from the first dollar.</p>` : `<p><b>Marginal rate:</b> ${pct(marg, 0)} (the rate on your next dollar). <b>Average rate:</b> ${pct(fed / w)} of your pay. Being "in the ${pct(marg, 0)} bracket" doesn't mean paying ${pct(marg, 0)} on everything.</p>`}`;
  };
  $("#pc-w", el).oninput = calc;
  $$("[data-v]", el).forEach((b) => (b.onclick = () => { $("#pc-w", el).value = b.dataset.v; calc(); }));
  calc();
};

const PLACES = [["Texas or Florida", 0, "No state income tax"], ["Washington", 0, "No wage tax; its 7% capital gains tax only hits gains above a large deduction"], ["Upstate New York (e.g., Rochester)", 0.059, "About 5.9% at this income"], ["New York City", 0.09776, "State 5.9% + city 3.876%"], ["California", 0.093, "9.3% at this income"]];
EX.sameGain = (el) => {
  el.innerHTML = `<h3>Same Gain, Different Tax</h3>
  <p class="intro">A single person earning about $100,000 sells a stock for a gain. Guess the "kept" column before you look.</p>
  <div class="row"><label class="f">Gain<input type="number" id="sg-g" value="10000" step="1000" min="0"></label>
  <label class="f">Held<select id="sg-h"><option value="lt">More than 1 year (federal 15%)</option><option value="st">1 year or less (federal 22%)</option></select></label></div>
  <div class="tablewrap"><table><thead><tr><th>Where they live</th><th>Federal</th><th>State and city</th><th>Total tax</th><th>Kept</th></tr></thead><tbody id="sg-t"></tbody></table></div>
  <p class="muted">Rounded estimates for teaching, using 2026 rates. New York gives no break for long-term gains. Real bills depend on deductions, credits and other income.</p>
  <details><summary>Advanced: a $1 million gain</summary><p>Approximate top combined rates for a high earner: Florida 23.8% (20% + 3.8%), Washington about 31%, New York State about 33%, California about 37%, New York City about 37%. On one $1 million sale, the difference between Florida and New York City is roughly $135,000, which is why some families weigh where they live.</p></details>`;
  const calc = () => {
    const g = Math.max(0, +$("#sg-g", el).value || 0), fr = $("#sg-h", el).value === "lt" ? 0.15 : 0.22;
    $("#sg-t", el).innerHTML = PLACES.map(([n, r, note]) => { const f = g * fr, s = g * r; return `<tr><td>${n}<br><span class="muted">${note}</span></td><td>${money(f)}</td><td>${money(s)}</td><td>${money(f + s)}</td><td><b>${money(g - f - s)}</b></td></tr>`; }).join("");
  };
  $("#sg-g", el).oninput = calc; $("#sg-h", el).onchange = calc; calc();
};

EX.holdOrSell = (el) => {
  el.innerHTML = `<h3>Hold or Sell?</h3>
  <p class="intro">You bought a stock 11 months ago and it's up. You earn $100,000 and live in Rochester.</p>
  <div class="row"><label class="f">Gain so far<input type="number" id="hs-g" value="5000" step="500" min="0"></label></div>
  <div class="out" id="hs-o"></div>
  <details><summary>Advanced: tax-loss harvesting</summary><p>Selling a loser can offset gains, plus up to $3,000 of other income a year. The wash-sale rule disallows the loss if you buy the same investment back within 30 days.</p></details>`;
  const calc = () => {
    const g = Math.max(0, +$("#hs-g", el).value || 0), ny = g * 0.059, now = g * 0.22 + ny, later = g * 0.15 + ny;
    $("#hs-o", el).innerHTML = `<b>Sell today</b> (short-term): about ${money(now)} in tax.<br><b>Wait one more month</b> (long-term): about ${money(later)}.<br>Waiting saves <span class="good">${money(now - later)}</span>. Is that worth the risk the stock drops ${pct((now - later) / g)} or more in the next month? There's no single right answer; the point is to know the trade-off.`;
  };
  $("#hs-g", el).oninput = calc; calc();
};

// ---------- practice portfolio ----------
const TYPES = ["Stock", "Index fund", "Bond or bond fund", "Crypto", "Cash"];
function pfLoad() { return store.get("pf", { players: { Me: { start: "", spStart: "", spNow: "", rows: [] } }, cur: "Me" }); }
function pfSave(d) { store.set("pf", d); }
function renderPortfolio() {
  const D = pfLoad(); const P = D.players[D.cur];
  const val = (r) => (+r.amt && +r.buy && +r.now ? (+r.amt / +r.buy) * +r.now : +r.amt || 0);
  const total = P.rows.reduce((a, r) => a + val(r), 0), invested = P.rows.reduce((a, r) => a + (+r.amt || 0), 0), cash = 10000 - invested;
  const worth = total + cash;
  const share = (t) => P.rows.filter((r) => r.type === t).reduce((a, r) => a + (+r.amt || 0), 0) / 10000;
  const rules = [
    [P.rows.filter((r) => r.type !== "Cash").length >= 4, "At least 4 holdings"],
    [P.rows.every((r) => (+r.amt || 0) <= 3000), "No more than $3,000 (30%) in any one"],
    [P.rows.some((r) => r.type === "Index fund" && /VOO|SPY|IVV|S&P|500/i.test(r.name)), "Own an S&P 500 index fund to compare against"],
    [P.rows.some((r) => r.type === "Bond or bond fund"), "At least one bond holding (by Session 2)"],
    [share("Crypto") <= 0.1, "Crypto at 10% or less"],
    [invested <= 10000, "Don't invest more than $10,000"]
  ];
  const sp = +P.spStart && +P.spNow ? 10000 * (+P.spNow / +P.spStart) : null;
  const board = Object.entries(D.players).map(([n, p]) => { const t = p.rows.reduce((a, r) => a + val(r), 0) + (10000 - p.rows.reduce((a, r) => a + (+r.amt || 0), 0)); return [n, t]; }).sort((a, b) => b[1] - a[1]);
  app.innerHTML = `<h1>Practice portfolio</h1>
  <p>Everyone starts with a pretend <b>$10,000</b>. Pick your investments, write down each price when you "buy," and update the current prices each week (click a ticker to look it up). Can you beat a plain S&amp;P 500 index fund?</p>
  <div class="pf-players"><b>Player:</b> <select id="pf-p">${Object.keys(D.players).map((n) => `<option ${n === D.cur ? "selected" : ""}>${esc(n)}</option>`).join("")}</select>
    <button class="small ghost" id="pf-add">+ Add player</button><button class="small ghost" id="pf-ren">Rename</button>${Object.keys(D.players).length > 1 ? `<button class="small ghost" id="pf-del">Remove player</button>` : ""}</div>
  <div class="card">
  <div class="tablewrap"><table><thead><tr><th>Investment (name or ticker)</th><th>Type</th><th>$ invested</th><th>Price when bought</th><th>Price now</th><th>Value now</th><th></th></tr></thead><tbody>
  ${P.rows.map((r, i) => { const v = val(r), ch = (+r.amt ? v / +r.amt - 1 : 0); return `<tr>
    <td><input data-i="${i}" data-k="name" value="${esc(r.name || "")}" placeholder="e.g. VOO">${r.name && /^[A-Za-z.\-]{1,6}$/.test(r.name) ? `<div class="muted">${ext("https://www.google.com/finance?q=" + encodeURIComponent(r.name), "Look up price")}</div>` : ""}</td>
    <td><select data-i="${i}" data-k="type">${TYPES.map((t) => `<option ${t === r.type ? "selected" : ""}>${t}</option>`).join("")}</select></td>
    <td><input type="number" data-i="${i}" data-k="amt" value="${r.amt || ""}" min="0"></td>
    <td><input type="number" data-i="${i}" data-k="buy" value="${r.buy || ""}" step="any" min="0"></td>
    <td><input type="number" data-i="${i}" data-k="now" value="${r.now || ""}" step="any" min="0"></td>
    <td>${money(v)}<br><span class="${ch >= 0 ? "good" : "bad"}">${ch >= 0 ? "+" : ""}${pct(ch)}</span></td>
    <td><button class="small ghost" data-del="${i}">✕</button></td></tr>`; }).join("")}
  <tr><td colspan="7"><button class="small" id="pf-row">+ Add investment</button></td></tr>
  </tbody></table></div>
  <div class="row" style="gap:28px"><div><div class="muted">Uninvested cash</div><b>${money(cash)}</b></div><div><div class="muted">Portfolio worth</div><span class="big">${money(worth)}</span> <span class="${worth >= 10000 ? "good" : "bad"}">${worth >= 10000 ? "+" : ""}${pct(worth / 10000 - 1)}</span></div>
  ${sp ? `<div><div class="muted">$10,000 in the S&amp;P 500 instead</div><b>${money(sp)}</b> ${worth >= sp ? `<span class="good">You're ahead by ${money(worth - sp)}</span>` : `<span class="bad">Behind by ${money(sp - worth)}</span>`}</div>` : ""}</div>
  <div class="row"><label class="f">Start date<input type="date" id="pf-sd" value="${P.start || ""}"></label><label class="f">S&amp;P 500 level at start<input type="number" id="pf-ss" value="${P.spStart || ""}" step="any"></label><label class="f">S&amp;P 500 level now<input type="number" id="pf-sn" value="${P.spNow || ""}" step="any"></label><span class="muted">${ext("https://www.google.com/finance/quote/.INX:INDEXSP", "Today's S&P 500 level")}</span></div>
  </div>
  <h2>The rules</h2><ul class="pf-rules">${rules.map(([ok, t]) => `<li class="${ok ? "ok" : "no"}">${t}</li>`).join("")}</ul>
  <h2>Family leaderboard</h2>
  <table><thead><tr><th>#</th><th>Player</th><th>Worth</th><th>Return</th></tr></thead><tbody>${board.map(([n, t], i) => `<tr><td>${i + 1}</td><td>${esc(n)}</td><td>${money(t)}</td><td class="${t >= 10000 ? "good" : "bad"}">${pct(t / 10000 - 1)}</td></tr>`).join("")}</tbody></table>
  <details><summary>Share or back up (portfolios are saved only in this browser)</summary>
  <p style="margin-top:8px">Copy this text into an email or message to move portfolios to another device, or paste someone else's to load theirs.</p>
  <textarea id="pf-json">${esc(JSON.stringify(D))}</textarea>
  <div class="row"><button class="small" id="pf-copy">Copy</button><button class="small ghost" id="pf-load">Load pasted text</button><button class="small ghost" id="pf-reset">Start over</button></div></details>
  <p class="muted">Tip: after Session 4, figure the "tax bill" if everyone sold today. All gains would be short-term: about 22% federal plus about 5.9% New York.</p>`;
  const save = () => { pfSave(D); renderPortfolio(); };
  $$("[data-k]").forEach((inp) => inp.addEventListener("change", () => { P.rows[+inp.dataset.i][inp.dataset.k] = inp.value; save(); }));
  $$("[data-del]").forEach((b) => (b.onclick = () => { P.rows.splice(+b.dataset.del, 1); save(); }));
  $("#pf-row").onclick = () => { P.rows.push({ name: "", type: "Stock", amt: "", buy: "", now: "" }); save(); };
  $("#pf-p").onchange = (e) => { D.cur = e.target.value; save(); };
  $("#pf-add").onclick = () => { const n = (prompt("Player's name?") || "").trim(); if (n && !D.players[n]) { D.players[n] = { start: P.start, spStart: P.spStart, spNow: P.spNow, rows: [] }; D.cur = n; save(); } };
  $("#pf-ren").onclick = () => { const n = (prompt("New name?", D.cur) || "").trim(); if (n && !D.players[n]) { D.players[n] = P; delete D.players[D.cur]; D.cur = n; save(); } };
  if ($("#pf-del")) $("#pf-del").onclick = () => { if (confirm(`Remove ${D.cur}'s portfolio?`)) { delete D.players[D.cur]; D.cur = Object.keys(D.players)[0]; save(); } };
  [["#pf-sd", "start"], ["#pf-ss", "spStart"], ["#pf-sn", "spNow"]].forEach(([s, k]) => ($(s).onchange = (e) => { Object.values(D.players).forEach((p) => (p[k] = e.target.value)); save(); }));
  $("#pf-copy").onclick = () => { $("#pf-json").select(); navigator.clipboard?.writeText($("#pf-json").value); $("#pf-copy").textContent = "Copied"; };
  $("#pf-load").onclick = () => { try { const x = JSON.parse($("#pf-json").value); if (x.players && x.cur) { pfSave(x); renderPortfolio(); } else throw 0; } catch { alert("That text isn't a portfolio backup."); } };
  $("#pf-reset").onclick = () => { if (confirm("Erase all portfolios in this browser?")) { localStorage.removeItem("pf"); renderPortfolio(); } };
}

// ---------- companies ----------
let coFilter = "All";
function renderCompanies() {
  const sectors = ["All", ...new Set(COMPANIES.map((c) => c.sector))];
  const list = COMPANIES.filter((c) => coFilter === "All" || c.sector === coFilter);
  app.innerHTML = `<h1>Companies and market links</h1>
  <p>Companies you already know, with links to today's price, the company's own investor page, and its official filings with the SEC (the yearly "10-K" report is where companies explain their business and risks). Use these for <a href="#/session/stocks">Own What You Use</a> and the <a href="#/portfolio">practice portfolio</a>.</p>
  <div class="co-filter">${sectors.map((s) => `<button class="${s === coFilter ? "on" : ""}" data-s="${s}">${s}</button>`).join("")}</div>
  <div class="grid">${list.map((c) => `<div class="card co"><div class="t">${c.t} · ${c.ex}</div><h3>${c.name}</h3><p>${c.sells}</p>
    <p class="q">Ask: ${c.ask}</p>
    <div class="links">${ext(gf(c.t, c.ex), "Price")}${c.ir ? ext(c.ir, "Investor page") : ""}${ext(edgar(c.t), "SEC filings")}</div></div>`).join("")}</div>
  <p class="muted" style="margin-top:12px">Listed for learning, not as recommendations. Many well-known companies are private and have no stock to buy, which is a good discussion point.</p>
  <h2>Market, rates and tax links</h2>
  <div class="grid">${MARKET_LINKS.map(([h, ls]) => `<div class="card"><h3>${h}</h3><ul class="tight">${ls.map(([t, u]) => `<li>${ext(u, t)}</li>`).join("")}</ul></div>`).join("")}</div>`;
  $$("[data-s]").forEach((b) => (b.onclick = () => { coFilter = b.dataset.s; renderCompanies(); }));
}

// ---------- books ----------
function renderBooks() {
  app.innerHTML = `<h1>20-book reading list</h1>
  <p>Ordered from easiest to most advanced, for ages 13 to 30. Length is print pages with a rough reading time at about 40 pages an hour; most are also on audio and at public libraries (Libby, Hoopla). Ratings are Goodreads averages unless noted. Titles known for profanity have been left off.</p>
  ${BOOKS.map(([h, rows]) => `<h2>${h}</h2><div class="tablewrap"><table><thead><tr><th>#</th><th>Book</th><th>Age</th><th>Length</th><th>Rating</th><th>Why this one</th></tr></thead><tbody>
    ${rows.map(([n, t, a, age, len, r, why]) => `<tr><td>${n}</td><td>${ext(gr(t), `<i>${esc(t)}</i>`)}<br><span class="muted">${a}</span></td><td>${age}</td><td>${len}</td><td>${r}</td><td>${why}</td></tr>`).join("")}
  </tbody></table></div>`).join("")}
  <h2>By session</h2>
  <ul class="tight"><li><b>Stocks:</b> 4, 7 and 13</li><li><b>Bonds and interest:</b> 6, 10 and 12</li><li><b>Alternatives and risk:</b> 9, 16 and 17</li><li><b>Taxes:</b> 8 and 13</li></ul>`;
}

route();

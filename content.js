// All program content lives here so it is easy to update each year.
// Figures are as of November 2026 unless noted.

const ASOF = "November 2026";

const gf = (t, ex) => `https://www.google.com/finance/quote/${t}:${ex}`;
const edgar = (t) => `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${t}&owner=include&count=40`;
const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const gr = (q) => `https://www.goodreads.com/search?q=${encodeURIComponent(q)}`;

const SESSIONS = [
  {
    id: "stocks", n: 1, age: 13, color: "teal",
    title: "Stocks", subtitle: "Owning a piece of a business",
    whyAge: "Needs percentages and repeated multiplication (compounding), which most students handle by 7th or 8th grade. National financial-education standards expect students to understand investing's benefits and trade-offs by the end of 8th grade.",
    goals: [
      "Explain in one sentence what a share of stock is and why its price moves.",
      "Show with numbers why starting early beats investing more later.",
      "Explain why owning many companies (an index fund) is safer than owning one.",
      "Set up a $10,000 practice portfolio."
    ],
    hook: "If you could own 1% of any company you use, which would it be, and why?",
    ideas: [
      ["A share is a slice of a real business.", "Owning one share means you own a tiny piece of a company's stores, products and future profits. Companies sell shares to raise money to grow."],
      ["Prices follow expected profits, plus mood.", "Over years, a stock tracks how much the company earns. Over days and months, it swings with news and emotion. A stock can drop after a good quarter if people expected even better."],
      ["Compounding is growth on growth.", "Gains earn their own gains. The S&P 500 has returned about 10% a year on average since the late 1920s, dividends included. But the \"average year\" almost never happens: some years are up 20%+, others down 30%+."],
      ["Diversify and keep costs low.", "Most professional stock pickers lose to the index. In 2025, 79% of actively managed large-company U.S. funds trailed the S&P 500, and over 20 years more than 9 in 10 do. An index fund buys the whole market for a tiny fee."]
    ],
    extras: [
      {
        title: "The benchmarks: how we keep score",
        html: `<p>A benchmark index tracks a basket of stocks so investors can tell how "the market" did.</p>
<table><thead><tr><th>Index</th><th>What it holds</th><th>Level, mid-Nov. 2026</th></tr></thead><tbody>
<tr><td><a href="${gf('.INX','INDEXSP')}" target="_blank" rel="noopener">S&amp;P 500</a></td><td>About 500 of the largest U.S. companies, weighted by size. The standard yardstick.</td><td>7,416.59 (Nov. 16), up about 8% for the year</td></tr>
<tr><td><a href="${gf('.IXIC','INDEXNASDAQ')}" target="_blank" rel="noopener">Nasdaq Composite</a></td><td>Thousands of stocks listed on the Nasdaq exchange; heavy in technology.</td><td>24,328.38 (Nov. 17)</td></tr>
<tr><td><a href="${gf('.DJI','INDEXDJX')}" target="_blank" rel="noopener">Dow Jones Industrial Average</a></td><td>Just 30 large companies, weighted by share price. The oldest, but the narrowest.</td><td>50,759.42 (Nov. 17)</td></tr>
</tbody></table>
<p class="muted">Click an index for today's level.</p>`
      },
      {
        title: "What is an IPO?",
        html: `<p>An IPO (initial public offering) is the first time a private company sells shares to the public and lists on a stock exchange. Companies do it to raise money to grow, and so founders, employees and early investors can eventually sell.</p>
<ul><li><b>Then:</b> Google went public on Aug. 19, 2004 at $85 a share, raising $1.67 billion, at a value of about $23 billion. After stock splits that $85 share is roughly $2 in today's terms, and Alphabet is now worth about $3.5 trillion.</li>
<li><b>Now:</b> SpaceX went public on June 12, 2026, raising about $75 billion at a $1.77 trillion valuation, the largest IPO ever.</li>
<li><b>Talk about it:</b> IPOs get huge attention, but the day-one price already reflects the hype. Would you rather have bought Google at its IPO or an S&amp;P 500 fund? What would you have needed to know in 2004?</li></ul>`
      },
      {
        title: "Case study: Alphabet (Google)",
        html: `<p>Alphabet makes money three main ways (quarter ended Sept. 30, 2026):</p>
<ul><li><b>Google Services</b> (Search, YouTube, Android, Chrome, Play Store): $96.3 billion of revenue, up 11%. Mostly advertising: users get the products free and advertisers pay.</li>
<li><b>Google Cloud</b> (renting computing power and AI tools to businesses): $30.7 billion, up 103%.</li>
<li><b>Other Bets</b> (moonshots like self-driving cars): about $0.4 billion.</li></ul>
<table><thead><tr><th>Metric</th><th>Alphabet, Q3 2026</th><th>What it tells you</th></tr></thead><tbody>
<tr><td>Revenue</td><td>$127.6 billion, up 25%</td><td>Very fast growth for a company this big</td></tr>
<tr><td>Operating income</td><td>$40.6 billion, a 31.8% margin</td><td>Keeps about 32 cents of every sales dollar as operating profit</td></tr>
<tr><td>Net income</td><td>$26.2 billion, down from $35.0 billion</td><td>Fell because of an $8.7 billion loss on investments in other companies, not because the core business shrank</td></tr>
<tr><td>Earnings per share</td><td>$2.12 vs. about $3.01 expected</td><td>The "miss" sent the stock down after the report</td></tr>
<tr><td>Ads share of revenue</td><td>64%, down from 72.5%</td><td>Less dependent on ads than a year ago</td></tr>
</tbody></table>
<p><b>Talk about it:</b> Who is Google's actual customer, you or the advertiser? Revenue grew 25% yet the stock fell about 20% from late July to early November. Why might that happen?</p>
<p><a href="${gf('GOOGL','NASDAQ')}" target="_blank" rel="noopener">Today's GOOGL price</a> · <a href="https://abc.xyz/investor/" target="_blank" rel="noopener">Alphabet investor relations</a></p>
<p class="muted">Sources: Alphabet's Q3 2026 earnings release (Oct. 28, 2026) as reported by AP and others. Educational example only, not a recommendation.</p>`
      }
    ],
    exercises: ["ownWhatYouUse", "compounding", "dice"],
    family: [
      "What was the first investment anyone in our family made, and how did it go?",
      "Which company would you most want to own a piece of, and why?",
      "If you had $1,000 at 18, what would you do with it?"
    ],
    familyNote: "A family portfolio usually looks different from a starter portfolio. It may hold many funds, bonds, private investments and a family business, and it is built to last for generations, not to win this year. Ask your parents one question about it.",
    takeaway: "Time in the market beats timing the market.",
    media: [
      ["Play", "NGPF STAX (free online game)", "20 min", "Simulates 20 years of investing in 20 minutes. Ages 13+.", "https://www.ngpf.org/arcade/"],
      ["Watch", "Two Cents (PBS): \"How to Analyze a Single Stock\"", "Under 10 min", "Upbeat, made for Gen Z by two financial planners. Ages 13+.", yt("Two Cents PBS how to analyze a single stock")],
      ["Listen", "Planet Money Summer School: Investing, Ep. 1 \"The Stock Market\" and Ep. 2 \"Index Funds & The Bet\"", "About 30 min each", "Ep. 2 tells the story of Warren Buffett's $1 million bet that an index fund would beat hand-picked funds. Ages 13+.", "https://www.npr.org/podcasts/510289/planet-money"],
      ["Watch", "The Plain Bagel: \"How I Research Stocks: Step-by-Step Fundamental Analysis\"", "19 min", "A CFA and CFP walks through how a pro studies a company. Ages 16+.", yt("The Plain Bagel How I Research Stocks Step-by-Step Fundamental Analysis")],
      ["Read", "The Psychology of Money, Morgan Housel", "256 pages (about 6 hrs)", "Stories about behavior and patience. Ages 14+.", gr("The Psychology of Money Housel")],
      ["Go deeper", "Acquired podcast: \"Vanguard\"", "About 3 hrs 45 min", "The history of index funds, for the most interested. Ages 18+.", "https://www.acquired.fm/episodes"]
    ],
    leader: {
      runOfShow: [["0:00–0:04","Hook"],["0:04–0:14","Four big ideas, benchmarks, IPOs"],["0:14–0:22","Alphabet case study"],["0:22–0:30","Own What You Use"],["0:30–0:35","Compounding Race"],["0:35–0:40","Dice Diversification"],["0:40–0:45","Wrap-up and portfolio setup"]],
      prep: ["Ask each participant to name two companies whose products they use.", "Look up today's S&P 500 level and its return so far this year."],
      watchouts: ["Participants will want the hottest stock they've heard of. Let them, and use the index fund comparison to make the point over the coming weeks.", "Don't let \"the stock went up\" equal \"I was right.\" Ask what they expected and why.", "If a family owns a business, welcome the connection, but keep family details at the level the parents approved."]
    }
  },
  {
    id: "bonds", n: 2, age: 14, color: "navy",
    title: "Bonds and interest", subtitle: "Money has a price",
    whyAge: "The key idea, that a bond's price moves opposite to interest rates, means tracking two changing numbers at once, which is easier by 9th grade. Credit cards, car loans and student loans are decisions high schoolers will face within a few years.",
    goals: [
      "Explain a bond as a loan, using the words coupon, maturity and credit risk.",
      "Explain why a riskier borrower must pay a higher interest rate.",
      "Show why an existing bond's price falls when interest rates rise.",
      "Compare the cost of credit card debt with what savings earn."
    ],
    hook: "Would you rather lend $100 to a friend or to the U.S. government? What would each have to pay you?",
    ideas: [
      ["A bond is an IOU.", "You lend money to a government or company. It pays you interest (the coupon) on a schedule and returns your money on a set date (maturity)."],
      ["Interest is the price of money, and risk sets the price.", "The U.S. government is the safest borrower, so it pays the least. Companies pay more, and shaky companies pay a lot more (\"high-yield\" or \"junk\" bonds). The extra is payment for the chance you won't be repaid."],
      ["When rates rise, old bonds lose value.", "If new bonds pay more, nobody pays full price for your old, lower-paying bond. Longer bonds swing more."],
      ["The same math runs your personal life.", "Savings accounts pay you interest; credit cards charge you interest, at much higher rates. The Federal Reserve's decisions ripple into both."]
    ],
    extras: [
      {
        title: "The two benchmark rates: Fed funds vs. the 10-year",
        html: `<table><thead><tr><th></th><th>Federal funds rate</th><th>10-year Treasury yield</th></tr></thead><tbody>
<tr><td>What it is</td><td>The rate banks charge each other for overnight loans</td><td>The yearly return for lending to the U.S. government for 10 years</td></tr>
<tr><td>Who sets it</td><td>The Federal Reserve's committee (FOMC), eight meetings a year</td><td>The market: buyers and sellers every day</td></tr>
<tr><td>Where it stood (Nov. 2026)</td><td>3.75% to 4.00%, after a quarter-point hike on Sept. 16, 2026; held on Oct. 28</td><td>About 5.0%; it touched 5.36% on Oct. 7, its highest since 2002</td></tr>
<tr><td>What it moves most</td><td>Credit cards, savings accounts, car loans</td><td>Mortgages and big companies' borrowing</td></tr>
</tbody></table>
<p><b>Key point:</b> the Fed controls only the shortest rate directly. The 10-year is the market's vote on the next ten years. That is why a Fed rate cut does not guarantee lower mortgage rates.</p>
<p><a href="https://fred.stlouisfed.org/series/DFF" target="_blank" rel="noopener">Fed funds rate today (FRED)</a> · <a href="https://fred.stlouisfed.org/series/DGS10" target="_blank" rel="noopener">10-year yield today (FRED)</a></p>`
      },
      {
        title: "Read a real Treasury",
        html: `<p>The U.S. Treasury's newest 10-year note, sold at auction on Nov. 10, 2026:</p>
<table><tbody>
<tr><td>Name and ID</td><td>10-Year Treasury Note, CUSIP 91282CRX1</td></tr>
<tr><td>Amount sold</td><td>$42 billion</td></tr>
<tr><td>Coupon</td><td>5.000% a year, paid every six months</td></tr>
<tr><td>Maturity</td><td>Nov. 15, 2036</td></tr>
<tr><td>Auction yield</td><td>5.020%</td></tr>
<tr><td>Auction price</td><td>$99.84 per $100 of face value</td></tr></tbody></table>
<details><summary>Questions (tap for answers)</summary><ol>
<li>If you own $1,000 of this note, how much interest do you get? <i>$50 a year, as two $25 payments.</i></li>
<li>Why did it sell for slightly less than $100? <i>Buyers wanted 5.02%, a bit more than the 5.00% coupon, so they paid a little less.</i></li>
<li>What do you get back in November 2036? <i>$1,000, if you hold it until then.</i></li>
<li>If 10-year rates climb to 6% next year, what happens to its price? <i>It falls. But if you hold to 2036, you still get every payment and your $1,000 back.</i></li></ol></details>
<p>Anyone can buy Treasuries in $100 steps at <a href="https://www.treasurydirect.gov" target="_blank" rel="noopener">TreasuryDirect.gov</a>, and the interest is free of state income tax.</p>`
      }
    ],
    exercises: ["lendToFriend", "seesaw", "debtVsSavings"],
    family: [
      "What's the best and worst borrowing decision anyone in our family has made?",
      "Do we pay off our credit cards in full every month? Why does it matter?",
      "When should a young person get a first credit card, and what rules should come with it?"
    ],
    familyNote: "Many families hold part of their money in high-quality bonds and cash for stability, and some use municipal bonds because their interest is usually free of federal tax. Families also borrow on purpose, like a mortgage, when the money borrowed can earn more than it costs. The difference between that and credit card debt is the point of this session.",
    takeaway: "The interest you pay works against you exactly as hard as the interest you earn works for you.",
    media: [
      ["Watch", "Money, Explained (Netflix), Ep. 2 \"Credit Cards\"", "22 min", "How card companies profit when you carry a balance. Rated TV-14.", "https://www.netflix.com/title/81345769"],
      ["Listen", "Planet Money Summer School: Investing, Ep. 4 on bonds", "About 30 min", "Planet Money buys a real junk bond; bond ratings as \"credit scores for companies.\" Ages 14+.", "https://www.npr.org/podcasts/510289/planet-money"],
      ["Do", "TreasuryDirect.gov: look up note 91282CRX1", "10 min", "See the real Treasury from this session. Ages 15+.", "https://www.treasurydirect.gov"],
      ["Listen", "The Indicator from Planet Money, episodes on the Fed", "Under 10 min", "Weekday episodes that explain rate moves in plain English. Ages 14+.", "https://www.npr.org/podcasts/510325/the-indicator-from-planet-money"],
      ["Play", "Federal Reserve Simulator (Steam)", "Self-paced", "You play Fed chair and set rates to balance inflation and jobs. Ages 15+.", "https://store.steampowered.com/search/?term=federal+reserve+simulator"],
      ["Go deeper", "The Bond King, Mary Childs", "Book, about 350 pages", "The story of Bill Gross and the bond market. Ages 17+.", gr("The Bond King Mary Childs")]
    ],
    leader: {
      runOfShow: [["0:00–0:04","Hook and portfolio check"],["0:04–0:16","Four big ideas, then Fed funds vs. the 10-year"],["0:16–0:24","Lend to a Friend auction"],["0:24–0:34","The Seesaw, then read a real Treasury"],["0:34–0:40","Debt vs. Savings"],["0:40–0:45","Wrap-up: add a bond holding to the portfolio"]],
      prep: ["Look up today's Fed funds rate, 10-year yield, the best high-yield savings rate you can find and the average credit card rate.", "Note how each participant's portfolio has done since Session 1."],
      watchouts: ["The price/yield seesaw confuses almost everyone at first. Use \"would anyone pay full price for your old bond?\" rather than formulas.", "Bonds aren't riskless: long-term bond funds fell sharply in 2022 when rates rose quickly.", "Keep the credit card talk non-judgmental. Some participants may already have cards on a parent's account."]
    }
  },
  {
    id: "alternatives", n: 3, age: 16, color: "rust",
    title: "Alternatives and risk", subtitle: "Private equity, crypto and hype",
    whyAge: "Covers borrowed money, locked-up investments, fraud and family wealth, which need more maturity. At 18, participants can open crypto and brokerage accounts on their own, and pitches from friends start arriving. Teens take more risks when peers are watching; this session rehearses that pressure in a safe room. A mature 14- or 15-year-old can join with a parent's okay.",
    goals: [
      "Describe private equity, venture capital, private real estate and crypto in plain words.",
      "Explain the trade-off between return, risk and liquidity (how fast you can get your money out).",
      "Show with numbers how borrowed money magnifies both gains and losses.",
      "Name at least five warning signs of a scam or a bubble."
    ],
    hook: "A friend says his cousin's new coin is going to 10x. He needs an answer by tonight. What do you do?",
    ideas: [
      ["\"Alternatives\" are everything beyond public stocks and bonds.", "Private equity (buying whole companies), venture capital (backing startups), private real estate, hedge funds, commodities like gold, and crypto."],
      ["The trade-off has three parts: return, risk and liquidity.", "Private investments can earn more, but your money is often locked up for 7 to 10 years and you can't easily see what it's worth."],
      ["Access is restricted on purpose.", "Most private funds are sold only to \"accredited investors\": roughly a net worth over $1 million not counting your home, or income over $200,000 ($300,000 with a spouse). The idea is that these investors can afford a loss and get less disclosure."],
      ["Crypto is new, volatile, and a magnet for scams.", "Bitcoin has fallen 75% to 85% from its peak in several cycles, and about 47% from its October 2025 high of roughly $126,000. Some coins go to zero. Exchanges have collapsed and taken customer money with them."]
    ],
    extras: [],
    exercises: ["pizza", "holdOn", "bingo", "ladder"],
    family: [
      "Does our family own anything that can't be sold quickly? Why did we choose it?",
      "Has anyone ever pitched you an investment? What did you do?",
      "What's our family rule before putting money into a friend's business?"
    ],
    familyNote: "Young people from families with money are often pitched earlier and more often, by friends, classmates and strangers online. A script that works: \"That sounds interesting. Send me the details and I'll talk to my family first.\" A real opportunity survives a week's wait; a scam doesn't.",
    takeaway: "If you can't explain how it makes money, or can't get your money out, be careful.",
    media: [
      ["Watch", "Money, Explained (Netflix), Ep. 1 \"Get Rich Quick\"", "22 min", "Why people fall for financial scams, and how technology makes them easier. Rated TV-14.", "https://www.netflix.com/title/81345769"],
      ["Watch", "Money, Explained, Ep. 4 \"Gambling\"", "22 min", "How our brains work against us when we try to beat the odds; connects to meme coins and sports betting. Rated TV-14.", "https://www.netflix.com/title/81345769"],
      ["Listen", "Planet Money Summer School: Investing, Ep. 5 \"Bubbles, Bikes & Biases\" and Ep. 6 on crypto", "About 30 min each", "Bubbles and the biases behind them. Ages 14+.", "https://www.npr.org/podcasts/510289/planet-money"],
      ["Play", "NGPF Crypto Craze (free online game)", "15 to 20 min", "Crypto hype and volatility without real money. Ages 14+.", "https://www.ngpf.org/arcade/"],
      ["Go deeper", "Number Go Up, Zeke Faux", "320 pages, or 9 hrs 48 min on audio", "A reporter's tour of the 2021–22 crypto boom and its collapses, including FTX. Ages 17+.", gr("Number Go Up Zeke Faux")]
    ],
    leader: {
      runOfShow: [["0:00–0:05","Hook and portfolio check"],["0:05–0:17","Four big ideas"],["0:17–0:26","Buy a Pizza Shop"],["0:26–0:31","Could You Hold On?"],["0:31–0:37","Red-Flag Bingo"],["0:37–0:41","The Risk Ladder"],["0:41–0:45","Wrap-up: crypto stays at 10% or less of the portfolio"]],
      prep: ["Look up bitcoin's price and how far it is from its all-time high.", "Find one recent, well-reported crypto or investment fraud story.", "Confirm with parents whether their own private investments can be mentioned."],
      watchouts: ["Stay neutral on crypto. Teach volatility, scams and sizing, not \"crypto is bad.\"", "Don't mention any family's private holdings unless the parents asked you to.", "If someone has already lost money, thank them for sharing and treat it as the lesson, not an embarrassment."]
    }
  },
  {
    id: "taxes", n: 4, age: 15, color: "gold",
    title: "Taxes", subtitle: "What you keep is what counts",
    whyAge: "Most teens get a first paycheck around 15 or 16, so paystubs and withholding are immediately useful. Tax brackets require working through income in layers, which fits algebra-level skills. This session doesn't depend on Session 3, so a 15-year-old can take it first.",
    goals: [
      "Read a paystub and explain where the money went.",
      "Explain tax brackets and the difference between marginal and average tax rates.",
      "Compare how wages, short-term gains, long-term gains, dividends and interest are taxed.",
      "Show how the same investment gain is taxed differently in New York vs. other states.",
      "Name three legal ways to keep more: hold longer than a year, use a Roth IRA, and choose tax-free bonds where they fit."
    ],
    hook: "Two friends each make $10,000 on the same stock. One keeps $8,500, the other $7,500. How?",
    ideas: [
      ["Brackets tax income in layers.", "Moving into a higher bracket only raises the tax on the dollars above the line, never on all your income. For a single filer in 2026, federal rates run 10%, 12%, 22%, 24%, 32%, 35% and 37%, after a $16,100 standard deduction."],
      ["Different money, different tax.", "Wages also pay 7.65% payroll tax. Short-term gains (held a year or less) are taxed like wages. Long-term gains and qualified dividends get 0%, 15% or 20% federally. U.S. Treasury interest is free of state tax; New York municipal bond interest is usually free of both for New Yorkers; Roth IRA growth is tax-free if the rules are met."],
      ["Where you live changes the bill.", "Nine states tax no wages, including Florida and Texas (Washington does tax large capital gains). New York's rates run from about 3.9% to 10.9%, and New York City adds up to 3.876%. California's top rate is 13.3%. Most states, New York included, tax gains just like wages."],
      ["Other taxes you'll meet.", "Sales tax, property tax, and gift and estate taxes. In 2026 anyone can give $19,000 a year to any person without filing a gift tax return, and the federal estate tax applies only above $15 million per person. New York's estate tax starts much lower."]
    ],
    extras: [],
    exercises: ["paycheck", "sameGain", "holdOrSell"],
    family: [
      "How much of your paycheck went to taxes, and did anything surprise you?",
      "Why might a family think about which state it lives in?",
      "Should a teen with a summer job open a Roth IRA? Who should put the money in?"
    ],
    familyNote: "Investment income in a child's account is lightly taxed up to a point; above $2,700 in 2026 it's taxed at the parents' rate (the \"kiddie tax\"). A teen with a job can put up to the lesser of their earnings or $7,500 into a Roth IRA, and parents can fund it as a gift. Annual gifts, trusts and the timing of sales are how families legally manage taxes over decades.",
    takeaway: "The same investment can leave you with very different amounts depending on how long you hold it, what account it's in, and where you live.",
    media: [
      ["Watch", "Money, Explained (Netflix), Ep. 5 \"Retirement\"", "22 min", "Why saving early, ideally in a Roth IRA, matters so much. Rated TV-14.", "https://www.netflix.com/title/81345769"],
      ["Play", "NGPF Spent (free online game)", "15 min", "Live on a paycheck after taxes and bills. Ages 14+.", "https://www.ngpf.org/arcade/"],
      ["Do", "IRS Tax Withholding Estimator", "15 min", "Plug in a real or sample paystub. Ages 15+.", "https://www.irs.gov/individuals/tax-withholding-estimator"],
      ["Watch", "Two Cents (PBS) on taxes and paychecks", "Under 10 min each", "Short, funny explainers made for Gen Z. Ages 14+.", yt("Two Cents PBS taxes paycheck")],
      ["Explore", "Tax Foundation state tax maps", "10 min", "Compare New York with other states. Ages 15+.", "https://taxfoundation.org"],
      ["Go deeper", "The Bogleheads' Guide to Investing", "336 pages (about 8.5 hrs)", "Clear chapters on Roth IRAs and keeping investment taxes low. Ages 17+.", gr("The Bogleheads' Guide to Investing")]
    ],
    leader: {
      runOfShow: [["0:00–0:05","Hook"],["0:05–0:17","Four big ideas"],["0:17–0:24","Read a Paystub"],["0:24–0:35","Same Gain, Different Tax"],["0:35–0:40","Hold or Sell?"],["0:40–0:45","Wrap-up and program close"]],
      prep: ["Figures are 2026 rules. Check IRS.gov and tax.ny.gov each January.", "If participants live outside New York, add their state to Same Gain, Different Tax."],
      watchouts: ["Taxes are political. Teach how the rules work, not whether taxes should be higher or lower.", "Don't give individual tax advice. Refer specific questions to the family's tax advisor."]
    }
  }
];

// 20-book reading list. Titles known for profanity were left off.
const BOOKS = [
  ["Start here: ages 13 to 16", [
    [1,"How to Turn $100 into $1,000,000","James McKenna, Jeannine Glista and Matt Fontaine (2nd ed. 2024)","13+","160 pages · about 4 hrs","4.16","Written for young teens, with cartoons and simple math on compounding."],
    [2,"The Richest Man in Babylon","George S. Clason (1926)","13+","About 150 pages · about 4 hrs","4.23","Short parables about paying yourself first; a classic read in an evening or two."],
    [3,"The Motley Fool Investment Guide for Teens","David and Tom Gardner (2002)","13+","256 pages · about 6 hrs","3.94","Eight steps from setting goals to buying a first stock. Examples are dated; the principles hold."],
    [4,"The Psychology of Money","Morgan Housel (2020)","14+","256 pages · about 6 hrs","4.28","Short chapters on why patience and humility beat brilliance. The best single book on this list."],
    [5,"The Index Card","Helaine Olen and Harold Pollack (2016)","15+","256 pages · about 6 hrs","4.4 (Apple Books)","All of personal finance boiled down to ten rules that fit on an index card."]
  ]],
  ["Late teens: ages 16 to 20", [
    [6,"The Automatic Millionaire","David Bach (20th anniversary ed. 2026)","16+","304 pages · about 7.5 hrs","3.93","Pay yourself first by setting up automatic saving and investing once, then letting it run."],
    [7,"The Little Book of Common Sense Investing","John Bogle (2017 ed.)","16+","About 300 pages · about 7.5 hrs","4.15","The case for low-cost index funds from the man who popularized them."],
    [8,"Taxes Made Simple","Mike Piper (2023 ed.)","16+","About 116 pages · about 3 hrs","4.21","Brackets, deductions vs. credits, capital gains and state taxes. The shortest book here."],
    [9,"Same as Ever","Morgan Housel (2023)","16+","About 240 pages · about 6 hrs","4.16","Short essays on what never changes about people and markets."],
    [10,"Broke Millennial","Erin Lowry (2017)","17+","288 pages · about 7 hrs","3.88","Funny, practical guide to the money questions of the first years on your own."],
    [11,"Broke Millennial Takes On Investing","Erin Lowry (2019)","17+","256 pages · about 6 hrs","3.92","For anyone who feels too young or too broke to invest."],
    [12,"Get Good with Money","Tiffany Aliche (2021)","17+","368 pages · about 9 hrs","4.35","Ten steps to \"financial wholeness\" from a former preschool teacher. Has worksheets."],
    [13,"The Bogleheads' Guide to Investing","Larimore, Lindauer and LeBoeuf (2nd ed. 2014)","17+","336 pages · about 8.5 hrs","4.25","Plain-English guide to index funds, retirement accounts and keeping taxes low."]
  ]],
  ["Twenties: ages 19 to 30", [
    [14,"The Art of Spending Money","Morgan Housel (2025)","18+","256 pages · about 6 hrs","4.16","How to spend on what actually makes life better instead of chasing status."],
    [15,"Just Keep Buying","Nick Maggiulli (2022)","18+","296 pages · about 7.5 hrs","4.12","Data-driven answers to how much to save, when to invest and what to buy."],
    [16,"The Millionaire Next Door","Thomas Stanley and William Danko (1996)","18+","272 pages · about 7 hrs","4.05","Research showing most millionaires live modestly."],
    [17,"A Random Walk Down Wall Street","Burton Malkiel (50th anniversary ed. 2023)","19+","432 pages · about 11 hrs","4.14","Why markets are hard to beat, with chapters on bubbles and crypto."],
    [18,"Your Money or Your Life","Vicki Robin and Joe Dominguez (2018 ed.)","20+","About 370 pages · about 9 hrs","3.99","Measures purchases in hours of your life."],
    [19,"Die With Zero","Bill Perkins (2020)","22+","240 pages · about 6 hrs","4.2 (Apple Books)","Spending on experiences at the right age, not hoarding forever."],
    [20,"The Intelligent Investor","Benjamin Graham, with Jason Zweig (2003 ed.)","22+","About 640 pages · about 16 hrs","4.23","Warren Buffett's favorite investing book. Dense, so read it last."]
  ]]
];

// Companies kids know. Links: live quote, investor relations (where known), SEC filings.
const COMPANIES = [
  {name:"Apple", t:"AAPL", ex:"NASDAQ", sector:"Tech", sells:"iPhones, Macs, and services like the App Store and iCloud.", ir:"https://investor.apple.com", ask:"How much of Apple's money comes from services instead of devices?"},
  {name:"Alphabet (Google)", t:"GOOGL", ex:"NASDAQ", sector:"Tech", sells:"Search and YouTube ads, plus Google Cloud.", ir:"https://abc.xyz/investor/", ask:"Who pays for YouTube: you or advertisers?"},
  {name:"Microsoft", t:"MSFT", ex:"NASDAQ", sector:"Tech", sells:"Office and Windows subscriptions, Azure cloud, Xbox.", ir:"https://www.microsoft.com/en-us/investor", ask:"Why do companies pay every year for software instead of buying it once?"},
  {name:"Nvidia", t:"NVDA", ex:"NASDAQ", sector:"Tech", sells:"Chips that power AI data centers and gaming PCs.", ir:"https://investor.nvidia.com", ask:"What happens to Nvidia if companies slow their AI spending?"},
  {name:"Amazon", t:"AMZN", ex:"NASDAQ", sector:"Shopping", sells:"Online shopping, Prime, and AWS cloud computing.", ir:"https://ir.aboutamazon.com", ask:"Which earns more profit: the store or the cloud?"},
  {name:"Costco", t:"COST", ex:"NASDAQ", sector:"Shopping", sells:"Bulk groceries and goods; most of its profit comes from membership fees.", ask:"Why would a store make most of its profit from memberships?"},
  {name:"Nike", t:"NKE", ex:"NYSE", sector:"Shopping", sells:"Sneakers and athletic clothing.", ask:"Does a famous brand let a company charge more?"},
  {name:"Lululemon", t:"LULU", ex:"NASDAQ", sector:"Shopping", sells:"Athletic and leisure clothing.", ask:"What happens when a trend cools?"},
  {name:"Netflix", t:"NFLX", ex:"NASDAQ", sector:"Entertainment", sells:"Streaming subscriptions and, more and more, ads.", ir:"https://ir.netflix.net", ask:"Why did Netflix add a cheaper plan with ads?"},
  {name:"Disney", t:"DIS", ex:"NYSE", sector:"Entertainment", sells:"Theme parks, movies, Disney+ and ESPN.", ask:"Which part of Disney makes the most money?"},
  {name:"Spotify", t:"SPOT", ex:"NYSE", sector:"Entertainment", sells:"Music and podcast streaming subscriptions.", ask:"How much of each subscription goes to artists and labels?"},
  {name:"Roblox", t:"RBLX", ex:"NYSE", sector:"Entertainment", sells:"An online game platform that sells Robux.", ask:"Is Roblox profitable yet? Check its latest yearly report."},
  {name:"Chipotle", t:"CMG", ex:"NYSE", sector:"Food", sells:"Burritos and bowls at thousands of restaurants.", ask:"How does opening new restaurants grow profits?"},
  {name:"McDonald's", t:"MCD", ex:"NYSE", sector:"Food", sells:"Burgers, but much of its profit is rent and fees from franchise owners.", ask:"Is McDonald's really a real estate company?"},
  {name:"Starbucks", t:"SBUX", ex:"NASDAQ", sector:"Food", sells:"Coffee drinks and food at company-run and licensed stores.", ask:"What happens to profit when coffee bean prices rise?"},
  {name:"Coca-Cola", t:"KO", ex:"NYSE", sector:"Food", sells:"Soft drinks, water and juice brands sold worldwide.", ask:"Why do investors like companies that pay steady dividends?"},
  {name:"Tesla", t:"TSLA", ex:"NASDAQ", sector:"Autos", sells:"Electric cars, batteries and solar.", ir:"https://ir.tesla.com", ask:"Why is Tesla's P/E so much higher than other carmakers'?"},
  {name:"Vanguard S&P 500 ETF", t:"VOO", ex:"NYSEARCA", sector:"Funds", sells:"One share owns a slice of all ~500 companies in the S&P 500.", ask:"Compare its return this year with any single stock above."},
  {name:"iShares Core U.S. Aggregate Bond ETF", t:"AGG", ex:"NYSEARCA", sector:"Funds", sells:"Thousands of U.S. government and company bonds in one fund.", ask:"Did it go up or down when rates rose this fall? Why?"}
];

const MARKET_LINKS = [
  ["Markets today", [
    ["S&P 500 (Google Finance)", gf('.INX','INDEXSP')],
    ["Nasdaq Composite", gf('.IXIC','INDEXNASDAQ')],
    ["Dow Jones Industrial Average", gf('.DJI','INDEXDJX')],
    ["Bitcoin price", "https://www.google.com/finance/quote/BTC-USD"]
  ]],
  ["Interest rates", [
    ["Fed funds rate (FRED)", "https://fred.stlouisfed.org/series/DFF"],
    ["10-year Treasury yield (FRED)", "https://fred.stlouisfed.org/series/DGS10"],
    ["Buy Treasuries directly: TreasuryDirect", "https://www.treasurydirect.gov"],
    ["Federal Reserve meeting calendar", "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm"]
  ]],
  ["Research a company", [
    ["SEC EDGAR: every public company's filings", "https://www.sec.gov/edgar/search/"],
    ["Investor.gov: SEC's site for new investors", "https://www.investor.gov"],
    ["Investor.gov compound interest calculator", "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator"]
  ]],
  ["Taxes", [
    ["IRS Tax Withholding Estimator", "https://www.irs.gov/individuals/tax-withholding-estimator"],
    ["New York State Dept. of Taxation", "https://www.tax.ny.gov"],
    ["Tax Foundation", "https://taxfoundation.org"]
  ]],
  ["Learn and play", [
    ["NGPF Arcade: free money games", "https://www.ngpf.org/arcade/"],
    ["Planet Money (NPR)", "https://www.npr.org/podcasts/510289/planet-money"],
    ["The Indicator from Planet Money", "https://www.npr.org/podcasts/510325/the-indicator-from-planet-money"]
  ]]
];

export type UniversityPartner = {
  name: string;
  domain: string;
  /** Local university logo path under public/images/partners. */
  logo: string;
};

export type DestinationGuide = {
  slug: string;
  name: string;
  shortName: string;
  flag: string;
  image: string;
  imageAlt: string;
  headline: string;
  summary: string;
  whyStudy: string;
  studyInLabel: string;
  highlights: { label: string; value: string }[];
  programs: { title: string; detail: string }[];
  costs: { tuition: string; living: string; visa: string };
  visaSnapshot: string[];
  faq: { question: string; answer: string }[];
  partners: UniversityPartner[];
  keywords: string[];
};

export const destinationGuides: DestinationGuide[] = [
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    shortName: "UK",
    flag: "/images/flags/united-kingdom.png",
    image: "/images/generated/destination-united-kingdom.webp",
    imageAlt:
      "Postgraduate students leaving a red-brick university building on a wet Manchester street",
    headline: "Study in the UK",
    summary:
      "Compare one-year master’s courses, published 2026/27 international fees, scholarships and the September and January intakes.",
    studyInLabel: "the UK",
    whyStudy:
      "The UK remains a top choice for Nigerian students who want quality education, shorter postgraduate programmes, and strong global recognition. We help you shortlist the right universities, prepare a competitive application, and move smoothly through CAS and visa stages.",
    highlights: [
      { label: "Main intakes", value: "Sept & Jan" },
      { label: "Typical master’s", value: "1 year" },
      { label: "Work while studying", value: "Up to 20 hrs/week" },
      { label: "Post-study option", value: "Graduate visa" },
    ],
    programs: [
      {
        title: "Business, Finance & Law",
        detail: "MBA pathways, accounting, international business and commercial law.",
      },
      {
        title: "Computing & Data",
        detail: "Computer science, cybersecurity, AI and business analytics.",
      },
      {
        title: "Health & Life Sciences",
        detail: "Public health, biomedical sciences and related health programmes.",
      },
      {
        title: "Engineering",
        detail: "Civil, mechanical, electrical and energy engineering.",
      },
    ],
    costs: {
      tuition: "£17,000–£19,950 on the courses below",
      living: "£1,171 outside London / £1,529 in London per month",
      visa: "Student visa fee + yearly healthcare surcharge",
    },
    visaSnapshot: [
      "Offer and CAS from a licensed student sponsor",
      "Proof of tuition + maintenance funds",
      "TB test from an approved clinic in Nigeria",
      "English-language evidence where required",
    ],
    faq: [
      {
        question: "Can I study in the UK with an HND?",
        answer:
          "Yes. Selected universities consider HNDs for direct master’s entry, advanced standing or a pre-master’s route, depending on grades and subject relevance.",
      },
      {
        question: "Do I always need IELTS?",
        answer:
          "Not always. Some universities accept WAEC English or another approved test. We confirm the exact policy for each shortlisted course.",
      },
      {
        question: "How long does the process take?",
        answer:
          "Most students should start 9–12 months before intake for applications, funding, CAS checks and visa preparation.",
      },
    ],
    partners: [
      { name: "University of Manchester", domain: "manchester.ac.uk", logo: "/images/partners/university-of-manchester.png" },
      { name: "University of Birmingham", domain: "birmingham.ac.uk", logo: "/images/partners/university-of-birmingham.svg" },
      { name: "University of Leeds", domain: "leeds.ac.uk", logo: "/images/partners/university-of-leeds.svg" },
      { name: "University of Glasgow", domain: "gla.ac.uk", logo: "/images/partners/university-of-glasgow.svg" },
      { name: "Coventry University", domain: "coventry.ac.uk", logo: "/images/partners/coventry-university.svg" },
      { name: "University of Hertfordshire", domain: "herts.ac.uk", logo: "/images/partners/university-of-hertfordshire.svg" },
      { name: "Brunel University London", domain: "brunel.ac.uk", logo: "/images/partners/brunel-university-london.svg" },
      { name: "University of Portsmouth", domain: "port.ac.uk", logo: "/images/partners/university-of-portsmouth.webp" },
      { name: "Teesside University", domain: "tees.ac.uk", logo: "/images/partners/teesside-university.png" },
      { name: "University of East London", domain: "uel.ac.uk", logo: "/images/partners/university-of-east-london.svg" },
      { name: "University of Nottingham", domain: "nottingham.ac.uk", logo: "/images/partners/university-of-nottingham.svg" },
      { name: "University of Liverpool", domain: "liverpool.ac.uk", logo: "/images/partners/university-of-liverpool.webp" },
      { name: "Queen Mary University of London", domain: "qmul.ac.uk", logo: "/images/partners/queen-mary-university-of-london.png" },
      { name: "University of Leicester", domain: "le.ac.uk", logo: "/images/partners/university-of-leicester.svg" },
      { name: "University of Salford", domain: "salford.ac.uk", logo: "/images/partners/university-of-salford.webp" },
      { name: "Middlesex University", domain: "mdx.ac.uk", logo: "/images/partners/middlesex-university.webp" },
      { name: "University of Westminster", domain: "westminster.ac.uk", logo: "/images/partners/university-of-westminster.png" },
      { name: "Northumbria University", domain: "northumbria.ac.uk", logo: "/images/partners/northumbria-university.webp" },
      { name: "University of Greenwich", domain: "gre.ac.uk", logo: "/images/partners/university-of-greenwich.png" },
      { name: "Cardiff University", domain: "cardiff.ac.uk", logo: "/images/partners/cardiff-university.svg" },
      { name: "University of South Wales", domain: "southwales.ac.uk", logo: "/images/partners/university-of-south-wales.png" },
      { name: "Cardiff Metropolitan University", domain: "cardiffmet.ac.uk", logo: "/images/partners/cardiff-metropolitan-university.png" },
      { name: "Robert Gordon University", domain: "rgu.ac.uk", logo: "/images/partners/robert-gordon-university.png" },
      { name: "Edinburgh Napier University", domain: "napier.ac.uk", logo: "/images/partners/edinburgh-napier-university.png" },
      { name: "Bangor University", domain: "bangor.ac.uk", logo: "/images/partners/bangor-university.png" },
      { name: "Sheffield Hallam University", domain: "shu.ac.uk", logo: "/images/partners/sheffield-hallam-university.png" },
    ],
    keywords: [
      "study in UK from Nigeria",
      "UK universities for Nigerian students",
      "UK student visa",
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    shortName: "Ireland",
    flag: "/images/flags/ireland.png",
    image: "/images/generated/destination-ireland.webp",
    imageAlt:
      "Students comparing notes on the steps of a limestone university building in Dublin",
    headline: "Study in Ireland",
    summary:
      "Compare September 2026 master’s courses in Dublin, with published international fees from €13,500.",
    studyInLabel: "Ireland",
    whyStudy:
      "Ireland suits students targeting technology, pharmaceuticals, finance and business. We help you choose eligible programmes, prepare visa finances correctly, and plan accommodation early—especially for Dublin.",
    highlights: [
      { label: "Main intake", value: "September" },
      { label: "Living funds", value: "€10,000 / year" },
      { label: "Work while studying", value: "20 hrs/week" },
      { label: "Graduate stay", value: "12–24 months" },
    ],
    programs: [
      {
        title: "Technology & Data",
        detail: "Software, cybersecurity, AI and digital transformation.",
      },
      {
        title: "Pharma & Life Sciences",
        detail: "Biotechnology, pharmaceutical science and regulatory fields.",
      },
      {
        title: "Business & Finance",
        detail: "Accounting, finance, supply chain and international business.",
      },
      {
        title: "Engineering",
        detail: "Electronic, mechanical and medical-device engineering.",
      },
    ],
    costs: {
      tuition: "€10,300–€40,000+ / year",
      living: "€10,000 immigration minimum",
      visa: "€60 entry + €300 registration",
    },
    visaSnapshot: [
      "Offer for a full-time eligible programme",
      "Proof of tuition and €10,000 living funds",
      "Private medical insurance",
      "Clear study plan and education history",
    ],
    faq: [
      {
        question: "How much money must I show?",
        answer:
          "For a one-year course, immigration expects immediate access to at least €10,000 plus course fees, with a plan for later years.",
      },
      {
        question: "Can students work in Ireland?",
        answer:
          "Eligible Stamp 2 students may work 20 hours weekly during term and 40 hours in designated holiday periods.",
      },
      {
        question: "How long can I stay after graduation?",
        answer:
          "Eligible Level 8 graduates can generally receive 12 months; Level 9 and above may receive up to 24 months under the Third Level Graduate Programme.",
      },
    ],
    partners: [
      { name: "Trinity College Dublin", domain: "tcd.ie", logo: "/images/partners/trinity-college-dublin.png" },
      { name: "University College Dublin", domain: "ucd.ie", logo: "/images/partners/university-college-dublin.svg" },
      { name: "Dublin City University", domain: "dcu.ie", logo: "/images/partners/dublin-city-university.webp" },
      { name: "University of Galway", domain: "universityofgalway.ie", logo: "/images/partners/university-of-galway.webp" },
      { name: "University College Cork", domain: "ucc.ie", logo: "/images/partners/university-college-cork.webp" },
      { name: "Technological University Dublin", domain: "tudublin.ie", logo: "/images/partners/technological-university-dublin.png" },
      { name: "Maynooth University", domain: "maynoothuniversity.ie", logo: "/images/partners/maynooth-university.webp" },
      { name: "University of Limerick", domain: "ul.ie", logo: "/images/partners/university-of-limerick.svg" },
      { name: "Dublin Business School", domain: "dbs.ie", logo: "/images/partners/dublin-business-school.webp" },
      { name: "National College of Ireland", domain: "ncirl.ie", logo: "/images/partners/national-college-of-ireland.webp" },
      { name: "Griffith College", domain: "griffith.ie", logo: "/images/partners/griffith-college.webp" },
      { name: "Atlantic Technological University", domain: "atu.ie", logo: "/images/partners/atlantic-technological-university.webp" },
      { name: "South East Technological University", domain: "setu.ie", logo: "/images/partners/south-east-technological-university.svg" },
      { name: "Munster Technological University", domain: "mtu.ie", logo: "/images/partners/munster-technological-university.svg" },
    ],
    keywords: [
      "study in Ireland from Nigeria",
      "Ireland student visa Nigeria",
      "Ireland universities",
    ],
  },
  {
    slug: "usa",
    name: "United States of America",
    shortName: "USA",
    flag: "/images/flags/usa.png",
    image: "/images/generated/destination-usa.webp",
    imageAlt:
      "Students checking a timetable while crossing an American university quad",
    headline: "Study in the USA",
    summary:
      "Compare Fall and Spring intakes, published international graduate tuition, and the funds an F-1 visa expects.",
    studyInLabel: "the USA",
    whyStudy:
      "The USA offers breadth few destinations can match—from community colleges to research universities. We help you build a balanced shortlist, prepare funding evidence and get ready for a clear F-1 visa interview.",
    highlights: [
      { label: "Main intake", value: "Aug / Sept" },
      { label: "Student route", value: "F-1 visa" },
      { label: "Visa + SEVIS", value: "US$185 + US$350" },
      { label: "Post-study work", value: "OPT / STEM OPT" },
    ],
    programs: [
      {
        title: "STEM & Research",
        detail: "Engineering, computing, sciences and graduate research tracks.",
      },
      {
        title: "Business & Economics",
        detail: "Finance, entrepreneurship, analytics and management.",
      },
      {
        title: "Health & Public Policy",
        detail: "Public health, health administration and policy programmes.",
      },
      {
        title: "Arts & Design",
        detail: "Creative programmes with portfolio-led admission.",
      },
    ],
    costs: {
      tuition: "US$20,000–US$60,000+ / year",
      living: "Varies widely by city",
      visa: "US$185 + SEVIS US$350",
    },
    visaSnapshot: [
      "Form I-20 from an SEVP-certified school",
      "I-901 SEVIS fee receipt",
      "Funding evidence matching I-20 costs",
      "Clear academic purpose for the F-1 interview",
    ],
    faq: [
      {
        question: "Do I need the SAT?",
        answer:
          "Not always. Many institutions are test-optional, but a strong score can support admission or scholarships. We check each school’s current policy.",
      },
      {
        question: "Can I work after graduating?",
        answer:
          "Eligible F-1 students may apply for OPT related to their field (generally up to 12 months), with a possible 24-month STEM extension for qualifying degrees.",
      },
      {
        question: "How early should I apply?",
        answer:
          "Start 12–18 months ahead for testing, essays, recommendations and financial-aid deadlines.",
      },
    ],
    partners: [
      { name: "Arizona State University", domain: "asu.edu", logo: "/images/partners/arizona-state-university.png" },
      { name: "Northeastern University", domain: "northeastern.edu", logo: "/images/partners/northeastern-university.png" },
      { name: "University of Illinois Chicago", domain: "uic.edu", logo: "/images/partners/university-of-illinois-chicago.webp" },
      { name: "Drexel University", domain: "drexel.edu", logo: "/images/partners/drexel-university.png" },
      { name: "Pace University", domain: "pace.edu", logo: "/images/partners/pace-university.png" },
      { name: "University of South Florida", domain: "usf.edu", logo: "/images/partners/university-of-south-florida.png" },
      { name: "University of Cincinnati", domain: "uc.edu", logo: "/images/partners/university-of-cincinnati.svg" },
      { name: "Rochester Institute of Technology", domain: "rit.edu", logo: "/images/partners/rochester-institute-of-technology.png" },
      { name: "University of Houston", domain: "uh.edu", logo: "/images/partners/university-of-houston.svg" },
      { name: "George Mason University", domain: "gmu.edu", logo: "/images/partners/george-mason-university.webp" },
      { name: "Syracuse University", domain: "syracuse.edu", logo: "/images/partners/syracuse-university.png" },
      { name: "Illinois Institute of Technology", domain: "iit.edu", logo: "/images/partners/illinois-institute-of-technology.svg" },
      { name: "University of Dayton", domain: "udayton.edu", logo: "/images/partners/university-of-dayton.webp" },
      { name: "Adelphi University", domain: "adelphi.edu", logo: "/images/partners/adelphi-university.webp" },
    ],
    keywords: [
      "study in USA from Nigeria",
      "F1 visa Nigeria",
      "US universities for Nigerian students",
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    shortName: "Canada",
    flag: "/images/flags/canada.png",
    image: "/images/generated/destination-canada.webp",
    imageAlt:
      "Students walking a snowy path outside a glass and brick university building in winter",
    headline: "Study in Canada",
    summary:
      "Compare September, January and May starts, then add tuition to the CAD 23,448 living-cost figure before you apply.",
    studyInLabel: "Canada",
    whyStudy:
      "Canada is popular for applied learning and strong academic programmes. We verify DLI status, attestation requirements and Post-Graduation Work Permit eligibility before you pay a deposit.",
    highlights: [
      { label: "Main intake", value: "September" },
      { label: "Living funds", value: "CAD 23,448" },
      { label: "Work while studying", value: "24 hrs/week" },
      { label: "Permit fee", value: "CAD 150 + biometrics" },
    ],
    programs: [
      {
        title: "Technology & Engineering",
        detail: "Software, AI, cybersecurity and applied engineering.",
      },
      {
        title: "Health & Community",
        detail: "Public health, health sciences and related pathways.",
      },
      {
        title: "Business & Supply Chain",
        detail: "Analytics, finance, operations and logistics.",
      },
      {
        title: "Environmental Studies",
        detail: "Energy, sustainability and resource management.",
      },
    ],
    costs: {
      tuition: "CAD 18,000–CAD 40,000+ / year",
      living: "CAD 23,448 first year, from 1 Sept 2026",
      visa: "CAD 150 + CAD 85 biometrics",
    },
    visaSnapshot: [
      "Letter of acceptance from a verified DLI",
      "PAL/TAL or documented exemption",
      "Proof of tuition, living and travel funds",
      "Coherent study plan and source-of-funds evidence",
    ],
    faq: [
      {
        question: "Does every DLI programme qualify for a PGWP?",
        answer:
          "No. Verify both the institution and the specific programme. DLI status alone does not guarantee PGWP eligibility.",
      },
      {
        question: "How much proof of funds do I need?",
        answer:
          "For a study permit lodged on or after 1 September 2026, one applicant outside Quebec needs CAD 23,448 for first-year living expenses, plus tuition and transportation.",
      },
      {
        question: "Do master’s students need a PAL?",
        answer:
          "Master’s and doctoral students at public DLIs are among groups that may be exempt. We confirm and document the exemption before filing.",
      },
    ],
    partners: [
      { name: "University of Toronto", domain: "utoronto.ca", logo: "/images/partners/university-of-toronto.svg" },
      { name: "York University", domain: "yorku.ca", logo: "/images/partners/york-university.svg" },
      { name: "University of British Columbia", domain: "ubc.ca", logo: "/images/partners/university-of-british-columbia.png" },
      { name: "Concordia University", domain: "concordia.ca", logo: "/images/partners/concordia-university.png" },
      { name: "University of Manitoba", domain: "umanitoba.ca", logo: "/images/partners/university-of-manitoba.webp" },
      { name: "Toronto Metropolitan University", domain: "torontomu.ca", logo: "/images/partners/toronto-metropolitan-university.png" },
      { name: "Seneca Polytechnic", domain: "senecapolytechnic.ca", logo: "/images/partners/seneca-polytechnic.webp" },
      { name: "Centennial College", domain: "centennialcollege.ca", logo: "/images/partners/centennial-college.svg" },
      { name: "McMaster University", domain: "mcmaster.ca", logo: "/images/partners/mcmaster-university.svg" },
      { name: "University of Ottawa", domain: "uottawa.ca", logo: "/images/partners/university-of-ottawa.webp" },
      { name: "University of Calgary", domain: "ucalgary.ca", logo: "/images/partners/university-of-calgary.svg" },
      { name: "Simon Fraser University", domain: "sfu.ca", logo: "/images/partners/simon-fraser-university.png" },
      { name: "Humber College", domain: "humber.ca", logo: "/images/partners/humber-college.svg" },
      { name: "George Brown College", domain: "georgebrown.ca", logo: "/images/partners/george-brown-college.svg" },
    ],
    keywords: [
      "study in Canada from Nigeria",
      "Canada study permit Nigeria",
      "Canadian universities for Nigerians",
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    shortName: "Australia",
    flag: "/images/flags/australia.png",
    image: "/images/generated/destination-australia.webp",
    imageAlt:
      "Students working on laptops under gum trees outside a Melbourne university building",
    headline: "Study in Australia",
    summary:
      "Compare February and July intakes, CRICOS courses, and the AUD 29,710 living-cost benchmark before you accept an offer.",
    studyInLabel: "Australia",
    whyStudy:
      "Australia offers respected universities and practical higher-education routes. We help you choose a CRICOS-registered course, prepare Genuine Student answers, arrange OSHC and lodge a complete Subclass 500 application.",
    highlights: [
      { label: "Main intakes", value: "Feb & July" },
      { label: "Visa route", value: "Subclass 500" },
      { label: "Living benchmark", value: "AUD 29,710" },
      { label: "Work allowance", value: "48 hrs/fortnight" },
    ],
    programs: [
      {
        title: "Health & Nursing",
        detail: "Strong programmes with professional registration checks.",
      },
      {
        title: "Engineering & Resources",
        detail: "Civil, mining, mechanical and environmental fields.",
      },
      {
        title: "IT & Data",
        detail: "Software, cybersecurity and information systems.",
      },
      {
        title: "Business & Hospitality",
        detail: "Accounting, management, tourism and supply chain.",
      },
    ],
    costs: {
      tuition: "AUD 20,000–AUD 50,000+ / year",
      living: "AUD 29,710 / year benchmark",
      visa: "Check Home Affairs pricing",
    },
    visaSnapshot: [
      "Confirmation of Enrolment (CoE)",
      "Genuine Student answers with evidence",
      "Financial capacity documents",
      "Overseas Student Health Cover (OSHC)",
    ],
    faq: [
      {
        question: "What is the Genuine Student requirement?",
        answer:
          "It assesses whether study is your primary reason for applying—covering your circumstances, course knowledge, history and career value.",
      },
      {
        question: "How much can students work?",
        answer:
          "The general limit is 48 hours per fortnight while the course is in session. Always check the conditions on your visa grant.",
      },
      {
        question: "Is health insurance compulsory?",
        answer:
          "Yes. Student visa applicants generally need Overseas Student Health Cover for the required period.",
      },
    ],
    partners: [
      { name: "Monash University", domain: "monash.edu", logo: "/images/partners/monash-university.svg" },
      { name: "University of Melbourne", domain: "unimelb.edu.au", logo: "/images/partners/university-of-melbourne.svg" },
      { name: "UNSW Sydney", domain: "unsw.edu.au", logo: "/images/partners/unsw-sydney.webp" },
      { name: "Deakin University", domain: "deakin.edu.au", logo: "/images/partners/deakin-university.svg" },
      { name: "RMIT University", domain: "rmit.edu.au", logo: "/images/partners/rmit-university.png" },
      { name: "Curtin University", domain: "curtin.edu.au", logo: "/images/partners/curtin-university.svg" },
      { name: "University of Adelaide", domain: "adelaide.edu.au", logo: "/images/partners/university-of-adelaide.svg" },
      { name: "Queensland University of Technology", domain: "qut.edu.au", logo: "/images/partners/queensland-university-of-technology.svg" },
      { name: "University of Technology Sydney", domain: "uts.edu.au", logo: "/images/partners/university-of-technology-sydney.png" },
      { name: "Macquarie University", domain: "mq.edu.au", logo: "/images/partners/macquarie-university.svg" },
      { name: "University of Wollongong", domain: "uow.edu.au", logo: "/images/partners/university-of-wollongong.svg" },
      { name: "Griffith University", domain: "griffith.edu.au", logo: "/images/partners/griffith-university.svg" },
      { name: "La Trobe University", domain: "latrobe.edu.au", logo: "/images/partners/la-trobe-university.svg" },
      { name: "Swinburne University of Technology", domain: "swinburne.edu.au", logo: "/images/partners/swinburne-university-of-technology.svg" },
    ],
    keywords: [
      "study in Australia from Nigeria",
      "Australia student visa Nigeria",
      "Australian universities for Nigerian students",
    ],
  },
];

export function getDestinationGuide(slug: string) {
  return destinationGuides.find((destination) => destination.slug === slug);
}

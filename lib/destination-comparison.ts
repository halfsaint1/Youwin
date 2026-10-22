export type ComparedCourse = {
  course: string;
  university: string;
  duration: string;
  tuition: string;
  scholarship: string;
  intakes: string;
  requirements: string;
};

export type DestinationComparison = {
  feeNote: string;
  intakes: { name: string; detail: string }[];
  requirements: { label: string; detail: string }[];
  scholarships: { name: string; detail: string }[];
  courses: ComparedCourse[];
};

export const destinationComparisons: Record<string, DestinationComparison> = {
  "united-kingdom": {
    feeNote:
      "Tuition figures are the international fees published by each university for a full-time place. Hertfordshire and Teesside figures are their 2026/27 rates. Coventry’s figure is the international fee published on the course page. A scholarship is only real once it is written on your offer. UKVI living costs stay at £1,171 a month outside London and £1,529 in London for applications made before 30 November 2026, then rise to £1,203 and £1,570.",
    intakes: [
      {
        name: "September 2026",
        detail: "The main intake. Start the application about 9–12 months ahead so CAS, funds and TB test are ready.",
      },
      {
        name: "January 2027",
        detail: "Available on the Hertfordshire, Coventry and Teesside courses below. Fewer scholarship rounds than September.",
      },
      {
        name: "September 2027",
        detail: "Hertfordshire has already published a higher 2027/28 computer science fee. We re-check the figure before you apply.",
      },
    ],
    requirements: [
      {
        label: "Degree or HND",
        detail:
          "A bachelor’s degree at 2:2 level, or a strong relevant HND considered for a pre-master’s or advanced entry. Subject match matters more for finance than for conversion computing.",
      },
      {
        label: "English",
        detail:
          "Usually IELTS 6.0 with no band below 5.5, or 6.5 for some business courses. Some universities accept WAEC English instead. The visa may still need a UKVI test.",
      },
      {
        label: "Documents",
        detail:
          "Passport, transcripts, references, and a TB certificate from an approved clinic in Nigeria.",
      },
      {
        label: "Money for the visa",
        detail:
          "Outstanding tuition on the CAS, plus up to nine months of living costs at the UKVI rate for where you will study. The money must sit in the account for 28 days.",
      },
    ],
    scholarships: [
      {
        name: "University international award",
        detail:
          "Hertfordshire, Coventry and Teesside each assess an international bursary with the application. The amount is printed on the offer, not assumed in advance.",
      },
      {
        name: "Chevening",
        detail:
          "A separate, competitive full scholarship from the UK government. It has its own deadline, about a year before the September intake, and is not automatic with an admission.",
      },
    ],
    courses: [
      {
        course: "MSc Computer Science",
        university: "University of Hertfordshire",
        duration: "1 year",
        tuition: "£19,950",
        scholarship: "International award on the offer",
        intakes: "September 2026 and January 2027",
        requirements: "2:2, including conversion applicants. IELTS 6.0 (5.5).",
      },
      {
        course: "MSc Finance",
        university: "Coventry University",
        duration: "1 year",
        tuition: "£19,500",
        scholarship: "Coventry international scholarship",
        intakes: "September 2026 and January 2027",
        requirements: "2:2 in a related subject. IELTS usually 6.5.",
      },
      {
        course: "MSc International Marketing Management",
        university: "Coventry University",
        duration: "1 year",
        tuition: "£19,500",
        scholarship: "Coventry international scholarship",
        intakes: "September 2026 and January 2027",
        requirements: "2:2. IELTS usually 6.5.",
      },
      {
        course: "MBA, one year",
        university: "Teesside University",
        duration: "1 year",
        tuition: "£17,000",
        scholarship: "Teesside international award",
        intakes: "September 2026 and January 2027",
        requirements: "2:2 or substantial management experience. IELTS 6.0–6.5.",
      },
      {
        course: "Taught MSc or MA, standard one year",
        university: "Teesside University",
        duration: "1 year",
        tuition: "£17,000",
        scholarship: "Teesside international award",
        intakes: "September 2026 and January 2027",
        requirements: "2:2 in a related field, or an HND route where the course allows it.",
      },
    ],
  },
  ireland: {
    feeNote:
      "Fees are the non-EU rates in TU Dublin’s international postgraduate listing for September 2026. They are per year. Immigration still expects tuition plus at least €10,000 in living funds for a one-year course, and private medical insurance.",
    intakes: [
      {
        name: "September 2026",
        detail: "The intake for every course in the table. Accommodation in Dublin should be planned as soon as the offer arrives.",
      },
      {
        name: "January",
        detail: "Only selected TU Dublin courses open a January start. None of the five below do.",
      },
    ],
    requirements: [
      {
        label: "Degree",
        detail:
          "An honours bachelor’s degree. A 2:2 is the usual starting point. A 2:1 is safer for accounting and finance.",
      },
      {
        label: "English",
        detail:
          "IELTS 6.5 for the courses listed. TU Dublin prints the exact band on each course.",
      },
      {
        label: "Visa file",
        detail:
          "Full-time offer, fee receipt or evidence you can pay, €10,000 living funds, medical insurance, and a clear study plan.",
      },
    ],
    scholarships: [
      {
        name: "Government of Ireland International Education Scholarship",
        detail:
          "A competitive national award. It is separate from the TU Dublin offer and has its own closing date.",
      },
      {
        name: "University award",
        detail:
          "Some faculties reduce the published fee on the offer letter. We only count it after it is in writing.",
      },
    ],
    courses: [
      {
        course: "MSc Finance",
        university: "Technological University Dublin",
        duration: "1 year",
        tuition: "€13,500",
        scholarship: "National or faculty award, if offered",
        intakes: "September 2026",
        requirements: "Honours degree. IELTS 6.5.",
      },
      {
        course: "MBS Accounting (International)",
        university: "Technological University Dublin",
        duration: "1 year",
        tuition: "€13,500",
        scholarship: "National or faculty award, if offered",
        intakes: "September 2026",
        requirements: "Honours degree in a related subject. IELTS 6.5.",
      },
      {
        course: "MSc Strategic Management",
        university: "Technological University Dublin",
        duration: "1 year",
        tuition: "€13,500",
        scholarship: "National or faculty award, if offered",
        intakes: "September 2026",
        requirements: "Honours degree. IELTS 6.5.",
      },
      {
        course: "MSc Logistics and Supply Chain Management",
        university: "Technological University Dublin",
        duration: "1 year",
        tuition: "€14,500",
        scholarship: "National or faculty award, if offered",
        intakes: "September 2026",
        requirements: "Honours degree. IELTS 6.5.",
      },
      {
        course: "MSc Applied Cyber Security",
        university: "Technological University Dublin",
        duration: "1 year",
        tuition: "€14,500",
        scholarship: "National or faculty award, if offered",
        intakes: "September 2026",
        requirements: "Honours degree in computing or a related field. IELTS 6.5.",
      },
    ],
  },
  usa: {
    feeNote:
      "Arizona State University publishes a 2026/27 international graduate base tuition of US$42,475 for on-campus degrees at its metro Phoenix campuses. Programme fees can sit on top of that. ASU’s own international graduate cost of attendance, including housing, insurance and personal costs, is about US$66,646. Other partner universities price each degree separately, and we use the figure on the I-20.",
    intakes: [
      {
        name: "Fall 2026",
        detail: "August or September start. The strongest round for merit aid. Begin 12–18 months ahead.",
      },
      {
        name: "Spring 2027",
        detail: "January start at ASU and many partners. Scholarship funds are often smaller than Fall.",
      },
      {
        name: "Fall 2027",
        detail: "The right round if tests, transcripts or sponsor funds will not be ready for 2026.",
      },
    ],
    requirements: [
      {
        label: "Degree",
        detail:
          "A bachelor’s degree. Competitive graduate programmes usually look for the equivalent of a 3.0 GPA. A lower GPA can still work with a strong transcript and a pathway.",
      },
      {
        label: "Tests",
        detail:
          "Many schools are test-optional for the GRE and SAT. English is usually TOEFL, IELTS or Duolingo, unless a pathway covers it.",
      },
      {
        label: "F-1 visa",
        detail:
          "I-20, SEVIS fee, visa fee, and funds that match the costs printed on the I-20. The interview needs a clear reason for that course and that school.",
      },
    ],
    scholarships: [
      {
        name: "College merit award",
        detail:
          "ASU and most partners consider merit aid with the application. It reduces the bill on the I-20. It is not guaranteed by an agency.",
      },
      {
        name: "Graduate assistantship",
        detail:
          "Some research degrees offer a stipend and a fee reduction in exchange for teaching or research. These are competitive and decided by the department.",
      },
    ],
    courses: [
      {
        course: "On-campus international master’s",
        university: "Arizona State University",
        duration: "1–2 years",
        tuition: "US$42,475 base / year",
        scholarship: "Merit award assessed with the application",
        intakes: "Fall 2026 and Spring 2027",
        requirements: "Bachelor’s degree. English test or a pathway. Programme fees may be extra.",
      },
      {
        course: "Estimated full graduate cost of attendance",
        university: "Arizona State University",
        duration: "1 year of study",
        tuition: "About US$66,646",
        scholarship: "Aid is subtracted on the I-20",
        intakes: "2026/27",
        requirements: "Includes ASU’s published housing, insurance, books, travel and personal costs, not tuition alone.",
      },
    ],
  },
  canada: {
    feeNote:
      "College and university tuition in Canada is set programme by programme and printed on the letter of acceptance. Do not budget from a national average. For a study permit lodged on or after 1 September 2026, one applicant outside Quebec must show that tuition, plus CAD 23,448 for living costs, plus transport. A master’s or PhD at a public university may be exempt from a provincial attestation letter. A college programme is not.",
    intakes: [
      {
        name: "September 2026",
        detail: "The main start. PAL timing and seats fill first for this intake.",
      },
      {
        name: "January 2027",
        detail: "Widely available at Seneca, Centennial, Humber and George Brown, and at several universities.",
      },
      {
        name: "May 2027",
        detail: "Common for college postgraduate certificates. Check PGWP eligibility for that exact programme before you pay.",
      },
    ],
    requirements: [
      {
        label: "Study level",
        detail:
          "A postgraduate certificate usually needs a diploma or degree. A master’s needs a bachelor’s degree, often a B average.",
      },
      {
        label: "English",
        detail:
          "IELTS Academic is the usual test. College programmes often ask for 6.0 or 6.5 overall. Universities often ask for 6.5 with higher writing.",
      },
      {
        label: "Permit file",
        detail:
          "Letter of acceptance from a DLI, PAL or a documented exemption, tuition plus CAD 23,448 living funds, and a study plan that matches your previous studies.",
      },
    ],
    scholarships: [
      {
        name: "Entrance scholarship",
        detail:
          "Universities such as York, Manitoba, Ottawa and Calgary consider entrance awards with the application. Colleges more often offer a smaller bursary.",
      },
      {
        name: "Do not count work income",
        detail:
          "The 24 hours a week you may work on a study permit is not proof of funds. The visa officer must see the money before you travel.",
      },
    ],
    courses: [
      {
        course: "Postgraduate certificate, PGWP-eligible",
        university: "Seneca Polytechnic",
        duration: "1–2 years",
        tuition: "On the letter of acceptance",
        scholarship: "Small bursaries, not a full fee waiver",
        intakes: "September, January and May",
        requirements: "Diploma or degree. IELTS usually 6.0–6.5. Confirm that exact programme is PGWP-eligible.",
      },
      {
        course: "Postgraduate certificate",
        university: "Humber College or George Brown College",
        duration: "1 year",
        tuition: "On the letter of acceptance",
        scholarship: "Bursary only if stated on the offer",
        intakes: "September and January",
        requirements: "Diploma or degree in a related field. Check PAL and PGWP before the deposit.",
      },
      {
        course: "Master’s degree",
        university: "York University",
        duration: "1–2 years",
        tuition: "On the letter of acceptance",
        scholarship: "Faculty entrance award, if awarded",
        intakes: "September, some January",
        requirements: "Bachelor’s degree, usually a B average. IELTS often 6.5 or 7.0.",
      },
      {
        course: "Master’s degree",
        university: "University of Manitoba or University of Ottawa",
        duration: "1–2 years",
        tuition: "On the letter of acceptance",
        scholarship: "Entrance scholarship considered with admission",
        intakes: "September",
        requirements: "Bachelor’s degree. Public graduate degrees may be PAL-exempt. We document that before filing.",
      },
    ],
  },
  australia: {
    feeNote:
      "On-campus coursework fees are different for every CRICOS course and are confirmed on the Confirmation of Enrolment. We do not publish a single Australia tuition figure, because a business master’s and a nursing master’s at the same university are not the same price. What is fixed is the visa living-cost benchmark: AUD 29,710 for the student for 12 months, plus tuition, travel and Overseas Student Health Cover.",
    intakes: [
      {
        name: "February 2027",
        detail: "The main start. Genuine Student evidence and OSHC should be ready before the CoE is used for the visa.",
      },
      {
        name: "July 2026 and July 2027",
        detail: "A full second intake at most partner universities, including Deakin, RMIT, Griffith and Swinburne.",
      },
    ],
    requirements: [
      {
        label: "Course and CoE",
        detail:
          "The course must be CRICOS-registered. The visa uses the Confirmation of Enrolment, not a conditional offer alone.",
      },
      {
        label: "Academic record",
        detail:
          "A bachelor’s degree for a master’s. A diploma or bachelor’s can lead to a packaged pathway. Grades and subject match are checked course by course.",
      },
      {
        label: "English and funds",
        detail:
          "IELTS or an equivalent test at the level on the course page. Show tuition, AUD 29,710 living costs, travel and OSHC. Genuine Student answers must explain why this course, in Australia, fits your record.",
      },
      {
        label: "Work",
        detail:
          "The usual limit is 48 hours a fortnight while the course is in session. That income is not part of the visa funds.",
      },
    ],
    scholarships: [
      {
        name: "University international scholarship",
        detail:
          "Deakin, RMIT, Macquarie, Wollongong and others assess fee reductions with the application. The percentage is only useful once it is on the offer.",
      },
      {
        name: "Destination Australia and government awards",
        detail:
          "These are competitive, limited to certain regions or courses, and have their own forms. An offer from the university does not include them automatically.",
      },
    ],
    courses: [
      {
        course: "Master of Business or Information Systems",
        university: "Deakin University or RMIT University",
        duration: "1.5–2 years",
        tuition: "Quoted on the CoE",
        scholarship: "International fee reduction, if awarded",
        intakes: "February and July",
        requirements: "Bachelor’s degree. IELTS usually 6.5. CRICOS code checked before deposit.",
      },
      {
        course: "Master of Engineering",
        university: "RMIT, QUT or Curtin University",
        duration: "2 years",
        tuition: "Quoted on the CoE",
        scholarship: "Faculty award, if awarded",
        intakes: "February and July",
        requirements: "Bachelor’s in engineering or a closely related subject.",
      },
      {
        course: "Master of Information Technology",
        university: "University of Technology Sydney or Macquarie University",
        duration: "1.5–2 years",
        tuition: "Quoted on the CoE",
        scholarship: "Merit scholarship considered at admission",
        intakes: "February and July",
        requirements: "Bachelor’s degree. A conversion stream exists for non-IT backgrounds at several partners.",
      },
      {
        course: "Master of Professional Accounting",
        university: "Griffith University or La Trobe University",
        duration: "1.5–2 years",
        tuition: "Quoted on the CoE",
        scholarship: "International bursary on the offer only",
        intakes: "February and July",
        requirements: "Bachelor’s degree. Professional-body accreditation is checked if you need it for a career plan.",
      },
    ],
  },
};

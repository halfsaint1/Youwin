import {
  GraduationCap,
  FileCheck2,
  StampIcon,
  Award,
  Compass,
  Home,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "university-course-selection",
    title: "University & Course Selection",
    description:
      "We match you to the right university and course based on your academic background, career goals, and budget.",
    icon: GraduationCap,
  },
  {
    slug: "application-support",
    title: "Application Support",
    description:
      "We prepare and review your documents, personal statement, and all requirements to give your application the best chance.",
    icon: FileCheck2,
  },
  {
    slug: "student-visa-assistance",
    title: "Student Visa Assistance",
    description:
      "We handle your visa process end to end, from document preparation to submission, so your application is approval-ready.",
    icon: StampIcon,
  },
  {
    slug: "scholarship-guidance",
    title: "Scholarship Guidance",
    description:
      "We research available scholarships for you and guide you through the application process to help secure your funding.",
    icon: Award,
  },
  {
    slug: "career-guidance",
    title: "Career Guidance",
    description:
      "We advise you on the best destination based on your career path, lifestyle preferences, and long-term goals.",
    icon: Compass,
  },
  {
    slug: "pre-post-arrival-support",
    title: "Pre & Post-Arrival Support",
    description:
      "We help you find accommodation, plan your travel, and settle in smoothly once you arrive at your destination.",
    icon: Home,
  },
];

export const roadmap = [
  {
    step: "First Step",
    title: "Free Consultation",
    description:
      "You tell us your ambitions and we identify the courses, universities, and destinations that suit you best.",
  },
  {
    step: "Second Step",
    title: "Secure Your Admission",
    description:
      "You share your details and we prepare, polish, and submit a strong application on your behalf.",
  },
  {
    step: "Third Step",
    title: "Get Your Visa Approved",
    description:
      "After your admission is confirmed, we will help you with your CAS and visa application.",
  },
  {
    step: "Fourth Step",
    title: "Start Your New Life Abroad",
    description:
      "You land and we make sure your travel, accommodation, and arrival are fully sorted before you arrive.",
  },
];

export const stats = [
  {
    value: 7,
    suffix: "+",
    label: "Years of Experience",
    description: "Guiding students toward their study abroad goals.",
  },
  {
    value: 750,
    suffix: "+",
    label: "Visas Successfully Approved",
    description:
      "We help students get into the right university and make their move abroad a reality.",
  },
  {
    value: 10,
    suffix: "+",
    label: "Countries Covered",
    description:
      "We support student visa applications across top study destinations worldwide.",
  },
  {
    value: 99,
    suffix: "%",
    label: "Client Satisfaction Rate",
    description:
      "Trusted by students for transparent, reliable, and efficient support",
  },
];

export const destinations = [
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    flag: "/images/flags/united-kingdom.png",
  },
  { name: "Ireland", slug: "ireland", flag: "/images/flags/ireland.png" },
  { name: "USA", slug: "usa", flag: "/images/flags/usa.png" },
  { name: "Canada", slug: "canada", flag: "/images/flags/canada.png" },
  {
    name: "Australia",
    slug: "australia",
    flag: "/images/flags/australia.png",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  tags: string[];
  country: string;
  image?: string;
};

export const homeTestimonials: Testimonial[] = [
  {
    name: "Ngozi Chukwu",
    role: "Master's student, Leeds",
    country: "United Kingdom",
    tags: ["Admission", "Visa", "Documentation", "Housing Support"],
    image: "/images/generated/testimonials/ngozi-chukwu.webp",
    quote:
      "I was stressing about the visa paperwork, honestly. My sister used YouWin last year and kept saying, just call them. They handled my uni application, chased me when I was slow with documents, and even helped sort accommodation before I flew. I'm in Leeds doing my Master's now, and I still WhatsApp them when something confuses me.",
  },
  {
    name: "Dayo Ogundare",
    role: "B.Sc. graduate",
    country: "United Kingdom",
    tags: ["Admission", "Visa", "Documentation", "Housing Support"],
    image: "/images/generated/testimonials/dayo-ogundare.webp",
    quote:
      "UK was always the plan, but I had no idea which schools would take my HND. YouWin didn't just send me a long list. They explained why each option made sense for my budget. Visa came through in about four weeks. Still feels a bit unreal, to be honest.",
  },
  {
    name: "Serah Idode",
    role: "Undergraduate, Manchester",
    country: "United Kingdom",
    tags: ["Guidance", "Visa", "Flight Tickets", "Post Arrival"],
    image: "/images/generated/testimonials/serah-idode.webp",
    quote:
      "First time applying abroad and I was scared of getting scammed, not gonna lie. YouWin walked me through everything on WhatsApp, step by step. They even flagged a partial scholarship I didn't know I qualified for. Landed in Manchester three months ago and I'm settling in properly now.",
  },
  {
    name: "Samuel",
    role: "First time applicant",
    country: "United Kingdom",
    tags: ["University", "Visa", "Relocation", "Housing Support"],
    image: "/images/generated/testimonials/samuel.webp",
    quote:
      "Before YouWin I was just googling random things and getting more confused. They sat with me, looked at my results properly, and told me straight which unis were realistic. Visa approved first try. My mum was probably the happiest person in the house that day.",
  },
];

export const caseStudies: Testimonial[] = [
  {
    name: "Linda Idode",
    role: "Master's in Business, University of Birmingham",
    country: "United Kingdom",
    tags: ["University Selection", "Visa", "Document Processing"],
    image: "/images/generated/testimonials/linda-idode.webp",
    quote:
      "I was panicking, fresh out of NYSC, and everyone kept saying UK visa is hard. YouWin broke it into small steps: personal statement, CAS letter, bank statement, all of it. Three weeks after biometrics, my visa was out. Now I'm at Birmingham doing Business Management, and my flatmate is also a YouWin student, funnily enough.",
  },
  {
    name: "Daniel Ogundare",
    role: "Nursing, Melbourne",
    country: "Australia",
    tags: ["Application Review", "Reapplication Support", "Visa"],
    image: "/images/generated/testimonials/daniel-ogundare.webp",
    quote:
      "I applied to Australia twice on my own and got rejected both times. I almost gave up. A friend said try YouWin. They looked at my old files and told me straight what was wrong. Weak personal statement, wrong course pairing. Third time went through. I'm in Melbourne studying Nursing now, and it's been worth every bit of the stress.",
  },
  {
    name: "Femi Olabode",
    role: "Study Permit, Canada",
    country: "Canada",
    tags: ["Personal Statement Review", "Visa Guidance"],
    image: "/images/generated/testimonials/femi-olabode.webp",
    quote:
      "What I liked is they didn't oversell Canada to me. They said my profile was strong, but my funds letter needed work, and they showed me exactly how to fix it. No pressure, no weird promises. Study permit landed in less than a month. I'm in Toronto now, getting ready for September intake.",
  },
  {
    name: "Blessing Chukwu",
    role: "Parent, Trinity College Dublin",
    country: "Ireland",
    tags: ["Admissions Support", "Scholarship", "Housing Assistance"],
    image: "/images/generated/testimonials/blessing-chukwu.webp",
    quote:
      "My daughter wanted Trinity College Dublin and I didn't trust random agents online. YouWin kept calling me with updates on her admission letter, scholarship offer, and accommodation options. As a parent, that mattered more than anything. She's in Dublin now and doing well. I'd send any parent their way.",
  },
];

/** Stories rotated in the homepage testimonial carousel. */
export const carouselTestimonials: Testimonial[] = [
  ...caseStudies,
  ...homeTestimonials.filter((t) =>
    ["Ngozi Chukwu", "Dayo Ogundare"].includes(t.name)
  ),
];

export const faqs = [
  {
    question: "What services does YouWin Educational Consulting offer?",
    answer:
      "We help students who want to study abroad with everything from choosing a university to applying, handling admissions, and guiding them through the visa process. Our aim is to make the whole experience as easy and stress-free as possible.",
  },
  {
    question: "Which countries can I study in through YouWin?",
    answer:
      "We partner with accredited universities in the UK, USA, Canada, and Europe. This means you can choose from many well-known study destinations around the world.",
  },
  {
    question: "How do I get started with YouWin?",
    answer:
      "It’s easy to get started. Just book a consultation with us, and we’ll walk you through your options, help you pick the right course and university, and explain what to do next.",
  },
  {
    question: "Do I need to pay for a consultation?",
    answer:
      "In our first meeting, we’ll learn about your goals and offer advice on your study abroad options. Get in touch with us to find out if there are any fees.",
  },
  {
    question: "Can YouWin help with visa applications?",
    answer:
      "Yes, we provide expert help with your visa application to ensure it’s accurate, complete, and submitted on time. This gives you the best chance of getting approved.",
  },
  {
    question: "What makes YouWin different from other consultancies?",
    answer:
      "We put students first by giving honest advice, personal support, and clear updates at every step. We do more than just process applications; we guide and support you every step of the way.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "How long it takes depends on the country, university, and course you choose. We work quickly to make sure your application and visa process go as smoothly as possible.",
  },
];

export const coreValues = [
  {
    title: "Passion",
    description:
      "We care about where you end up. Every application and visa file we touch matters to us, because your outcome is the measure of our work.",
  },
  {
    title: "Community",
    description:
      "You join more than a client list. Our students become part of a network of people who share advice, encouragement, and real experience.",
  },
  {
    title: "Commitment",
    description:
      "We stay with you after the application goes in. From your first question to your first day abroad, we keep showing up.",
  },
  {
    title: "Growth",
    description:
      "We keep learning, refining our process, and expanding university partnerships so you get better options and stronger support.",
  },
  {
    title: "Honesty",
    description:
      "No sugarcoating and no false promises. We tell you where you stand and what it will take to get where you want to go.",
  },
  {
    title: "Team Work",
    description:
      "Your success needs more than one person. Our teams in the UK and Nigeria work together so nothing important gets missed.",
  },
];

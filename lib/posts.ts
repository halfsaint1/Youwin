import { bestCoursesPost } from "@/lib/post-best-courses";
import { canadaStudyPermitPost } from "@/lib/post-canada-study-permit";
import { chooseConsultantPost } from "@/lib/post-choose-consultant";
import { scholarshipsPost } from "@/lib/post-scholarships";
import { studyInUkPost } from "@/lib/post-study-in-uk";
import { ukStudentVisaPost } from "@/lib/post-uk-student-visa";

export type PostBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string };

export type PostFaq = {
  question: string;
  answer: string;
};

export type PostSource = {
  label: string;
  url: string;
};

export type Post = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  dateISO: string;
  updatedISO: string;
  author: string;
  excerpt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  faq: PostFaq[];
  sources: PostSource[];
  relatedLinks: { label: string; href: string }[];
  body: PostBlock[];
};

export const posts: Post[] = [
  studyInUkPost,
  ukStudentVisaPost,
  scholarshipsPost,
  canadaStudyPermitPost,
  bestCoursesPost,
  chooseConsultantPost,
];

export const homepagePosts = posts.slice(0, 3);

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

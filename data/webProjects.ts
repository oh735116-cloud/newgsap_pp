// 전시 순서는 이 배열의 순서입니다. 객체를 이동하면 화면 순서도 바뀝니다.
export type WebProject = {
  id: string;
  name: string;
  type: "web" | "apps-script" | "mobile";
  summary: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageSrc: string;
};

// URL 변경: 각 프로젝트의 liveUrl에 실제 주소를 붙여 넣으세요.
// GitHub 주소가 생기면 githubUrl의 빈 문자열을 교체하면 버튼이 자동으로 표시됩니다.
// 이미지는 public/projects/에 저장하고 imageSrc에 /projects/파일명.webp를 입력합니다.
// 설명·기술·성과는 확인한 사실만 입력합니다. 빈 값은 화면에서 생략합니다.
export const webProjects: WebProject[] = [
  { id: "nadeul", name: "나들플랜", type: "web", summary: "", technologies: [],
    liveUrl: "https://wa26bteam02.yjjob.kr/", githubUrl: "", imageSrc: "" },
  { id: "movie-pick", name: "Movie Pick", type: "web", summary: "", technologies: [],
    liveUrl: "https://for-js-practice-ad3d.vercel.app/", githubUrl: "", imageSrc: "" },
  { id: "abang", name: "아방로그", type: "web", summary: "", technologies: [],
    liveUrl: "https://cafeon.dothome.co.kr/", githubUrl: "", imageSrc: "" },
  { id: "gongmoa", name: "공모아", type: "apps-script", summary: "", technologies: ["Google Apps Script"],
    liveUrl: "https://script.google.com/macros/s/AKfycbxqy34KSV9NANe2b9LFfYUOrryuXoT44LO1YNdGf3A/dev", githubUrl: "", imageSrc: "" },
  { id: "cafeon", name: "CafeOn", type: "mobile", summary: "", technologies: [],
    liveUrl: "https://team-project-five-pink.vercel.app/map", githubUrl: "", imageSrc: "" },
];

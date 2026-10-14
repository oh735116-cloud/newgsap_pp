// 배열 순서가 전시 순서입니다. URL·이미지는 이 파일에서 변경합니다.
export type WebProject = {
  id: string;
  name: string;
  type: "web" | "apps-script" | "mobile";
  summary: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageSrc: string;
  // public 폴더 기준 경로와 사용자가 읽을 화면 이름을 함께 등록합니다.
  screenshots: { src: string; label: string }[];
};

// 실제 업로드한 스크린샷에서 확인한 서비스 소개만 작성했습니다.
// GitHub 주소를 입력하면 버튼이 표시됩니다. 미확인 기술·성과는 추가하지 않습니다.
export const webProjects: WebProject[] = [
  { id: "nadeul", name: "나들플랜", type: "web",
    summary: "지역과 하고 싶은 활동을 입력하고, 날씨를 고려한 나들이 코스를 찾아보는 서비스입니다.", technologies: [],
    liveUrl: "https://wa26bteam02.yjjob.kr/", githubUrl: "", imageSrc: "/nadleplan_main.png",
    screenshots: [{ src: "/nadleplan_main.png", label: "메인 화면" }, { src: "/nadleplan_search.png", label: "코스 추천" }] },
  { id: "movie-pick", name: "Movie Pick", type: "web",
    summary: "현재 상영작과 인기 영화, 개봉 예정작을 살펴보고 원하는 영화를 검색하는 서비스입니다.", technologies: [],
    liveUrl: "https://for-js-practice-ad3d.vercel.app/", githubUrl: "", imageSrc: "/moviePick_main.png",
    screenshots: [{ src: "/moviePick_main.png", label: "메인 화면" }, { src: "/moviePick.png", label: "영화 검색" }] },
  { id: "abang", name: "아방로그", type: "web",
    summary: "게시글과 아방노트를 둘러보고, 검색으로 원하는 글을 찾아보는 공간입니다.", technologies: [],
    liveUrl: "https://cafeon.dothome.co.kr/", githubUrl: "", imageSrc: "/abanglog.png",
    screenshots: [{ src: "/abanglog.png", label: "메인 화면" }] },
  { id: "gongmoa", name: "공모아", type: "apps-script",
    summary: "공연 정보를 모아 살펴보고, 추천 공연과 예매 정보를 확인하는 웹앱입니다.", technologies: ["Google Apps Script"],
    liveUrl: "https://script.google.com/macros/s/AKfycbxqy34KSV9NANe2b9LFfYUOrryuXoT44LO1YNdGf3A/dev", githubUrl: "", imageSrc: "/gongmoa.png",
    screenshots: [{ src: "/gongmoa.png", label: "메인 화면" }, { src: "/gongmoa2.png", label: "공연 추천" }] },
  { id: "cafeon", name: "CafeOn", type: "mobile",
    summary: "지도에서 가까운 카페를 찾고, 매장의 혼잡도를 확인하는 모바일 서비스입니다.", technologies: [],
    liveUrl: "https://team-project-five-pink.vercel.app/map", githubUrl: "", imageSrc: "/cafeon_map.webp",
    screenshots: [{ src: "/cafeon_map.webp", label: "카페 지도" }, { src: "/cafeon.webp", label: "시작 화면" }] },
];

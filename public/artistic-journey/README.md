# 3번째 섹션 크로스페이드 이미지

이 폴더에 아래 이름으로 실제 JPG 사진을 넣으면 해당 챕터에 표시됩니다.
이미지가 없거나 로드에 실패하면 기존 그래픽이 표시됩니다. 추가 후 브라우저를 새로고침하세요.

| 순서 | 챕터 | 파일명 | 추천 내용 |
| --- | --- | --- | --- |
| 01 | FOUNDATION | `01-foundation.jpg` | 타악기 전공, 악기 연주, 합주 |
| 02 | UNDERSTANDING | `02-understanding.jpg` | 함께하는 음악 활동, 소통과 협업 |
| 03 | EDUCATION | `03-education.jpg` | 드럼·타악기 수업 |
| 04 | PERFORMANCE | `04-performance.jpg` | 군악대, 공연, 문화행사 |
| 05 | EXPANSION | `05-development.jpg` | 개발 작업, 웹 프로젝트 |

- 권장 크기: 가로 1600px 이상의 고해상도 JPG. 피사체가 중앙 또는 오른쪽에 있는 사진이 적합합니다.
- 사진은 원본 비율을 유지하며 오른쪽 배경을 채웁니다. 영역 비율에 따라 가장자리가 잘릴 수 있습니다.
- 첫 번째 사진은 `public/01-foundation-upscaled.webp` 보정본을 사용합니다. 원본 `01-foundation.jpg`는 보존되어 있으며, 처리 방식과 프롬프트는 `upscale-notes.md`에 기록했습니다.
- 세 번째 사진은 `public/03-education-upscaled.webp` 보정본을 사용합니다. 원본 `03-education.png`는 보존되어 있습니다.
- 중앙의 네이비 그라데이션으로 왼쪽 글 영역과 연결됩니다.
- 데스크톱에서는 현재 사진이 최대 2% 확대되며 다음 사진으로 크로스페이드됩니다.
- 모바일 목록에는 같은 사진을 정적 배경으로 표시하고, 어두운 오버레이로 글자 대비를 유지합니다.
- PNG/WebP를 사용할 경우 파일 확장자만 바꾸지 말고
  `components/ArtisticCareerSection.tsx`의 해당 `image` 경로도 수정하세요.

const projects = window.portfolioProjects;
const detail = document.querySelector('#detail');
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const repoUrl = project => `https://github.com/dlllll0/${encodeURIComponent(project.repo)}`;
const tags = values => values.map(value => `<span>${escapeHtml(value)}</span>`).join('');
let activeButton;
const visuals = {
  final: {caption:'RM 고객관리 웹, 합성 데이터 시연', work:'시장 Gap 분석, 고객 거래 변화 점검, 상담 우선순위 설계'},
  statistics: {caption:'발표자료 17쪽: 활동성과 수익성 기반 고객 세분화', work:'FAI, FPI 지수 설계, 비모수 검정, 고객군별 관리 방향 제안'},
  ml: {caption:'발표자료 25쪽: 유사 지역 지도와 거점 진출 후보', work:'예대마진 회귀, 2단계 군집화, 지역별 유사도 비교'},
  mldl: {caption:'발표자료 73쪽: 거래활동 약화 고위험 사례', work:'연속 누락 검토, 거래활동 약화 정의, 시간 기준 검증'},
  dl: {caption:'재무제표 검토 가이드: 전기와 당기 비교 및 검토 화면', work:'OCR 연계, 위험 사전 기반 탐지, 근거 설명, 검토 웹 구축'}
};

document.querySelector('#project-grid').innerHTML = projects.map(project => `
  <article class="project-card tone-${project.id}">
    <div class="project-overview">
      <a class="project-cover" href="assets/${project.id}.png?v=20261102b" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(project.title)} 결과 이미지 크게 보기"><figure><div class="cover-canvas"><img src="assets/${project.id}.png?v=20261102b" alt="${escapeHtml(visuals[project.id].caption)}" loading="lazy" width="1600" height="900"></div><figcaption>${escapeHtml(visuals[project.id].caption)} <span aria-hidden="true">↗</span></figcaption></figure></a>
      <div class="card-copy"><div class="project-kicker">${escapeHtml(project.type)}</div>
        <h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p>
        <dl class="project-facts"><div><dt>한 일</dt><dd>${escapeHtml(visuals[project.id].work)}</dd></div><div><dt>결과</dt><dd>${escapeHtml(project.highlight)}</dd></div></dl>
        <div class="tech-label">사용 기술, 방법</div>
        <div class="tags">${tags(project.tags)}</div>
      </div>
    </div>
    <div class="card-actions"><button class="text-link" data-project="${project.id}">분석 과정, 결과 보기 <span aria-hidden="true">→</span></button><a href="${repoUrl(project)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(project.title)} GitHub 새 탭에서 보기">GitHub ↗</a></div>
  </article>`).join('');

function showProject(project, trigger) {
  activeButton = trigger;
  detail.querySelector('.dialog-bar > span').textContent = `PROJECT / ${project.number}`;
  detail.querySelector('.detail-body').innerHTML = `
    <div class="eyebrow">${escapeHtml(project.type)}</div>
    <h2 id="detail-title">${escapeHtml(project.title)}</h2>
    <p class="detail-lead">${escapeHtml(project.question)}</p>
    <figure class="detail-visual"><a href="assets/${project.id}.png?v=20261102b" target="_blank" rel="noopener noreferrer"><img src="assets/${project.id}.png?v=20261102b" alt="${escapeHtml(visuals[project.id].caption)}"></a><figcaption>${escapeHtml(visuals[project.id].caption)}</figcaption></figure>
    <a class="primary detail-repo" href="${repoUrl(project)}" target="_blank" rel="noopener noreferrer">GitHub에서 코드, 상세 근거 보기 ↗</a>
    <div class="detail-meta"><div><small>팀 프로젝트</small><b>iM Digital Banker Academy 8기</b></div><div><small>개인 기여</small><b>${escapeHtml(project.role)}</b></div></div>
    <section><h3>01. 왜 이 분석을 했나요?</h3><p>${escapeHtml(project.problem)}</p></section>
    <section><h3>02. 어떻게 접근했나요?</h3><p>${escapeHtml(project.approach)}</p><div class="detail-flow">${tags(project.flow)}</div></section>
    <section><h3>03. 어떤 결과가 나왔나요?</h3><p>${escapeHtml(project.result)}</p></section>
    <section><h3>04. 그래서 무엇을 알 수 있나요?</h3><p>${escapeHtml(project.insight)}</p></section>
    <section><h3>05. 어디까지 해석할 수 있나요?</h3><p>${escapeHtml(project.limit)}</p></section>
    <aside class="review-note">${escapeHtml(project.note)}</aside>`;
  detail.showModal();
  detail.scrollTop = 0;
  document.body.classList.add('modal-open');
}
document.querySelector('#project-grid').addEventListener('click', event => {
  const button = event.target.closest('button[data-project]');
  if (!button) return;
  const project = projects.find(item => item.id === button.dataset.project);
  if (project) showProject(project,button);
});
document.querySelector('.close').addEventListener('click', () => detail.close());
detail.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  activeButton?.focus();
});
detail.addEventListener('click', event => {
  const rect = detail.getBoundingClientRect();
  if (event.target === detail && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) detail.close();
});

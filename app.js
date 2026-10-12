const projects = window.portfolioProjects;
const detail = document.querySelector('#detail');
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const repoUrl = project => `https://github.com/dlllll0/${encodeURIComponent(project.repo)}`;
const tags = values => values.map(value => `<span>${escapeHtml(value)}</span>`).join('');
let activeButton;

document.querySelector('#project-grid').innerHTML = projects.map(project => `
  <article class="project-card tone-${project.id}">
    <button class="card-open" data-project="${project.id}" aria-label="${escapeHtml(project.title)} 분석 상세 보기">
      <div class="card-visual">
        <div class="visual-header"><span class="project-label">FINANCIAL DATA PROJECT</span><span>${project.number} / 05</span></div>
        <p class="card-question">${escapeHtml(project.question)}</p>
        <div class="card-flow">${project.flow.map((step,index) => `<span><small>${String(index+1).padStart(2,'0')}</small>${escapeHtml(step)}</span>`).join('')}</div>
      </div>
      <div class="card-copy"><div class="project-kicker">${escapeHtml(project.type)}</div>
        <h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p>
        <div class="card-result">${escapeHtml(project.highlight)}</div>
        <div class="tags">${tags(project.tags)}</div>
      </div>
    </button>
    <div class="card-actions"><button class="text-link" data-project="${project.id}">분석 과정·결과 보기 <span aria-hidden="true">→</span></button><a href="${repoUrl(project)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(project.title)} GitHub 새 탭에서 보기">GitHub ↗</a></div>
  </article>`).join('');

function showProject(project, trigger) {
  activeButton = trigger;
  detail.querySelector('.dialog-bar > span').textContent = `PROJECT / ${project.number}`;
  detail.querySelector('.detail-body').innerHTML = `
    <div class="eyebrow">${escapeHtml(project.type)}</div>
    <h2 id="detail-title">${escapeHtml(project.title)}</h2>
    <p class="detail-lead">${escapeHtml(project.question)}</p>
    <a class="primary detail-repo" href="${repoUrl(project)}" target="_blank" rel="noopener noreferrer">GitHub에서 코드·상세 근거 보기 ↗</a>
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

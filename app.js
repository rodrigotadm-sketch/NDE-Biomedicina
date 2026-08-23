
(async()=>{
const root=document.getElementById('nde-app'), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const D=await fetch('nde.json',{cache:'no-store'}).then(r=>r.json());
root.innerHTML=`<section class="hero"><div class="eyebrow">UFPR · CURSO DE BIOMEDICINA</div><h1>${esc(D.title)}</h1><p>${esc(D.course)}</p></section>
<section class="panel">${esc(D.intro)}${D.updated?`<div class="empty">Última atualização: ${esc(D.updated)}</div>`:''}</section>
<section class="section"><h2>Principais atribuições</h2><div class="attrib-grid">${D.attributions.map(a=>`<article class="attrib"><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`).join('')}</div></section>
<section class="section"><h2>Composição atual</h2><div class="controls"><input id="q" type="search" placeholder="Buscar por nome ou departamento"><select id="f"><option value="todos">Todos os membros</option><option value="coord">Coordenação</option><option value="membro">Demais membros</option></select></div><div id="members" class="member-grid"></div></section>
<section class="section"><h2>Histórico</h2><div class="panel">${esc(D.history)}</div></section>
<section class="section"><h2>Documentos e normas</h2><div class="docs">${D.documents.map(d=>d.url?`<div class="doc"><a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.label)}</a></div>`:`<div class="doc">${esc(d.label)} <span class="empty">— link não cadastrado</span></div>`).join('')}</div></section>`;
const q=document.getElementById('q'),f=document.getElementById('f'),box=document.getElementById('members');
function card(m){let c=m.role.toLowerCase().includes('coorden');return `<article class="member ${c?'coordinator':''}"><div class="badges"><span class="badge">${esc(m.role)}</span>${m.status?`<span class="badge status">${esc(m.status)}</span>`:''}</div><h3>${esc(m.name)}</h3><div class="dept">${esc(m.department)}</div><div class="meta">${m.mandate?`<div><b>Mandato:</b> ${esc(m.mandate)}</div>`:''}</div><div class="actions">${m.email?`<a href="mailto:${esc(m.email)}">E-mail</a>`:''}${m.lattes?`<a href="${esc(m.lattes)}" target="_blank" rel="noopener">Currículo Lattes</a>`:''}</div></article>`}
function render(){let s=q.value.toLowerCase().trim(),fv=f.value;let list=D.members.filter(m=>{let c=m.role.toLowerCase().includes('coorden');let ok=fv==='todos'||(fv==='coord'&&c)||(fv==='membro'&&!c);let hit=!s||[m.name,m.department,m.role,m.email].join(' ').toLowerCase().includes(s);return ok&&hit});box.innerHTML=list.length?list.map(card).join(''):'<div class="panel">Nenhum membro encontrado.</div>'}
q.addEventListener('input',render);f.addEventListener('change',render);render();
})();

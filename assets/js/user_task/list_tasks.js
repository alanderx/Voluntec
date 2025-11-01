
function listTasks(project_id) {
  return fetch(`../../app/user_task/list_tasks.php?id_projeto=${project_id}`, { credentials: 'same-origin' })
    .then(resp => resp.json());
}

function renderKanbanTasks(project_id) {
  listTasks(project_id).then(tasks => {
    const colunas = { 'A Fazer': [], 'Em Progresso': [], 'Concluído': [] };
    tasks.forEach(t => {
      if (colunas[t.status]) colunas[t.status].push(t);
    });
    
    function renderTask(t) {
      return `<div class="card mb-2 shadow-sm">
        <div class="card-body p-2">
          <div class="fw-bold">${t.title}</div>
          <div class="small text-muted">${t.start_date} to ${t.end_date}</div>
          <div class="d-flex gap-1 mt-2">
            <button class="btn btn-sm btn-outline-primary" onclick='window.showFormUpdateTask && window.showFormUpdateTask("${t.project_id}", {id: ${t.id}}, () => window.renderKanbanTasks("${t.project_id}"))'>Edit</button>
            <button class="btn btn-sm btn-outline-danger" onclick='window.removeTask && window.removeTask({id: ${t.id}}, () => window.renderKanbanTasks("${t.project_id}"))'>Delete</button>
          </div>
        </div>
      </div>`;
    }
    
    document.getElementById('kanban-todo').innerHTML = colunas['A Fazer'].map(renderTask).join('');
    document.getElementById('kanban-doing').innerHTML = colunas['Em Progresso'].map(renderTask).join('');
    document.getElementById('kanban-done').innerHTML = colunas['Concluído'].map(renderTask).join('');
  });
}

window.listTasks = listTasks;
window.renderKanbanTasks = renderKanbanTasks;


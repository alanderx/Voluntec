function createTask({project_id, task_id, start_date, end_date, status}) {
  const fd = new FormData();
  fd.append('project_id', project_id);
  fd.append('task_id', task_id);
  fd.append('start_date', start_date);
  fd.append('end_date', end_date);
  fd.append('status', status);
  return fetch('../../app/user_task/create_task.php', { method: 'POST', body: fd })
    .then(resp => resp.json());
}

function showFormCreateTask(project_id, onSuccess) {
  if (document.getElementById('formNewTask')) return;
  const formDiv = document.createElement('div');
  formDiv.className = 'd-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50';
  formDiv.id = 'formNewTask';
  formDiv.innerHTML = `
    <div class="bg-white p-4 rounded shadow" style="min-width:340px;max-width:420px;width:100%">
      <form>
        <h5 class="mb-3 text-center">Assign Task to User</h5>
        <div class="mb-3">
          <label class="form-label">Task</label>
          <select class="form-select" name="task_id" required id="selectTask"></select>
        </div>
        <div class="mb-3">
          <label class="form-label">Start Date</label>
          <input type="date" class="form-control" name="start_date" required>
        </div>
        <div class="mb-3">
          <label class="form-label">End Date</label>
          <input type="date" class="form-control" name="end_date" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Status</label>
          <select class="form-select" name="status">
            <option value="A Fazer">A Fazer</option>
            <option value="Em Progresso">Em Progresso</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
        <div class="d-flex gap-2 justify-content-end">
          <button type="button" class="btn btn-secondary" id="btnCancelNewTask">Cancel</button>
          <button type="submit" class="btn btn-success">Assign</button>
        </div>
      </form>
    </div>
  `;

  // Load task options
  fetch('../../app/task/list_task_types.php')
    .then(resp => resp.json())
    .then(tasks => {
      const select = formDiv.querySelector('#selectTask');
      select.innerHTML = '<option value="">Select...</option>' +
        tasks.map(t => `<option value="${t.id}">${t.title}</option>`).join('');
    });
  
  formDiv.querySelector('form').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append('project_id', project_id);
    const result = await createTask(Object.fromEntries(fd.entries()));
    if (result.codigo) {
      formDiv.remove();
      if (typeof onSuccess === 'function') onSuccess();
    } else {
      alert(result.msg || 'Error assigning task.');
    }
  };
  
  formDiv.querySelector('#btnCancelNewTask').onclick = () => formDiv.remove();
  document.body.appendChild(formDiv);
  
  // Load task options
  fetch('../../app/task/list_task_types.php')
    .then(r => r.json())
    .then(lista => {
      const select = formDiv.querySelector('#selectTask');
      select.innerHTML = lista.map(t => `<option value="${t.id}">${t.title}</option>`).join('');
    });
}

window.showFormCreateTask = showFormCreateTask;
window.createTask = createTask;


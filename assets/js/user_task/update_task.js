function updateTask({id, project_id, task_id, start_date, end_date, status}) {
  const fd = new FormData();
  fd.append('id', id);
  fd.append('project_id', project_id);
  fd.append('task_id', task_id);
  fd.append('start_date', start_date);
  fd.append('end_date', end_date);
  fd.append('status', status);
  return fetch('../../app/user_task/update_task.php', { method: 'POST', body: fd })
    .then(resp => resp.json());
}

async function showFormUpdateTask(project_id, task, onSuccess) {
  if (document.getElementById('formUpdateTask')) return;
  console.log('showFormUpdateTask called with project_id=', project_id, 'task=', task);

  let assoc = task || {};
  const id = (task && (task.id)) ? task.id : null;
  
  if (id && (!task.start_date && !task.end_date && !task.task_id)) {
    try {
      const r = await fetch(`../../app/user_task/read_user's-task.php?id=${id}`, { credentials: 'same-origin' });
      assoc = await r.json();
      if (!assoc || !assoc.id) {
        alert('Task assignment not found.');
        return;
      }
    } catch (err) {
      console.error('Error fetching task:', err);
      alert('Error fetching task data. See console.');
      return;
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    if (typeof dateStr !== 'string') return '';
    if (dateStr.indexOf(' ') !== -1) return dateStr.split(' ')[0];
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toISOString().slice(0, 10);
  }

  const formDiv = document.createElement('div');
  formDiv.className = 'd-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50';
  formDiv.id = 'formUpdateTask';
  formDiv.innerHTML = `
    <div class="bg-white p-4 rounded shadow" style="min-width:340px;max-width:420px;width:100%">
      <form>
        <h5 class="mb-3 text-center">Edit Task Assignment</h5>
        <input type="hidden" name="id" value="${assoc.id || ''}">
        <div class="mb-3">
          <label class="form-label">Task</label>
          <select class="form-select" name="task_id" required id="selectTaskEdit"></select>
        </div>
        <div class="mb-3">
          <label class="form-label">Start Date</label>
          <input type="date" class="form-control" name="start_date" required value="${formatDate(assoc.start_date)}">
        </div>
        <div class="mb-3">
          <label class="form-label">End Date</label>
          <input type="date" class="form-control" name="end_date" required value="${formatDate(assoc.end_date)}">
        </div>
        <div class="mb-3">
          <label class="form-label">Status</label>
          <select class="form-select" name="status">
            <option value="A Fazer" ${assoc.status === 'A Fazer' ? 'selected' : ''}>A Fazer</option>
            <option value="Em Progresso" ${assoc.status === 'Em Progresso' ? 'selected' : ''}>Em Progresso</option>
            <option value="Concluído" ${assoc.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
          </select>
        </div>
        <div class="d-flex gap-2 justify-content-end">
          <button type="button" class="btn btn-secondary" id="btnCancelUpdateTask">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  `;

  // Load task select
  fetch('../../app/task/list_task_types.php', { credentials: 'same-origin' })
    .then(r => r.json())
    .then(lista => {
      const select = formDiv.querySelector('#selectTaskEdit');
      select.innerHTML = lista.map(t => `<option value="${t.id}" ${t.id == assoc.task_id ? 'selected' : ''}>${t.title}</option>`).join('');
    }).catch(err => console.error('Error loading task types:', err));

  formDiv.querySelector('form').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append('project_id', project_id);
    const data = Object.fromEntries(fd.entries());
    if (data.task_id) data.task_id = parseInt(data.task_id, 10);
    if (data.id) data.id = parseInt(data.id, 10);
    console.log('Sending updateTask with', data);
    try {
      const result = await updateTask(data);
      console.log('updateTask response:', result);
      if (result && result.codigo) {
        formDiv.remove();
        if (typeof onSuccess === 'function') onSuccess();
      } else {
        alert((result && result.msg) || 'Error updating assignment.');
      }
    } catch (err) {
      console.error('Error calling updateTask:', err);
      alert('Unexpected error updating assignment. See console.');
    }
  };

  formDiv.querySelector('#btnCancelUpdateTask').onclick = () => formDiv.remove();
  document.body.appendChild(formDiv);
}

window.showFormUpdateTask = showFormUpdateTask;
window.updateTask = updateTask;

